import useAuthUser from "src/composables/UseAuthUser";
import useSupabase from "src/boot/supabase";
import { state } from "src/stores/countersState";

export default function useAPI(letter) {
  const { supabase } = useSupabase();
  const { user } = useAuthUser();

  const syncToDB = async (id) => {
    const counterValue = state.counters[id].value;
    const { data, err } = await supabase
      .from("counters")
      .upsert({ id: id, value: counterValue, user: user.value.id });
    if (err) throw err;
  };

  const removeFromDB = async (id) => {
    const { data, err } = await supabase
      .from("counters")
      .delete()
      .match({ id: id, user: user.value.id });
    if (err) throw err;
  };

  const changeDataDB = async () => { supabase
      .from("counters:user=eq." + user.value.id)
      .on("*", ({ new: newRecord, eventType, old }) => {
        if (newRecord.user === user.value.id) {
          if (eventType === "DELETE") {
            state.deleteCounter(old.id);
          } else if (eventType === "UPDATE") {
            state.setVal(newRecord.id, newRecord.value);
          } else {
            state.addCounter(newRecord.id, newRecord.value);
          }
        }
      })
      .subscribe();
  };

  const shareCounter = async (id, userId) => {
    const counter = state.counters[id];
    const { data, err } = await supabase.from("counters").upsert({
      id: id,
      value: counter.value,
      user: user.value.id,
      share:
        counter.share && counter.share.length
          ? [...counter.share, userId]
          : [userId],
    });
    if (err) throw err;
  };

  const getSharedCounters = async () => {
    const { data: counters, err } = await supabase
      .from("counters")
      .select("value, id")
      .contains("share", [user.value.id]);
    if (err) throw err;

    if (counters) {
      counters.forEach((counter) => {
        state.addCounter(counter.id, counter.value, true);
      });
    }
  };

  const syncFromDB = async () => {
    //let counterValue = null;
    const { data, err } = await supabase
      .from("counters")
      .select('counter')
      .match({ letter: letter, user: user.value.id });
    if (err) throw err;
    if (data && data.length === 1) {
      state.setVal(letter, data[0].counter);
    }
  };

  return {
    syncFromDB,
    syncToDB,
    removeFromDB,
    changeDataDB,
    shareCounter,
    getSharedCounters,
  }
}

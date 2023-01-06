<script setup>
import { defineComponent,toRefs } from "vue";
import { state } from "../stores/countersState";
import useAuthUser from "src/composables/UseAuthUser";
import useAPI from "src/composables/UseApi";
import DeleteCounter from "./DeleteCounter.vue"
import ShareCounter from "./ShareCounter.vue";


defineComponent({ name: "CounterComponent" });

const { isSignedIn } = useAuthUser();

const props = defineProps({
  id: {
    required: true,
  },
});

const { syncToDB } = useAPI(props.id);

const counter = toRefs(state.counterList)[props.id];
</script>

<template lang="pug">
.column.justify-evenly(:id="'counter_' + id")
  p.q-ma-md.text-h5.text-purple-9.self-center Counter {{ id }}
  .row.justify-center.items-end
    q-btn.q-ma-md.col-1(rounded, color="cyan", @click="state.incrementCounter(id)", data-cy="btn-up" , :disable="counter.shared")
      q-tooltip(anchor="top left" data-cy="btn-tool-up").bg-teal +1
      q-icon(name="arrow_drop_up", size="md")
    q-input.col-8(
      v-model.number="counter.value",
      placeholder="Enter number",
      error-message = "Input must be a number",
      outlined,
      dense,
      rounded,
      input-class=" text-h5 text-center text-cyan",
      :rules="[val => (Number.isFinite(val)) || 'error']",
      :disable="counter.shared"
      data-cy="input"
      )
      q-tooltip(anchor="bottom middle").bg-teal Enter number
    q-btn.q-ma-md.col-1(rounded, color="cyan", @click="state.decrementCounter(id)", data-cy="btn-dn", :disable="counter.shared")
      q-tooltip(anchor="top right" data-cy="btn-tool-dn").bg-teal -1
      q-icon(name="arrow_drop_down", size="md")
  .row.justify-center
    .column.col-4
      q-btn.q-ma-xs.bg-teal-13(rounded,dense,no-caps,size="0.9em",icon="cloud_upload",label="Sync to Server",@click = "syncToDB")
        q-tooltip(anchor="bottom left").bg-teal update server values
  .row.justify-center
    .column.col-5
      DeleteCounter(:id="id" , :disable="counter.shared")
    .column.col-5
      ShareCounter(:id="id" , :disable="counter.shared")
</template>

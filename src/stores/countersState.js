import { reactive } from "vue";


export const state = reactive({
  counterList: {},

  getVal(id) {
    const counter = this.counterList[id]
    if (counter) {
      return counter.value;
    } else {
      console.log("This Counter Does not exist");
      return 0;
    }
  },

  setVal(id, value, shared) {
    if (this.counterList[id]) {
      if (shared) {
        this.counterList[id] = { value, shared: true };
        return this.counterList[id].value;
      } else {
        this.counterList[id] = { value, shared: false };
        return this.counterList[id].value;
      }
    } else {
      console.log("This Counter Does not exist");
      return 0;
    }
  },

  deleteCounter(id) {
    if (this.counterList[id]) {
      delete this.counterList[id];
      return true;
    } else {
      console.log("This Counter Does not exist");
      return false;
    }
  },

  addCounter(id, value = 0, shared) {
    if (!this.counterList[id]) {
      if (shared) {
        this.counterList[id] = { value, shared: true };
        return true;
      } else {
        this.counterList[id] = { value, shared: false };
        return true;
      }
    } else {
      console.log("This Counter already exists");
      return 0;
    }
  },

  incrementCounter(id) {
    if (this.counterList[id]) {
      this.counterList[id].value++;
      this.counterList[id].value;
    } else {
      console.log("This Counter Does not exist");
    }
  },

  decrementCounter(id) {
    if (this.counterList[id]) {
      this.counterList[id].value--;
      this.counterList[id].value;
    } else {
      console.log("This Counter Does not exist");
    }
  },

});

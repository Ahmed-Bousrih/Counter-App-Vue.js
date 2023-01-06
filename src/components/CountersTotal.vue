<script setup>
import { defineComponent, computed, ref } from "vue";
import { state } from "../stores/countersState";

defineComponent({ name: "CountersTotal" });
const counters=ref(state.counterList);

let total = computed(() =>Object.values(counters.value).map((counter) => counter.value).reduce((a, b) => {
      return a + b;
    }, 0)
);
</script>

<template lang="pug">
.column.flex.flex-center
  p.q-ma-md.text-h5.text-purple-9 Total
  p.q-my-md.q-mx-xl.text-h5.text-cyan(data-cy="total") {{ total }}
</template>

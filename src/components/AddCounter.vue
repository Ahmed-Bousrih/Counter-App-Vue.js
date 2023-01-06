<script setup>
import { defineComponent, ref } from "vue";
import { state } from "../stores/countersState";

defineComponent({ name: "AddCounter" });

const prompt = ref(false);
const counterName = ref("");

const addCounter = () => {
  if (counterName.value) {
    state.addCounter(counterName.value);
  }
};
</script>

<template lang="pug">
q-btn.q-ma-xs.q-px-md.bg-red(color="green",icon="add",label="Add new Counter",v-on:click = "prompt = true")
  q-dialog(v-model="prompt")
    q-card()
      q-card-section()
        p(class="text-h5") Enter name
      q-card-section(class="q-pt-none")
        q-input(
          update:modelValue:model-value="counterName",
          v-on:update:model-value="(value) => counterName = value"
          required,
          v-model:model-value="counterName",
          v-on:keyup.enter="addCounter",
          v-close-popup,
          autofocus
        )
      q-card-actions(align="right")
        q-btn(flat, label="Cancel", v-close-popup)
        q-btn(flat, label="Add counter", v-close-popup, v-on:click="addCounter")
</template>

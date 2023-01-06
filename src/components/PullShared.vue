<script setup>

import { defineComponent } from 'vue';
import useApi from '../composables/UseApi'

defineComponent ({ name: "PullShared"});

const getShared = () => {
  const { getSharedCounters } = useApi();
  getSharedCounters();
};

</script>
<template lang="pug">
q-btn.q-ma-xs.q-px-md.bg-green(color="white",icon="sync",label="pull Shared Counters",v-on:click="getShared")
</template>

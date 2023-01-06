<script setup>
import { defineComponent } from 'vue';
import { state } from '../stores/countersState';
import  useApi  from '../composables/UseApi';


defineComponent ({name: "DeleteCounter"});

const props=defineProps({
  id:{
    required:true,
  },
  disable:{
    required:false,
  }
});

const deletion=() =>{
  const { removeFromDB } = useApi();
  state.deleteCounter(props.id);
  removeFromDB(props.id);
};
</script>

<template>
  <div class="q-pa-md q-gutter-sm">
    <q-btn label="Delete Counter" color="red" @click="deletion" />
  </div>
</template>

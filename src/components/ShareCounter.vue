<script setup>
import { defineComponent } from 'vue';
import { ref } from 'vue';
import useApi from '../composables/UseApi'

defineComponent ({name : "ShareCounter"});

const props = defineProps({
  id: {
    required: true,
  },
  disable: {
    required : false,
  },
})

const prompt = ref(false);
const userID = ref('');

const sharing = () => {
  const { shareCounter } =useApi();
  if (!userID.value){
    alert("wrong ID");
  } else {
    shareCounter(props.id,userID.value);
  }
}
</script>
<template lang="pug">
q-btn.q-ma-xs.q-px-md.q-bg-black(:disabled="props.disable",dense,color="white",icon="share",label="Share Counter With",v-on:click="propmt=true")
  q-dialog(v-model="prompt")
    q-card()
      q-card-section()
        p(class="text-h5") Enter User ID
      q-card-section()
        q-input(update:modelValue;model-value="userID",v-on:update:model-value="(value)=>userID=value",required,v-model:model-value="uderID",v-on:keyup.enter="sharing",v-close-popup,autofocus,)
      q-card-actions(align="right")
        q-btn(flat, label="Cancel",v-close-popup)
        q-btn(flat, label="Share",v-close-popup , v-on:click="sharing")
</template>

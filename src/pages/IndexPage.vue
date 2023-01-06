<script setup>
import { defineComponent, ref } from 'vue'
import CounterComponent from '../components/CounterComponent.vue'
import CountersTotal from '../components/CountersTotal.vue'
import useAuthUser from 'src/composables/UseAuthUser'
import AddCounter from '../components/AddCounter.vue'
import { state } from "../stores/countersState";
import PullShared from '../components/PullShared.vue'

defineComponent({
  name: 'IndexPage'
})

const { user } = useAuthUser()
const counters= ref(state.counterList);

const exist = () => {
  return Object.keys(counterList.value).length !=0;
};
</script>

<template lang="pug">
q-page.column
  .row(v-if="!user").justify-center.text-h1.text-purple You are not logged in !
  .row(v-else).justify-center.items-start.q-my-xl
    .col12
      .row.q-mb-xl.flex.flex-center
        span.row.flex.flex-center
          AddCounter()
        span.row.flex.flex-center
          PullShared()
      .row(v-if="exist").flex.flex-center
        span.col-lg-4.col-sm-10.col-md-6.flex.flex-center(v-for="(value,key,idx) in counterList")
          CounterComponent(:id="key")
    span.row.justify-center.items-start
      span.text-h4.text-purple-9.q-my-md =
      CountersTotal
</template>

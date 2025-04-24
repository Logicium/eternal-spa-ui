<script setup lang="ts">
import {computed, ref, watch} from "vue";
import api from "@/router/api.ts";
import LoadingPage from "@/pages/LoadingPage.vue";
import TransitionPanel from "@/components/panels/TransitionPanel.vue";

import { useRoute } from 'vue-router'

const fetchedData = ref(null);
const imageUrl = ref(null);

const route = useRoute()
const reservationId = route.query.orderId;

console.log("Confirmation Page")
const fetchData = async function (){
  const response = await fetch(`http://localhost:3000/reservation/${reservationId}`, {});

  const data = await response.json();
  fetchedData.value = data;
  // imageUrl.value = computed(()=> 'url("https://strapi-8w04.onrender.com'+data.data.bannerImage.url+'")').value;
  console.log(data);
}

fetchData();

</script>

<template>

  <TransitionPanel>

    <LoadingPage v-if="fetchedData===null" />
    <div v-else>
      <div class="confirmation">
        <div class="header">CONFIRMATION</div>
        <div>{{fetchedData}}</div>
      </div>
    </div>

  </TransitionPanel>

</template>

<style scoped lang="scss">

@import "../assets/Library";

</style>

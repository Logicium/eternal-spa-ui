<script setup lang="ts">

import ServiceFull from "@/components/ServiceFull.vue";
import LoadingPage from "@/pages/LoadingPage.vue";
import {computed, ref, watch} from "vue";
import api from "@/router/api.ts";

const fetchedData = ref(null);

const fetchData = async function (){
  const response = await fetch(`${api.services.list}`, {});
  const data = await response.json();
  fetchedData.value = data;
  console.log(data);
}

fetchData();


</script>

<template>

  <TransitionGroup>
    <LoadingPage v-if="fetchedData===null"/>
    <template v-else>
      <div class="header">
        SERVICES
      </div>

      <div class="services">
        <ServiceFull v-for=" service in fetchedData" :name="service.name" :image="service.image" :desc="service.desc"/>
      </div>
    </template>
  </TransitionGroup>


</template>

<style lang="scss" scoped>

@import "../assets/Library";

.services{
  display: grid;
  grid-gap: 2vw;
  padding: 2vw;
}

.header{
  background-position: 100% 100%;
  background-image: url("/salt1.jpg");
}

</style>

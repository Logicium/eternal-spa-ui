<script setup lang="ts">

import data from "@/data.ts";
import {useRoute} from "vue-router";

const route = useRoute();
const id = Number(route.params.id);
console.log("ID: ",id);
const loadedData = data.podcasts[id];

</script>

<template>

  <div class="headerLarge">
    {{loadedData.name}}
  </div>

</template>

<style scoped lang="scss">

.headerLarge{
  display: flex;
  flex-direction: column;
  height: 70vh;
  background-size: cover;
  background-position: 100% 35%;
  background-image: url("/fishers-peak/mountain2.jpg");
  letter-spacing: 2.5vw;
  font-size: calc(12px + 4vw);
  color: $primary;
  justify-content: space-evenly;
  align-items: center;
  text-align: center;
}

</style>

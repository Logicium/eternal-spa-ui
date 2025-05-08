<script setup lang="ts">

import FadeImageCard from "@/components/cards/FadeImageCard.vue";
import {computed} from "vue";

const props = defineProps(['title','image','desc','parallax'])

</script>

<template>

  <FadeImageCard :image="image"/>

  <div :class="'serviceDesc parallax-'+parallax">
    <div class="innerTitle">{{title}}</div>
    <div class="inner"> {{desc}}</div>
    <div class="button underline">Learn More</div>
  </div>

</template>

<style scoped lang="scss">

@import "../../assets/Library";

.serviceDesc{
  color: $quaternary;
  padding: 4rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  height: 100%;
}

.innerTitle{
  font-size: calc(12px + 3vw);
}

.inner{
  width: 70%;
}

</style>

<script setup lang="ts">

import ServiceFull from "@/components/ServiceFull.vue";
import data from "@/data.ts";
</script>

<template>

  <div class="header">
    SERVICES
  </div>

  <div class="services">

    <ServiceFull v-for=" service in data.services" :name="service.name" :image="service.image" :desc="service.desc"/>

  </div>

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

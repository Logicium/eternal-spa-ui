<script setup lang="ts">

import ServiceFull from "@/components/ServiceFull.vue";
import data from "@/data.ts";
</script>

<template>

  <div class="serviceHeader">
    OUR SERVICES
  </div>

  <div class="services">

    <ServiceFull v-for=" service in data.services" :name="service.name" :image="service.image" :desc="service.desc"/>

  </div>

</template>

<style lang="scss" scoped>

@import "../assets/Colors";

.services{
  display: grid;
  grid-gap: 2vw;
  padding: 2vw;
}

.serviceHeader{
  letter-spacing: 2.5vw;
  background-size: cover;
  color: $primary;
  background-position: 100% 100%;
  background-image: url("/salt1.jpg");
  justify-content: center;
  align-items: center;
  display: flex;
  height: 20vh;
  font-size: calc(12px + 4vw);
  border-bottom-left-radius: 6px;
  border-bottom-right-radius: 6px;
}

</style>

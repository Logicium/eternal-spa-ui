<script setup lang="ts">
import { RouterView } from 'vue-router'
import Footer from "@/components/Footer.vue";
import Navigation from "@/components/Navigation.vue";
import {useServicesStore} from "./stores/ServiceStore";

const servicesStore = useServicesStore();
servicesStore.fill();


</script>

<template>

    <div class="wrapper">

      <Navigation/>

      <RouterView />

      <Footer/>

    </div>

</template>

<style lang="scss" scoped>

@use "assets/Colors";

.wrapper{
  width: 100%;
}


</style>

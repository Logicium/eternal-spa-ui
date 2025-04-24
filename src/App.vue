<script setup lang="ts">
import { RouterView } from 'vue-router'
import Footer from "@/components/Footer.vue";
import NavMenu from "@/components/NavMenu.vue";
import {useServicesStore} from "./stores/ServiceStore";

const servicesStore = useServicesStore();
servicesStore.fill();


</script>

<template>

    <div class="wrapper">

      <NavMenu/>

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

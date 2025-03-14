<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
import MenuIcon from "@/components/icons/MenuIcon.vue";
import {onMounted, ref} from "vue";
import Footer from "@/components/Footer.vue";

const colorChange = ref(true);
onMounted(()=>{
  window.addEventListener('scroll', updateScroll);
})

const updateScroll = function (){
  let scrollPosition = window.scrollY
  colorChange.value = ( scrollPosition <= 100 );
}


</script>

<template>

    <div class="wrapper">

      <nav :class="colorChange ? '' : 'colorChange' ">

        <RouterLink to="/"><div class="appIcon"/></RouterLink>
<!--        <RouterLink to="/services">Services</RouterLink>-->
<!--        <RouterLink to="/events">Events</RouterLink>-->
<!--        <RouterLink to="/contact">Podcast</RouterLink>-->
        <div class="buttons">
          <div class="menuBtn"><MenuIcon/></div>
          <RouterLink to="/book" class="cta">Book Appointment</RouterLink>
        </div>

      </nav>

      <RouterView />

      <Footer/>

    </div>

</template>

<style lang="scss" scoped>

@import "assets/Colors";

.appIcon{
  background-color: $primary;
  border-radius: 50%;
  height: 45px;
  width: 45px;
}

.wrapper{
  width: 100%;
}

.buttons{
  display: flex;
  justify-content: space-between;
}

.menuBtn{
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 45px;
  width: 45px;
  color: $primary;
  background-color: $quaternary;
  border-radius: 6px;
  margin-right: 2vw;
}

.cta{
  border-radius: 6px;
  padding: 1vw;
  display: flex;
  align-items: center;
  height: 45px;
  color: $primary !important;
  background-color: $quaternary;
}

nav{
  font-weight: 500;
  padding: 2rem;
  display: flex;
  position: fixed;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  z-index: 2;
  transition: 0.5s;
  border-bottom-left-radius: 6px;
  border-bottom-right-radius: 6px;
}

nav a{
  color: $primary;
}

.colorChange{
  background-color: $secondary;
  transition: 0.5s;
}

.colorChange a{
  color: $quaternary;
}

</style>

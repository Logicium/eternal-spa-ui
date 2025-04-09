<script setup lang="ts">

import MenuIcon from "@/assets/icons/MenuIcon.vue";
import {RouterLink} from "vue-router";
import {onMounted, ref} from "vue";
import FacebookIcon from "@/assets/icons/FacebookIcon.vue";
import InstaIcon from "@/assets/icons/InstaIcon.vue";
import ShareIcon from "@/assets/icons/ShareIcon.vue";
import CloseIcon from "@/assets/icons/CloseIcon.vue";
import YTIcon from "@/assets/icons/YTIcon.vue";

const colorChange = ref(true);
const toggleMenu = ref(false);

onMounted(()=>{
  window.addEventListener('scroll', updateScroll);
})

const updateScroll = function (){
  let scrollPosition = window.scrollY
  colorChange.value = ( scrollPosition <= 100 );
}

const resetMenu = function (){
  toggleMenu.value = false;
}

</script>

<template>

  <nav :class="colorChange ? '' : 'colorChange' ">

    <div class="fullWrap">

      <div :class=" toggleMenu ? 'fullNav show' : 'fullNav' ">

        <div class="links">
          <RouterLink to="/" @click="resetMenu">Home</RouterLink>
          <RouterLink to="/about" @click="resetMenu">About</RouterLink>
          <RouterLink to="/services" @click="resetMenu">Services</RouterLink>
          <RouterLink to="/events" @click="resetMenu">Events</RouterLink>
          <RouterLink to="/podcasts" @click="resetMenu">Podcast</RouterLink>
        </div>

        <div class="socials">
          <div class="icon"><FacebookIcon/></div>
          <div class="icon"><InstaIcon/></div>
          <div class="icon"><YTIcon/></div>
        </div>

        <div class="disclaimers">
          <div>© All rights reserved</div>
        </div>

      </div>

    </div>

    <RouterLink to="/" @click="resetMenu"><div class="appIcon"/></RouterLink>

    <div class="buttons">
      <div class="menuBtn"  @click="toggleMenu=!toggleMenu">
        <div :class=" !toggleMenu ? 'menuIcon rotateIn' : 'menuIcon'"><MenuIcon/></div>
        <div :class=" toggleMenu ? 'menuIcon rotateIn' : 'menuIcon'"><CloseIcon/></div>
      </div>
      <RouterLink to="/services" class="cta" @click="resetMenu">Book Appointment</RouterLink>
    </div>

  </nav>

</template>

<style scoped lang="scss">

@import "../assets/Colors";

.disclaimers{
  font-size: 18px;
}

.links{
  display: flex;
  flex-direction: column;
  align-items: center;
}

.socials{
  padding: 2rem;
  display: flex;
  width: 25rem;
  justify-content: space-evenly;
}

.icon{
  cursor: pointer;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 45px;
  width: 45px;
  background-color: $primary;
  color: $quaternary;
  transition: 0.5s;
}

.fullWrap{
  position: absolute;
  width: 100%;
  height: 100%;
}

.fullNav{
  padding: 2rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-evenly;
  font-size: calc(12px + 3vw);
  position: relative;
  height: 100vh;
  width: 100%;
  z-index: 0;
  visibility: hidden;
  background-color: $secondary;
  color: $primary;
  opacity:0;
  transition: 1s;
}

.show{
  opacity:1;
  transition: 1s;
  visibility: visible;
}

.appIcon{
  margin: 2rem;
  cursor: pointer;
  background-color: $primary;
  border-radius: 50%;
  height: 45px;
  width: 45px;
  z-index: 3;
  position: relative;
}

nav{
  font-weight: 500;
  display: flex;
  position: fixed;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  z-index: 2;
  transition: 1s;
  border-bottom-left-radius: 6px;
  border-bottom-right-radius: 6px;
}

nav a{
  color: $primary;
}

.buttons{
  z-index: 3;
  padding: 2rem;
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

.menuIcon{
  position: absolute;
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 0;
  transform:rotate(0deg);
  transition: transform 1s ease,opacity 1s ease;
}

.rotateIn{
  transform:rotate(180deg);
  transition: transform 1s ease,opacity 1s ease;
  opacity: 1;
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

.colorChange{
  background-color: $secondary;
  transition: 0.5s;
}

.links a{
  transition: 0.5s;
}

.links a:hover{
  color: $quaternary;
  transition: 0.5s;
}

.icon:hover{
  background-color: $quaternary;
  color: $primary;
  transition: 0.5s;
}

//
//.colorChange a{
//  color: $quaternary;
//}

</style>

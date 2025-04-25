<script setup lang="ts">

import NextIcon from "@/assets/icons/nav/NextIcon.vue";
import {ref} from "vue";
import BackIcon from "@/assets/icons/nav/BackIcon.vue";

const props = defineProps({
  toggleGuestLoginClick:{
    type:Function
  },
});

const email = ref();

const buttonText = ref('Reset Password');

const loginClick = function (){

}

</script>

<template>

  <div class="panel">
    <form>
      <div class="loginInfo">
        <div class="title">Password Reset</div>
        <div class="desc">Please enter your email to reset your password. If there's an email on file you will be sent a reset link.</div>
        <input type="email" v-model="email" placeholder="Email">
        <div class="buttons">
          <div class="button ghost gap" @click="toggleGuestLoginClick"><BackIcon/> Back</div>
          <input type="submit" class="button" @click="loginClick" :value="buttonText"/>
        </div>
      </div>
    </form>
    <div class="loginImage"/>
  </div>

</template>

<style scoped lang="scss">

@import "../../assets/Library";

.loginInfo{
  display: grid;
  grid-gap: 1vw;
}

.loginImage{
  background-image: url("/spa/spa1.jpg");
  background-position: 100% 100%;
  background-size: cover;
  border-radius: 6px;
}

.title{
  font-size: $fontMed;
}

.buttons{
  display: flex;
  align-items: center;
}

input{
  height: 45px;
  background-color: $secondary;
  border-radius: 6px;
  border: none;
  width: 100%;
  font-family: "Outfit", sans-serif;
  font-size: $fontNormal;
}

input[type="checkbox"]{
  margin-right: 1vw;
  width: fit-content;
}

.link{
  cursor: pointer;
  transition: 0.5s;
  width: fit-content;
}

.link:hover{
  font-weight: 500;
  transition: 0.5s;
}

</style>

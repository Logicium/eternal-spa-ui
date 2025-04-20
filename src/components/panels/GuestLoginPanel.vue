<script setup lang="ts">

import NextIcon from "@/assets/icons/NextIcon.vue";
import {ref} from "vue";

const props = defineProps({
  toggleVendorLoginClick:{
    type:Function
  },
  toggleSignupPanelClick:{
    type:Function
  },
  togglePwResetPanelClick:{
    type:Function
  }
});

const email = ref();
const password = ref();
const buttonText = ref('Login');

const loginClick = function (){

}

</script>

<template>

  <div class="panel">
    <form>
      <div class="loginInfo">
          <div class="title">Guest Login</div>
          <input type="email" v-model="email" placeholder="Email">
          <input type="password" v-model="password" placeholder="Password">
          <div class="loginOptions">
            <div class="link" @click="togglePwResetPanelClick">Password Reset</div>
            <div class="link" @click="toggleVendorLoginClick">Vendor Login</div>
          </div>
          <div class="buttons">
            <input type="submit" class="button gap" @click="loginClick" :value="buttonText"/>
            <div class="button ghost" @click="toggleSignupPanelClick">Sign Up <NextIcon/></div>
          </div>
      </div>
    </form>

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

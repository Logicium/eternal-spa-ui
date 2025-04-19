<script setup lang="ts">

import BackIcon from "@/assets/icons/BackIcon.vue";

import {ref} from "vue";

const props = defineProps({
  toggleGuestLoginClick:{
    type:Function
  }
});

const email = ref();
const password = ref();
const firstName = ref();
const lastName = ref();
const phone = ref();

const buttonText = ref('Sign Up')

const signUp = function (){}

</script>

<template>
  <div class="panel">

    <form>
      <div class="loginInfo">
        <div class="title">Sign Up</div>
        <div class="desc">Sign up to get rewards points, manage your bookings, and get notified of new events.</div>
        <div class="names">
          <input class="gap" type="text" v-model="firstName" placeholder="First Name">
          <input type="text" v-model="lastName" placeholder="Last Name">
        </div>
        <input type="email" v-model="email" placeholder="Email">
        <input type="text" v-model="phone" placeholder="Phone">
        <input type="password" v-model="password" placeholder="Password">
        <div class="row">
          <input type="checkbox">
          <div>I agree to receive text or email booking updates at the number/email provided.</div>
        </div>
        <div class="row">
          <input type="checkbox">
          <div>I agree to the Terms of Service and Privacy Policy.*</div>
        </div>
        <div class="buttons">
          <div class="button ghost gap" @click="toggleGuestLoginClick"><BackIcon/>Back</div>
          <input type="submit" class="button gap" @click="signUp" :value="buttonText"/>
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
  background-image: url("/spa/spa3.jpg");
  background-position: 100% 100%;
  background-size: cover;
  border-radius: 6px;
}

.title{
  font-size: $fontMed;
}

.names{
  display: flex;
  flex-grow: 1;
}

.row{
  display: flex;
  align-items: center;
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

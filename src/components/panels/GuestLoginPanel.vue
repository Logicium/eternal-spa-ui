<script setup lang="ts">

import NextIcon from "@/assets/icons/nav/NextIcon.vue";
import {ref} from "vue";
import api from "@/router/api.ts";
import router from "@/router";
import {useAccountStore} from "@/stores/AccountStore";
import {useAuthStore} from "@/stores/AuthStore";

const props = defineProps({
  toggleVendorLoginClick:{
    type:Function,
    required:true
  },
  toggleSignupPanelClick:{
    type:Function,
    required:true
  },
  togglePwResetPanelClick:{
    type:Function,
    required:true
  }
});

const email = ref();
const password = ref();
const buttonText = ref('Login');
const accountStore = useAccountStore();
const authStore = useAuthStore();

const onSubmit = function (e:any){
  const form = e.target;
  const formData = new FormData(form);
  const entries = Object.fromEntries(formData.entries());
  console.log(entries);
  fetch(form.action, {
    method: form.method,
    body: JSON.stringify(entries),
    headers: { "Content-Type": "application/json" }
  }).then(async response => {
    if (response.status != 200) {
      buttonText.value = 'Invalid Input';
      setTimeout(() => buttonText.value = "Login", 2000);
    } else {
      const json = await response.json();
      authStore.token = json.token;
      await accountStore.fill(json.token);
      await router.push('/guest/account');
    }
  })
}


</script>

<template>

  <div class="panel">
    <form id="login" @submit.prevent="onSubmit" :action="api.guest.login" method="post">
      <div class="loginInfo">
          <div class="title">Guest Login</div>
          <input type="email" name="email" v-model="email" placeholder="Email">
          <input type="password" name="password" v-model="password" placeholder="Password">
          <div class="loginOptions">
            <div class="link" @click="togglePwResetPanelClick()">Password Reset</div>
            <div class="link" @click="toggleVendorLoginClick()">Vendor Login</div>
          </div>
          <div class="buttons">
            <input type="submit" class="button gap" :value="buttonText"/>
            <div class="button ghost" @click="toggleSignupPanelClick()">Sign Up <NextIcon/></div>
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

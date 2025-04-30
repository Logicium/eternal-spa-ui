<script setup lang="ts">

import {ref} from "vue";

import GuestLoginPanel from "@/components/panels/GuestLoginPanel.vue";
import VendorLoginPanel from "@/components/panels/VendorLoginPanel.vue";
import SignupPanel from "@/components/panels/SignupPanel.vue";
import PwResetPanel from "@/components/panels/PwResetPanel.vue";
import data from "../data/data.ts";

const toggleGuestLogin = ref(true);
const toggleVendorLogin = ref(false);
const toggleSignupPanel = ref(false);
const togglePwResetPanel = ref(false);

const toggleGuestLoginClick = function(){
  toggleGuestLogin.value = true;
  toggleVendorLogin.value = false;
  toggleSignupPanel.value = false;
  togglePwResetPanel.value = false;
}
const toggleVendorLoginClick = function(){
  toggleGuestLogin.value = false;
  toggleVendorLogin.value = true;
  toggleSignupPanel.value = false;
  togglePwResetPanel.value = false;
}
const toggleSignupPanelClick = function (){
  toggleGuestLogin.value = false;
  toggleVendorLogin.value = false;
  toggleSignupPanel.value = true;
  togglePwResetPanel.value = false;
}

const togglePwResetPanelClick = function (){
  toggleGuestLogin.value = false;
  toggleVendorLogin.value = false;
  toggleSignupPanel.value = false;
  togglePwResetPanel.value = true;
}

</script>

<template>

  <div class="loginWrap">

    <div class="panelWrap">
      <transition-group name="slide">

        <GuestLoginPanel v-if="toggleGuestLogin"
          :toggle-signup-panel-click="toggleSignupPanelClick"
          :toggle-vendor-login-click="toggleVendorLoginClick"
          :toggle-pw-reset-panel-click="togglePwResetPanelClick"
        />

        <VendorLoginPanel v-if="toggleVendorLogin"
          :toggle-guest-login-click="toggleGuestLoginClick"
          :toggle-pw-reset-panel-click="togglePwResetPanelClick"
        />

        <SignupPanel v-if="toggleSignupPanel"
          :toggle-guest-login-click="toggleGuestLoginClick"
        />

        <PwResetPanel v-if="togglePwResetPanel"
          :toggle-guest-login-click="toggleGuestLoginClick"
        />

      </transition-group>

    </div>

    <div class="loginImage">
      <div>{{data.about0}}</div>
    </div>

  </div>

</template>

<style scoped lang="scss">

@import "../assets/Library";


.panelWrap{
  display: flex;
  justify-content: center;
  position: relative;
  overflow: hidden;
}

.loginImage{
  background-image: url("/fishers-peak/mountain2.jpg");
  background-position: 60% 100%;
  background-size: cover;
  color: $primary;
  font-size: $fontMed;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 2rem;
  text-align: center;
  border-top-left-radius: 6px;
  border-bottom-left-radius: 6px;
}

.loginInfo{
  display: grid;
  grid-gap: 1vw;
}

.loginWrap{
  height: 100vh;
  display: grid;
  grid-template-columns: 1fr 1fr;
  margin-bottom: 2rem;
}

</style>

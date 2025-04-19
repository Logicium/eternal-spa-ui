<script setup lang="ts">

import {ref} from "vue";

import GuestLoginPanel from "@/components/panels/GuestLoginPanel.vue";
import VendorLoginPanel from "@/components/panels/VendorLoginPanel.vue";
import SignupPanel from "@/components/panels/SignupPanel.vue";
import PwResetPanel from "@/components/panels/PwResetPanel.vue";

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

    <div class="header">
      <div>LOGIN</div>
    </div>

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

.header{
  background-image: url("/events/event2.jpg");
}

.loginInfo{
  display: grid;
  grid-gap: 1vw;
}

button{
  border: none;
  font-family: "Outfit", sans-serif;
  font-size: $fontNormal;
}

</style>

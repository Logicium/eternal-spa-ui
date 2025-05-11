<script setup lang="ts">

import router from "@/router";
import {useAuthStore} from "../../stores/AuthStore.ts";
import {useAccountStore} from "../../stores/AccountStore.ts";
import {computed, ref} from 'vue';
import LoadingPage from "@/pages/LoadingPage.vue";
import GuestAccountPanel from "../../components/panels/GuestAccountPanel.vue";
import TransitionPanel from "@/components/panels/TransitionPanel.vue";
import GuestSettingsPanel from "@/pages/guest/GuestSettingsPanel.vue";
import GuestBookingsPanel from "@/pages/guest/GuestBookingsPanel.vue";
import GuestRewardsPanel from "@/pages/guest/GuestRewardsPanel.vue";

const authStore = useAuthStore();
const accountStore = useAccountStore();
const activePanel = ref('account');

const init = async function (){
  if(authStore.token) {
    await accountStore.fill(authStore.token);
  }
  console.log(accountStore.guest);
}
init();

const logoutClick = function(){
  authStore.token = null;
  router.push('/login')
}

const changePanel = function(panel: string){
  activePanel.value = panel;
  window.scrollTo(0, 0);
}

</script>

<template>
  <TransitionPanel>
    <LoadingPage v-if="!accountStore.guest"/>
    <div v-else-if="authStore.token && accountStore.guest && accountStore.guest.reservations">
      <div class="header">ACCOUNT</div>
      <div class="panelWrap">
        <transition-group name="slide">
          <GuestAccountPanel
            v-if="activePanel==='account'"
            :guest="accountStore.guest"
            :active-panel="activePanel"
            @logout="logoutClick"
            @change-panel="changePanel"
          />
          <GuestSettingsPanel
            v-if="activePanel==='settings'"
            :active-panel="activePanel"
            @change-panel="changePanel"
          />
          <GuestBookingsPanel
            v-if="activePanel==='bookings'"
            :active-panel="activePanel"
            @change-panel="changePanel"
          />
          <GuestRewardsPanel
            v-if="activePanel==='rewards'"
            :active-panel="activePanel"
            @change-panel="changePanel"
          />
        </transition-group>
      </div>

    </div>
    <template v-else-if="!authStore.token">
      {{router.push('/login')}}
    </template>
  </TransitionPanel>
</template>

<style scoped lang="scss">

@import "../../assets/Library";

.header{
  background-image: url("/spa/spa5.jpg");
}
.panelWrap{
  position: relative;
  display: flex;
  justify-content: center;
}

</style>

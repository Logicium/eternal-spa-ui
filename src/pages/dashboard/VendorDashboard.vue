<script setup lang="ts">

import TransitionPanel from "@/components/panels/TransitionPanel.vue";
import LoadingPage from "@/pages/LoadingPage.vue";
import {useAuthStore} from "../../stores/AuthStore";
import {useVendorStore} from "../../stores/VendorStore";
import router from "@/router";
import {ref, watch} from "vue";
import DashboardIcon from "@/assets/icons/DashboardIcon.vue";
import SettingsIcon from "@/assets/icons/SettingsIcon.vue";
import ListIcon from "@/assets/icons/ListIcon.vue";
import CalendarIcon from "@/assets/icons/cal/CalendarIcon.vue";
import CalAvailableIcon from "@/assets/icons/cal/CalAvailableIcon.vue";
import CalBusyIcon from "@/assets/icons/cal/CalBusyIcon.vue";
import OverviewPanel from "@/pages/dashboard/OverviewPanel.vue";
import OpeningsPanel from "@/pages/dashboard/OpeningsPanel.vue";
import TimeOffPanel from "@/pages/dashboard/TimeOffPanel.vue";
import VendorSettingsPanel from "@/pages/dashboard/VendorSettingsPanel.vue";

const authStore = useAuthStore();
const vendorStore = useVendorStore();
const init = async function (){
  if(authStore.token) {
    await vendorStore.fill(authStore.token);
  }
}
init();

console.log(vendorStore)

const logoutClick = function(){
  authStore.token = null;
  router.push('/login')
}

</script>

<template>

  <TransitionPanel>
    <LoadingPage v-if="vendorStore.vendor === null"/>
    <div v-else class="dashboard">
      <nav>

        <div class="vendorInfo">
          <div class="vendorImage"/>
          <div class="vendorName">{{vendorStore.vendor.firstName}}</div>
          <div class="vendorServices"></div>
        </div>

        <div class="navigation">
          <div class="navItem">
            <DashboardIcon class="gap"/> Overview
          </div>
          <div class="navItem">
            <CalendarIcon class="gap"/> Calendar
          </div>
          <div class="navItem">
            <CalAvailableIcon class="gap"/> Schedule Openings
          </div>
          <div class="navItem">
            <CalBusyIcon class="gap"/> Schedule Time Off
          </div>
          <div class="navItem">
            <ListIcon class="gap"/> All Reservations
          </div>
          <div class="navItem">
            <SettingsIcon class="gap"/> Settings
          </div>
        </div>

        <div @click="logoutClick">
          <div class="button underline rev">Logout</div>
        </div>
      </nav>
      <div class="panelsWrap">
        <transition-group name="slide">
          <OverviewPanel/>
          <OpeningsPanel/>
          <TimeOffPanel/>
          <VendorSettingsPanel/>
        </transition-group>
      </div>
    </div>
  </TransitionPanel>

</template>

<style scoped lang="scss">

@import "../../assets/Library";

.dashboard{
  background-color: $tertiary;
  display:grid;
  height: 100vh;
  grid-template-columns: 1fr 3fr;
}

.gap{
}

.navItem{
  height: 48px;
  display: flex;
  align-items: center;
  cursor: pointer;
  transition: 0.5s;
}

.navItem:hover{
  font-weight: 600;
  transition: 0.5s;
}


.vendorInfo{
  background-color: $quaternary;
  color: $primary;
  border-radius: 6px;
  padding: 1vw;
}

nav{
  display: flex;
  padding: 2rem;
  flex-direction: column;
  background-color: $secondary;
  justify-content: space-between;
  border-radius: 6px;
}

</style>

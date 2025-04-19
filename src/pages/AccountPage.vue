<script setup lang="ts">

import {useAuthStore} from "../stores/AuthStore";
import {useAccountStore} from "../stores/AccountStore";
import router from "@/router";

const authStore = useAuthStore();
const accountStore = useAccountStore();

const init = async function (){
  if(authStore.token) {
    await accountStore.fill(authStore.token);
  }
}
init();

</script>

<template>
  <div v-if="authStore.token">
    <div class="header">ACCOUNT</div>
    <div class="panelFull">

      <div class="title"> Hi {{accountStore.guest.firstName}}</div>

      <div class="accountGrid">

        <div>
          <div>Manage Bookings</div>
        </div>

        <div>
          <div>View Rewards</div>
        </div>

        <div>
          <div>Change Settings</div>
        </div>

        <div>
          <div>Logout</div>
        </div>

      </div>
    </div>
  </div>
  <template v-else>
    {{router.push('/login')}}
  </template>

</template>

<style scoped lang="scss">

@import "../assets/Library";

.header{
  background-image: url("/spa/spa5.jpg");
}

.accountGrid{
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-template-rows: 1fr 1fr;
  height: 50vh;
}

.panelFull{
  display: grid;
  padding: 1vw;
  margin: 2rem;
  border-radius: 6px;
  border: 4px solid $secondary;
  width: 80%;
  justify-self: center;
}

.title{
  font-size: $fontMed;
}
</style>

<script setup lang="ts">

import router from "@/router";
import {useAuthStore} from "../stores/AuthStore";
import {useAccountStore} from "../stores/AccountStore";

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

      <div class="outline">
        <div class="title">Hi {{accountStore.guest.firstName}}</div>
        <div>No upcoming reservations</div>
      </div>

      <div class="accountGrid">

        <div class="item filled">
          <div>
            <div class="title">Reservations</div>
            <div class="button underline">View All</div>
          </div>
          <div class="filledRev stat">
            <div class="title">{{accountStore.guest.reservations.length}}</div>
            <div>Reservations</div>
          </div>
        </div>

        <div class="item filled">
          <div class="title">Rewards</div>
          <div class="filledRev stat">
            <div class="title">{{accountStore.guest.rewardsPoints}}</div>
            <div>Rewards Points</div>
          </div>
        </div>

        <div class="item filled">
          <div class="title">Settings</div>
        </div>

        <div class="item filled">
          <div class="title">Logout</div>
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
  grid-gap: 1vw;
  margin-top: 2rem;
}

.panelFull{
  display: grid;
  margin: 2rem;
  width: 80%;
  justify-self: center;
}

.outline{
  padding: 1vw;
  border-radius: 6px;
  border: 4px solid $secondary;
}

.filled{
  background-color: $secondary;
  border-radius: 6px;
}

.filledRev{
  color: $primary;
  background-color: $quaternary;
  border-radius: 6px;
}

.item{
  display: grid;
  grid-template-columns: 1fr 1fr;
}

.stat{
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
}

.title{
  font-size: $fontMed;
}
</style>

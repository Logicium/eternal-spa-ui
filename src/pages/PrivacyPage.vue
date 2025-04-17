<script setup lang="ts">

import data from "../data.ts";
</script>

<template>
  <div class="tosWrap">
    <div class="header">PRIVACY</div>
    <div class="tosBody">
      <div class="title">Eternal Spa Privacy Policy</div>
      <div class="bold">Effective Date: April 17, 2025</div>
      <div class="policies">
        <div>{{data.privacyPolicy.intro}}</div>
        <template v-for="policy in data.privacyPolicy.policies">

          <div class="policy">
            <div class="bold">{{policy.name}}</div>
            <div>{{policy.policy}}</div>
          </div>

        </template>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">

@import "../assets/Library";


.tosBody{
  width: 80%;
  justify-self: center;
  margin: 2rem;
}

.policies{
  white-space: break-spaces;
  display: grid;
  grid-gap: 1vw;
}

.title{
  font-size: $fontMed;
}

.bold{
  font-weight: 600;
}

.header{
  letter-spacing: 2.5vw;
  background-size: cover;
  color: $primary;
  background-position: 100% 20%;
  background-image: url("/events/event2.jpg");
  justify-content: center;
  align-items: center;
  display: flex;
  height: 25vh;
  font-size: calc(12px + 4vw);
  border-bottom-left-radius: 6px;
  border-bottom-right-radius: 6px;
}

</style>

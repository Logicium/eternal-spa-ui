<script setup lang="ts">

import data from "../data/data.ts";
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
  background-image: url("/events/event2.jpg");
}

</style>

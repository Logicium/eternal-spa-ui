<script setup lang="ts">

import data from "../data/data.ts";
</script>

<template>
  <div class="tosWrap">
    <div class="header">TERMS</div>
    <div class="tosBody">
      <div class="title">Terms of Service</div>
      <div>{{data.tos.intro}}</div>
      <div class="terms">
        <template v-for="term in data.tos.terms">
          <div class="bold">{{term.name}}</div>
          <div>{{term.desc}}</div>
        </template>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">

@import "../assets/Library";

.terms{
  display: grid;
  grid-gap: 1vw;
  margin-top: 1vw;
}

.tosBody{
  width: 80%;
  justify-self: center;
  margin: 2rem;
}


.title{
  font-size: $fontMed;
}

.header{
  background-image: url("/events/event2.jpg");
}

</style>

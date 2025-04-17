<script setup lang="ts">

import data from "../data.ts";
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

.tos{
  white-space: break-spaces;
}

.bold{
  font-weight: 600;
}

.title{
  font-size: $fontMed;
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

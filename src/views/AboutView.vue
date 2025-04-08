<script setup lang="ts">
import data from "../data.ts";
</script>


<template>

  <div class="headerLarge">
    ABOUT
    <div class="title">We're proud to bring wellness to the Trinidad area.</div>
  </div>

  <div class="about">


    <div class="subtitle">{{data.about2}}</div>

<!--    <div class="doubleGrid">-->

<!--      <div class="imageGrid">-->
<!--        <div class="img1"></div>-->
<!--      </div>-->
<!--      <div class="textGrid">-->
<!--        <div/>-->
<!--        <div class="desc">-->
<!--          <div>Located in the heart of Southern Colorado.</div>-->
<!--          <div class="info">{{data.about3}}</div>-->
<!--        </div>-->
<!--      </div>-->

<!--    </div>-->

    <div class="subtitle">{{data.about2}}</div>

  </div>

</template>

<style lang="scss" scoped>

@import "../assets/Colors";

.img1{
  height: 100%;
  background-size: cover;
  background-position: 20% 100%;
  background-image: url("/spa/spa5.jpg");
  grid-column: span 6;
}

.team{
  background-color: $secondary;
  border-radius: 6px;
  width: 60%;
  padding: 2rem;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-template-rows: repeat(2, 20vh);
  grid-gap: 2rem;
}

.info{
  font-size: 18px;
}

.desc{
  padding: 2rem;
  font-size: calc(12px + 3vw);
  align-self: end;
  grid-column: span 4;
  background-color: $secondary;
  border-radius: 6px;
}

.doubleGrid{
  width: 100%;
}

.imageGrid{
  position: absolute;
}

.imageGrid,.textGrid{
  width: 100%;
  display: grid;
  grid-template-columns: repeat(6, 1fr);
  grid-template-rows: 50vh;
}

.textGrid{
  position: relative;
  z-index: 1;
  padding: 2rem;
  grid-template-rows: 60vh;
}

.about{
  display: flex;
  align-items: center;
  flex-direction: column;
}


.subtitle{
  width: 60%;
  margin: 2rem;
}


.headerLarge{
  display: flex;
  flex-direction: column;
  height: 70vh;
  background-size: cover;
  background-position: 100% 35%;
  background-image: url("/fishers-peak/mountain2.jpg");
  letter-spacing: 2.5vw;
  font-size: calc(12px + 4vw);
  color: $primary;
  justify-content: space-evenly;
  align-items: center;
  text-align: center;
}

.header{
  letter-spacing: 2.5vw;
  color: $primary;
  background-size: cover;
  background-position: 100% 35%;
  background-image: url("/fishers-peak/mountain2.jpg");
  justify-content: center;
  align-items: center;
  display: flex;
  height: 25vh;
  font-size: calc(12px + 4vw);
  border-bottom-left-radius: 6px;
  border-bottom-right-radius: 6px;
}

.title{
  font-size: calc(12px + 3vw);
  width: 60%;
  margin: 2rem;
  letter-spacing: initial;
}
</style>

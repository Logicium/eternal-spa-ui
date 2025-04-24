<script setup lang="ts">
import data from "../data.ts";
import HomeCard from "@/components/cards/HomeCard.vue";
import HomeCardRev from "@/components/cards/HomeCardRev.vue";
</script>

<template>
  <div class="home">

    <div class="titleWrap">

      <div class="title">
        <div class="titleInner">ETERNAL FLOAT SPA & WELLNESS CENTER</div>
      </div>
      <div class="heroWrap">
        <video class="heroVideo parallax" src="/spa0.mp4" autoplay muted loop/>
      </div>

    </div>

    <div class="cardsWrap">

      <div class="subtitle">{{data.about0}}</div>
      <div class="cardsGrid">
        <HomeCard title="Bespoke Experiences" :desc="data.about1" image="/massage/massage2.jpg" parallax="1"/>
        <HomeCardRev title="Licenced Specialists" :desc="data.about2" image="/reception2.jpg" parallax="2"/>
        <HomeCard title="Wellness Lifestyle" :desc="data.about3" image="/spa-room1.jpg" parallax="3"/>
      </div>

    </div>

  </div>

</template>

<style lang="scss" scoped>
@import "../assets/Library";

.home{
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.cardsGrid{
  position: relative;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-template-rows: repeat(3,60vh);
  grid-column-gap: 2rem;
}

.cardsWrap{
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
}

.subtitle{
  color: $quaternary;
  text-align: center;
  width: 60%;
  font-size: calc(12px + 3vw);
  margin-bottom: 2rem;
  z-index: 1;
}

.titleWrap{
  width: 100%;
  height: 70vh;
  margin-bottom: 2rem;
}
.titleInner{
  width: 80%;
  justify-self: center;
}

.title{
  position: absolute;
  top: 20%;
  font-size: $fontBig;
  text-align: center;
  color: $primary;
  //mix-blend-mode: difference;
  //filter: invert(80%);
  //font-family: "Sree Krushnadevaraya", serif;
  z-index: 1;
  letter-spacing: 2.5vw;
  line-height: calc(12px + 7vw) ;
}

.heroWrap{
  display: flex;
  justify-content: center;
  height: 50vh;
  animation: fadein 3s ease-in-out;
}

.heroVideo{
  position: absolute;
  width: 100%;
  height: 70vh;
  z-index: 0;
  object-fit: cover;
  filter: sepia(30%) brightness(80%);
}

</style>

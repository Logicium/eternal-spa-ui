<script setup lang="ts">
import data from "../data.ts";
</script>


<template>

  <div class="headerLarge">
    ABOUT
    <div class="title">We're proud to bring wellness to the Trinidad area.</div>
  </div>

  <div class="about">

    <div class="subtitle">{{data.aboutFull}}</div>


    <div class="imageCardA">

      <div class="image img1"></div>
      <div class="imageInfo">
        <div class="title3">The Sanctuary</div>
        {{data.aboutSpace}}
      </div>

    </div>

    <div class="imageCardB">

      <div class="imageInfo">
        <div class="title2">The Human Touch</div>
        {{data.aboutTeam}}
      </div>
      <div class="imageB img2"></div>

    </div>


<!--    <div class="imageGrid">-->
<!--      -->
<!--      <div class="imageCard">-->
<!--        <div class="image img1"></div>-->
<!--        <div class="imageInfo"></div>-->
<!--      </div>-->
<!--      -->
<!--      <div class="imageCard">-->
<!--        <div class="image img2"></div>-->
<!--        <div class="imageInfo"></div>-->
<!--      </div>-->

<!--      <div class="imageCard">-->
<!--        <div class="image img3"></div>-->
<!--        <div class="imageInfo"></div>-->
<!--      </div>-->

<!--    </div>-->

    <div class="title2"></div>


  </div>

</template>

<style lang="scss" scoped>

@import "../assets/Colors";
@import "../assets/Fonts";

.imageGrid{
  display: grid;
  grid-template-columns: repeat(3,1fr);
  grid-gap: 2rem;
  width: 80%;
}

.imageCard{
  display: flex;
  background-color: $secondary;
  border-radius: 6px;
  aspect-ratio: 2/1;
}

.imageCardA{
  width: 80%;
  border: 4px solid $secondary;
  border-radius: 6px;
  display: flex;
  padding: 2rem;
  margin-bottom: 2rem;
  text-align: right;
}
.imageCardB{
  width: 80%;
  border: 4px solid $secondary;
  border-radius: 6px;
  display: flex;
  padding: 2rem;
  margin-bottom: 2rem;
}

.imageInfo{
  width: 70%;
}

.image{
  width: 50%;
  background-size: cover;
  background-position: 20% 100%;
  border-radius: 6px;
  aspect-ratio: 3/2;
  margin-right: 2rem;
}

.imageB{
  width: 50%;
  background-size: cover;
  background-position: 20% 100%;
  border-radius: 6px;
  aspect-ratio: 3/2;
  margin-left: 2rem;
}

.img1{
  background-image: url("/spa/spa4.jpg");
}

.img2{
  background-image: url("/team/team2.jpg");
}

.img3{
  background-image: url("/spa/spa3.jpg");
}

.team{
  background-color: $secondary;
  border-radius: 6px;
  width: 80%;
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

.about{
  display: flex;
  align-items: center;
  flex-direction: column;
}

.subtitle{
  width: 80%;
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
  justify-content: center;
  align-items: center;
  text-align: center;
}

.title2,{
  width: 80%;
  font-size: $fontMed;
  margin-bottom: 1rem;
}

.title3{
  font-size: $fontMed;
  margin-bottom: 1rem;
}

.title{
  font-size: calc(12px + 3vw);
  width: 60%;
  margin: 2rem;
  letter-spacing: initial;
}
</style>

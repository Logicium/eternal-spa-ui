<script setup lang="ts">

import TuneIcon from "@/assets/icons/TuneIcon.vue";
import SearchIcon from "@/assets/icons/SearchIcon.vue";
import FeatureItem from "@/components/items/FeatureItem.vue";
import data from "@/data.ts";
import PodcastItem from "@/components/items/PodcastItem.vue";

const featuredPodcasts = data.podcasts.filter(podcast => {
  console.log(podcast.featured);
  return podcast.featured

});

console.log("Featured podcasts: ",featuredPodcasts);


</script>

<template>

  <div class="header">
    PODCAST
  </div>

  <div class="podcasts">

    <div class="controls">
      <div class="searchIcon"><SearchIcon/></div>
      <input class="text" placeholder="Search Podcasts">
      <div class="filters"><TuneIcon/></div>
    </div>

    <div class="featuresWrap">
      <div class="title">Featured Podcasts</div>
      <div class="featuredGrid">
        <FeatureItem v-for="podcast in featuredPodcasts" :data="podcast"/>
      </div>
    </div>

    <div class="podcastList">
      <div class="title2">All Podcasts</div>
      <PodcastItem v-for="podcast in data.podcasts" :data="podcast"/>
    </div>

  </div>



</template>

<style scoped lang="scss">

@import "../assets/Colors";
@import "../assets/Fonts";

.title{
  font-size: $fontMed;
  margin-bottom: 1rem;
  width: 80%;
  justify-self: center;
}

.title2{
  font-size: $fontMed;
  margin-bottom: 1rem;
}

.podcastList{
  width: 80%;
  align-self: center;
}

.featuredGrid{
  display: grid;
  grid-template-columns: repeat(3,1fr);
  grid-gap: 2rem;
  margin-bottom: 1rem;
  width: 80%;
  justify-self: center;
}

.searchIcon{
  position: absolute;
  display: flex;
  align-items: center;
  color: $secondary;
}

.header{
  letter-spacing: 2.5vw;
  background-size: cover;
  color: $primary;
  background-position: 100% 60%;
  background-image: url("/podcast/podcast1.jpg");
  justify-content: center;
  align-items: center;
  display: flex;
  height: 25vh;
  font-size: calc(12px + 4vw);
  border-bottom-left-radius: 6px;
  border-bottom-right-radius: 6px;
}

.controls{
  padding: 2rem 0;
  width: 80%;
  height: 10vh;
  display: flex;
  justify-content: space-between;
  align-items: center;
  align-self: center;
  border-radius: 6px;
}

.filters{
  display: flex;
  justify-content: center;
  align-items: center;
  height: 45px;
  min-width: 45px;
  background-color: $secondary;
  color: $quaternary;
  border-radius: 6px;
  cursor: pointer;
}

.podcasts{
  display: flex;
  flex-direction: column;
  width: 100%;
  justify-self: center;
}


input{
  height: 45px;
  padding-left: 24px;
  background-color: $primary;
  border: none;
  color: $quaternary;
  border-bottom: 4px solid $secondary;
  width: 100%;
  font-family: "Outfit", sans-serif;
  margin-right: 1vw;
  font-size: 16px;
  transition: 0.5s;
}

input:focus{
  outline: none;
  border-bottom: 4px solid $quaternary;
  color: $quaternary;
  transition: 0.5s;
}

::placeholder{
  color: $secondary;
  transition: 0.5s;
}


</style>

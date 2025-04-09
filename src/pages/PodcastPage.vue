<script setup lang="ts">

import data from "@/data.ts";
import {useRoute} from "vue-router";
import {computed} from "vue";
import AudioControls from "@/components/AudioControls.vue";

const route = useRoute();
const id = Number(route.params.id);
console.log("ID: ",id);
const loadedData = data.podcasts[id];

const imageUrl = computed(()=> 'url("'+loadedData.image+'")').value;

</script>

<template>

  <div class="headerLarge">
    <div class="podcastName">{{loadedData.name}}</div>
    <div class="tags">
      <div class="tag" v-for="tag in loadedData.tags">{{tag}}</div>
    </div>
  </div>

  <div class="podcast">

    <AudioControls class="fill" :url="loadedData.file"/>


    <div class="outline">
      <div class="title">About Podcast</div>
      <div class="desc">{{loadedData.desc}}</div>

      <div class="title">Transcript</div>
      <div class="transcript">{{loadedData.transcript}}</div>
      <div class="expand">View All</div>
    </div>


  </div>

</template>

<style scoped lang="scss">

@import "../assets/Colors";
@import "../assets/Fonts";

.podcast{
  width: 80%;
  justify-self: center;
}
.transcript{
  white-space: break-spaces;
}

.title{
  font-size: $fontMed;
}

.fill{
  background-color: $secondary;
  border-radius: 6px;
}

.outline{
  border: 4px solid $secondary;
  border-radius: 6px;
  padding: 1vw;
  margin-bottom: 2rem;
}
.controls{
  min-height: 30vh;
  margin-top: 2rem;
  margin-bottom: 2rem;
}

.headerLarge{
  display: flex;
  flex-direction: column;
  height: 70vh;
  background-size: cover;
  background-position: 100% 35%;
  background-image: v-bind(imageUrl);
  font-size: $fontBig;
  color: $primary;
  justify-content: space-evenly;
  align-items: center;
  padding: 2rem;
}

.podcastName{
  text-align: center;
  width: 80%;
}

.tags{
  font-size: $fontNormal;
  display: flex;
  cursor: default;
}

.tag{
  display: flex;
  align-items: center;
  margin-right: 1vw;
  padding: 1vw;
  height: 45px;
  border-radius: 45px;
  background-color: $secondary;
  color: $quaternary;
}
</style>

<script setup lang="ts">

import data from "@/data/data.ts";
import {useRoute} from "vue-router";
import {computed, ref} from "vue";
import AudioControls from "@/components/AudioControls.vue";
import FacebookIcon from "@/assets/icons/socials/FacebookIcon.vue";
import YTIcon from "@/assets/icons/socials/YTIcon.vue";
import InstaIcon from "@/assets/icons/socials/InstaIcon.vue";

const route = useRoute();
const id = Number(route.params.id);
console.log("ID: ",id);
const loadedData = data.podcasts[id];

const imageUrl = computed(()=> 'url("'+loadedData.image+'")').value;

const expand = ref(false);

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
      <div class="published">Published: {{new Date(loadedData.uploadDate).toDateString()}}</div>
      <div class="desc">{{loadedData.desc}}</div>

      <div class="infoRow">

        <div class="downloads">
          <div class="title">Links</div>
          <div class="download">Youtube Music</div>
          <div class="download">Apple Podcasts</div>
          <div class="download">Spotify</div>
        </div>

<!--        <div class="links">-->
<!--          <div class="title">Links</div>-->
<!--          <div class="socials">-->
<!--            <div class="icon"><YTIcon/></div>-->
<!--            <div class="icon"></div>-->
<!--            <div class="icon"></div>-->
<!--          </div>-->
<!--        </div>-->

        <div class="stats">
          <div class="title">Downloads</div>
          <div class="link">Download Podcast</div>
          <div class="link">Download Transcript</div>
        </div>



      </div>

    </div>

    <div class="outline">

      <div class="title">Transcript</div>
      <div :class="expand? 'transcript expand' : 'transcript'">{{loadedData.transcript}}</div>

      <div class="expandBtn" @click="expand=!expand">
        <div :class="expand? 'btn hide':'btn' ">View All</div>
        <div :class="!expand? 'btn hide':'btn'">View Less</div>
      </div>

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

.published{
  margin-bottom: 1vw;
  font-weight: 500;
}

.infoRow{
  display: grid;
  grid-template-columns: repeat(2,1fr);
}

.hide{
  opacity: 0;
  visibility: hidden;
  transition: all 0.5s ease;
}

.links{
  display: flex;
  flex-direction: column;
  text-align: center;
}

.transcript{
  white-space: break-spaces;
  height: 21vh;
  overflow: hidden;
  text-overflow: ellipsis;
  interpolate-size: allow-keywords;
  transition: height 3s ease;
}

.expandBtn{
  height: 45px;
  display: flex;
  align-items: center;
}

.expand{
  height: auto;
  transition: height 3s ease;
}

.stats{
  text-align: right;
}

.download,.link{
  border-bottom: 4px solid $secondary;
  width: fit-content;
  font-weight: 500;
  cursor: pointer;
}

.link{
  margin-left: auto;
}

.btn{
  position: absolute;
  border-bottom: 4px solid $secondary;
  width: fit-content;
  font-weight: 500;
  cursor: pointer;
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

.socials{
  padding-bottom: 2rem;
  display: flex;
  width: 25rem;
  justify-content: space-evenly;

}

.icon{
  cursor: pointer;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 45px;
  width: 45px;
  background-color: $secondary;
  color: $quaternary;
  transition: 0.5s;
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

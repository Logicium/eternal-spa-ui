<script setup lang="ts">

import {useRoute} from "vue-router";
import {computed, ref} from "vue";
import AudioControls from "@/components/cards/AudioControls.vue";
import FacebookIcon from "@/assets/icons/socials/FacebookIcon.vue";
import YTIcon from "@/assets/icons/socials/YTIcon.vue";
import InstaIcon from "@/assets/icons/socials/InstaIcon.vue";
import api from "@/router/api.ts";
import LoadingPage from "@/pages/LoadingPage.vue";
import type { PodcastsPageData } from "@/interfaces";

const route = useRoute();
const documentId = route.params.id as string;
console.log("DocumentID: ", documentId);

const fetchedData = ref<PodcastsPageData | null>(null);
const imageUrl = ref('');

const fetchData = async function() {
  try {
    const response = await fetch(`${api.podcast(documentId)}?populate=*`, {});
    const data = await response.json();
    fetchedData.value = data.data;
    console.log("Fetched podcast data:", data);

    // Set the image URL
    if (fetchedData.value && fetchedData.value.image) {
      const imageUrlBase = 'https://strapi-8w04.onrender.com';
      const imageUrlPath = fetchedData.value.image.formats.medium?.url || fetchedData.value.image.url;
      imageUrl.value = computed(() => 'url("' + imageUrlBase + imageUrlPath + '")').value;
    }
  } catch (error) {
    console.error("Error fetching podcast data:", error);
  }
};

fetchData();

const expand = ref(false);

</script>

<template>
  <transition-group name="fade" appear>
    <LoadingPage v-if="fetchedData===null" :big="true"/>
    <template v-else>
      <div class="headerLarge">
        <div class="podcastName">{{fetchedData.name}}</div>
        <div class="tags">
          <div class="tag" v-for="tag in fetchedData.tags">{{tag.tagName}}</div>
        </div>
      </div>

      <div class="podcast">

        <AudioControls class="fill" :url="`https://strapi-8w04.onrender.com${fetchedData.audioFile.url}`"/>

        <div class="outline">
          <div class="title">About Podcast</div>
          <div class="published">Published: {{new Date(fetchedData.publishedAt).toDateString()}}</div>
          <div class="desc">{{fetchedData.description}}</div>

          <div class="infoRow">
            <div class="downloads">
              <div class="title">Links</div>
              <div class="download">Youtube Music</div>
              <div class="download">Apple Podcasts</div>
              <div class="download">Spotify</div>
            </div>

            <div class="stats">
              <div class="title">Downloads</div>
              <div class="link">Download Podcast</div>
              <div class="link">Download Transcript</div>
            </div>
          </div>
        </div>

        <div class="outline">
          <div class="title">Transcript</div>
          <div :class="expand? 'transcript expand' : 'transcript'">
            <template v-for="(item, index) in fetchedData.transcript" :key="index">
              <div v-for="(child, childIndex) in item.children" :key="`${index}-${childIndex}`">
                {{child.text}}
              </div>
            </template>
          </div>

          <div class="expandBtn" @click="expand=!expand">
            <div :class="expand? 'btn hide':'btn' ">View All</div>
            <div :class="!expand? 'btn hide':'btn'">View Less</div>
          </div>
        </div>
      </div>
    </template>
  </transition-group>
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

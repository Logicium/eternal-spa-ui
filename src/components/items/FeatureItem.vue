<script setup lang="ts">

import {computed} from "vue";
import PlayIcon from "@/components/icons/PlayIcon.vue";

const props = defineProps({
  data: { type: Object, default: ()=>{}},
})

const imageUrl = computed(()=> 'url("'+props.data.image+'")').value;

</script>

<template>

  <div class="podcast">
    <div class="image"></div>

    <div class="info">
      <div class="name">{{data.name}}</div>
      <div class="playBtn"><PlayIcon/></div>
    </div>

  </div>

</template>

<style scoped lang="scss">

@import "../../assets/Colors";

.playBtn{
  height: 45px;
  width: 45px;
  background-color: $quaternary;
  color: $primary;
  border-radius: 50%;
  margin-left: auto;
  margin-right: 1vw;
  margin-bottom: 1vw;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
}

.info{
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.podcast{
  display: flex;
  background-color: $secondary;
  border-radius: 6px;
}

.image{
  background-image: v-bind(imageUrl);
  background-size: cover;
  background-position: 100% 100%;
  width: 260px;
  border-radius: 6px;
  aspect-ratio: 1/1;
}

</style>

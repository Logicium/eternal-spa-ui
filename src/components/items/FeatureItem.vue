<script setup lang="ts">

import {computed} from "vue";
import PlayIcon from "@/assets/icons/audio/PlayIcon.vue";

const props = defineProps({
  data: { type: Object, default: ()=>{}},
})

const imageUrl = computed(()=> 'url("'+props.data.image+'")').value;

</script>

<template>

  <div class="podcast">
    <div class="image"></div>

    <div class="info">
      <RouterLink :to="'/podcast/'+data.id">
        <div class="playBtn"><PlayIcon/></div>
      </RouterLink>
      <div class="name">{{data.name}}</div>
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
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
}

.name{
  font-weight: 500;
}

.info{
  display: flex;
  padding: 1vw;
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
  min-width: 170px;
  border-radius: 6px;
  aspect-ratio: 1/1;
  padding: 1vw;
}

</style>

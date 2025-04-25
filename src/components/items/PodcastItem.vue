<script setup lang="ts">

import PlayIcon from "@/assets/icons/audio/PlayIcon.vue";
import {computed} from "vue";

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
      <div class="desc">{{data.desc}}</div>
      <div class="tags">
        <div class="tag" v-for="tag in data.tags">{{tag}}</div>
      </div>
    </div>

    <RouterLink :to="'/podcast/'+data.id">
      <div class="playBtn"><PlayIcon/></div>
    </RouterLink>

  </div>
</template>

<style scoped lang="scss">

@import "../../assets/Colors";

.tags{
  margin-top: 1vw;
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
}

.image{
  background-image: v-bind(imageUrl);
  background-size: cover;
  background-position: 100% 100%;
  min-width: 140px;
  aspect-ratio: 1/1;
  border-radius: 6px;
  margin-right: 2rem;
}

.podcast{
  display: flex;
  border: 4px solid $secondary;
  border-radius: 6px;
  padding: 1vw;
  margin-bottom: 2rem;
  color: $quaternary;
}

.name{
  font-weight: 500;
}

.playBtn{
  height: 45px;
  min-width: 45px;
  background-color: $quaternary;
  color: $primary;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
}


</style>

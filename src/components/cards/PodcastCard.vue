<script setup lang="ts">

import PlayIcon from "@/assets/icons/audio/PlayIcon.vue";
import {computed} from "vue";

const props = defineProps({
  data: { type: Object, default: ()=>{}},
})

const emit = defineEmits(['tagClick']);

const imageUrl = computed(()=> 'url("'+props.data.image+'")').value;

const handleTagClick = (tag: string) => {
  emit('tagClick', tag);
}

</script>

<template>
  <div class="podcast">

    <div class="image"></div>

    <div class="info">
      <div class="bold">{{data.name}}</div>
      <div class="desc">{{data.desc}}</div>
      <div class="tags">
        <div class="tag" v-for="tag in data.tags" @click="handleTagClick(tag)">{{tag}}</div>
      </div>
    </div>

    <RouterLink :to="'/podcast/'+data.id">
      <div class="button round"><PlayIcon/></div>
    </RouterLink>

  </div>
</template>

<style scoped lang="scss">

@import "../../assets/Library";

.tags{
  margin-top: 1vw;
  display: flex;
}

.tag{
  display: flex;
  align-items: center;
  margin-right: 1vw;
  padding: 1vw;
  height: 45px;
  border-radius: 45px;
  background-color: $secondary;
  cursor: pointer;
  transition: all 0.3s;

  &:hover {
    background-color: darken($secondary, 5%);
  }
}

.image{
  background-image: v-bind(imageUrl);
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

</style>

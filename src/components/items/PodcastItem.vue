<script setup lang="ts">

import PlayIcon from "@/components/icons/PlayIcon.vue";

const props = defineProps({
  data: { type: Object, default: ()=>{}},
})

</script>

<template>
  <div class="podcast">

    <div class="info">
      <div class="name">{{data.name}}</div>
      <div class="desc">{{data.desc}}</div>
    </div>

    <div class="playBtn"><PlayIcon/></div>

  </div>
</template>

<style scoped lang="scss">

@import "../../assets/Colors";

.podcast{
  display: flex;
  border-bottom: 4px solid $secondary;
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

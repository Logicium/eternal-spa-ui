<script setup lang="ts">

import {computed, onMounted, ref, useTemplateRef} from "vue";

const props = defineProps(['name','image']);

const imageUrl = computed(()=> 'url("'+props.image+'")').value;

const serviceRef = useTemplateRef('serviceRef');

const reveal = ref(false);

function isInView() {

  if(serviceRef.value){
    let box = serviceRef.value.getBoundingClientRect();
    let isShown = (box.top < window.innerHeight && box.bottom >= 0);
    reveal.value = isShown;
  }

}

onMounted(()=>{

    window.addEventListener('scroll',isInView);

});


</script>

<template>
  <div class="service">
    <div class="image" ref="serviceRef" :class=" reveal ? 'reveal':'' "/>
    <div class="serviceInfo">

      <div class="nameWrap">
        <div class="name">{{name}}</div>
      </div>

    </div>
  </div>

</template>

<style lang="scss" scoped>

@import "../../assets/Library";

.nameWrap{
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.reveal{
  opacity: 1 !important;
  transition: opacity 2s linear;
}

.name{
  font-size: 3vw;
}

.image{
  background-image: v-bind(imageUrl);
  height: 80%;
  opacity: 0;
}

.service{
  width: 100%;
  height: 100%;
}

.serviceInfo{
  margin-top: 1vw;
  height: 4vw;
  display: flex;
  width: 100%;
  justify-content: space-between;
  align-items: center;
}

</style>

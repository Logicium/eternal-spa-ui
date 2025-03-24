<script setup lang="ts">

import {computed, onMounted, ref, useTemplateRef} from "vue";

const props = defineProps(['name','image','offset']);

const imageUrl = computed(()=> 'url("'+props.image+'")').value;

 const serviceRef = useTemplateRef('serviceRef');
//const serviceRef = ref<HTMLElement|null>(null);

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
<!--  :style="{ gridRow: offset ? '4 / 8' : 'span 3'}"-->
  <div class="service">
    <div class="serviceImg" ref="serviceRef" :class=" reveal ? 'reveal':'' "/>
    <div class="serviceInfo">

      <div class="nameWrap">
        <div class="name">{{name}}</div>
      </div>

      <div class="button">
        <div>LEARN MORE</div>
      </div>

    </div>
  </div>

</template>

<style lang="scss" scoped>

@import "../assets/Colors";

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
  font-weight: 600;
}

.serviceImg{
  background-size: cover;
  background-position: 100% 100%;
  background-image: v-bind(imageUrl);
  height: 80%;
  opacity: 0;
}

.service{
  width: 100%;
  height: 100%;
  grid-column: span 2;
}

.serviceInfo{
  margin-top: 1vw;
  height: 4vw;
  display: flex;
  width: 100%;
  justify-content: space-between;
}

.button{
  display: flex;
  height: 4vw;
  border-radius: 6px;
  color: $primary;
  background-color: $quaternary;
  width: 12vw;
  justify-content: center;
  align-items: center;
  cursor: pointer;
}

//$ROSE: #B59194;
</style>

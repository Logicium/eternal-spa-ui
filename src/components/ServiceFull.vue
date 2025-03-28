<script setup lang="ts">

import {computed, ref} from "vue";

const props = defineProps(['name','image','desc']);
const imageUrl = computed(()=> 'url("'+props.image+'")').value;
const active = ref(false);

</script>

<template>

  <div class="service">

    <div class="servicePreview">

      <div  :class="active ? 'imagePanel expand' : 'imagePanel' ">

        <div :class="active ? 'fullImage fadeIn' : 'fullImage' "></div>

        <div class="infoRow">
          <div class="serviceName">{{name}}</div>
          <div class="serviceControl" @click="active=!active">+</div>
        </div>

        <div class="serviceDesc">{{desc}}</div>

        <div :class="active ? 'fadeIn options' : 'options' ">

          <div class="option">
            <div>30 Minute Session</div>
            <div>A full 30 minute session that will work the tissues and stimulate circulation.</div>
            <div class="bookBtn">Book Session</div>
          </div>

          <div class="option">
            <div>30 Minute Session</div>
            <div>A full 30 minute session that will work the tissues and stimulate circulation.</div>
            <div class="bookBtn">Book Session</div>
          </div>

          <div class="option">
            <div>30 Minute Session</div>
            <div>A full 30 minute session that will work the tissues and stimulate circulation.</div>
            <div class="bookBtn">Book Session</div>
          </div>

        </div>

      </div>

    </div>

  </div>

</template>

<style lang="scss" scoped>

@import "../assets/Colors";
@import "../assets/Keyframes";

.fullImage{
  position: absolute;
  z-index: 0;
  width: 100%;
  height: 100%;
  border-radius: 25px;
  background-size: cover;
  background-position: 100% 50%;
  background-image: v-bind(imageUrl);
  animation: 1s fadeout forwards;
}


.imagePanel{
  position: relative;
  animation: 1s collapse forwards, reverseColors 1s forwards;
  height: fit-content;
}

.infoRow{
  width: 100%;
  display: flex;
  justify-content: space-between;
  position: relative;
}


.service{
  display: flex;
  flex-direction: column;
  align-items: center;
}

.serviceControl{
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 45px;
  width: 45px;
  border-radius: 50%;
  background-color: $secondary;
}

.servicePreview{
  position: relative;
  display: flex;
  flex-direction: column;
  width: 80%;
  border-bottom: 2px solid $secondary;
  padding-bottom: 2vw;
}

.serviceDesc{
  margin-top: 2vw;
  width: 80%;
  position: relative;
  z-index: 1;
}

.serviceTitle{
  color: $primary;
  height: 15vw;
  font-size: 3vw;
}

.serviceName{
  font-size: 3vw;
}

.options{
  color: $quaternary;
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  animation: fadeRemove .25s forwards;
}

.option{
  display: flex;
  flex-direction: column;
  padding: 1vw;
  background-color: $primary;
  width: 20vw;
  min-height: 30%;
}

.bookBtn{
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 45px;
  width: fit-content;
  padding: 1vw;
  color: $primary;
  background-color: $quaternary;
  border-radius: 6px;
}

.serviceImage{
  border-radius: 6px;
  background-size: cover;
  background-position: 100% 50%;
  background-image: v-bind(imageUrl);
  animation: collapse 1s forwards;
}

.expand{
  animation: expand 1s forwards, colorChange 1s forwards;
}

.fadeIn{
  animation: 1s fadein forwards;
}

.fadeOut{
  animation: 1s fadeout forwards;
}

@keyframes expand {
  from{
    height: calc-size(auto, size);
  }
  to{
    height: 50vh;
  }
}

@keyframes collapse {
  from{
    height: 50vh;
  }
  to{
    height: calc-size(auto, size);
  }
}

@keyframes colorChange{
  from{
    color: $quaternary;
  }
  to{
    color: $primary;
  }
}

@keyframes reverseColors{
  from{
    color: $primary;
  }
  to{
    color: $quaternary;
  }
}

@keyframes fadeEnter {
  from {
    opacity: 0;
  }
  to{
    opacity: 1;
  }
}

@keyframes fadeRemove {
  from {
    opacity: 1;
  }
  to{
    opacity: 0;
    display: none;
  }
}



</style>

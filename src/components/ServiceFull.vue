<script setup lang="ts">

import {computed, ref} from "vue";
import PlusIcon from "@/assets/icons/PlusIcon.vue";
import MinusIcon from "@/assets/icons/MinusIcon.vue";

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

          <div class="serviceControl" @click="active=!active">
            <div :class=" !active ? 'plus rotateIn':'plus' "><PlusIcon/></div>
            <div :class=" active ? 'minus rotateIn':'minus' "><MinusIcon/></div>
          </div>

        </div>

        <div class="serviceDesc">{{desc}}</div>

        <div class="optionsWrap">

          <div :class="active ? 'fadeIn options' : 'options' ">

            <div class="option">
              <div class="optionName">30 Minute Session</div>
              <div>A full 30 minute session that will work the tissues and stimulate circulation.</div>
              <div class="bookBtn">Book Service</div>
            </div>

            <div class="option">
              <div class="optionName">60 Minute Session</div>
              <div>A full 30 minute session that will work the tissues and stimulate circulation.</div>
              <div class="bookBtn">Book Service</div>
            </div>

            <div class="option">
              <div class="optionName">90 Minute Session</div>
              <div>A full 30 minute session that will work the tissues and stimulate circulation.</div>
              <div class="bookBtn">Book Service</div>
            </div>

          </div>

        </div>



      </div>

    </div>

  </div>

</template>

<style lang="scss" scoped>

@import "../assets/Colors";
@import "../assets/Keyframes";

.plus,.minus{
  position: absolute;
  opacity: 0;
  transform:rotate(0deg);
  transition: transform 1s ease,opacity 1s ease;
}

.rotateIn{
  transform:rotate(180deg);
  transition: transform 1s ease,opacity 1s ease;
  opacity: 1;
}

.fullImage{
  position: absolute;
  z-index: 0;
  width: 100%;
  height: 100%;
  border-radius: 6px;
  background-size: cover;
  background-position: 100% 50%;
  background-image: v-bind(imageUrl);
  animation: 1s fadeout forwards;
  filter: sepia(30%) brightness(80%);
}


.imagePanel{
  display: flex;
  flex-direction: column;
  position: relative;
  animation: 1s collapse forwards, reverseColors 1s forwards;
  height: fit-content;
}

.infoRow{
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: relative;
}


.service{
  display: flex;
  flex-direction: column;
  align-items: center;
}

.serviceControl{
  margin-right: 2vw;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 45px;
  width: 45px;
  border-radius: 50%;
  background-color: $secondary;
  font-size: 30px;
}

.servicePreview{
  position: relative;
  display: flex;
  flex-direction: column;
  width: 80%;
  border-bottom: 3px solid $secondary;
  padding-bottom: 2vw;
}

.serviceDesc{
  padding-left: 2vw;
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
  padding-left: 2vw;
  font-size: 3vw;
}

.optionsWrap{
  display: flex;
  height: 100%;
  align-items: center;
}

.options{
  width: 100%;
  position: absolute;
  color: $primary;
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  animation: fadeRemove .25s forwards;
}

.option{
  display: flex;
  flex-direction: column;
  padding: 1vw;
  border: 3px solid $primary;
  width: 20vw;
  height: 100%;
}

.optionName{
  font-weight: 500;
  margin-bottom: 1vw;

}

.bookBtn{
  margin-top: 1vw;
  cursor: pointer;
  display: flex;
  align-self: center;
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

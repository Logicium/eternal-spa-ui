<script setup lang="ts">

import {computed, ref} from "vue";

const props = defineProps(['name','image','desc']);
const imageUrl = computed(()=> 'url("'+props.image+'")').value;
const active = ref(false);

</script>

<template>

  <div class="service">

    <div class="servicePreview">

      <div class="infoRow">
        <div class="serviceName">{{name}}</div>
        <div class="serviceControl" @click="active=!active">+</div>
      </div>

      <div class="serviceDesc">{{desc}}</div>

      <div :class="active ? 'serviceImage active':'serviceImage'">

        <div class="options">
          <div class="option">
            <div class="optionName">30 Minute Session</div>
            <div class="optionPrice">$49</div>
            <div class="bookBtn">Book Session</div>
          </div>

          <div class="option">
            <div class="optionName">60 Minute Session</div>
            <div class="optionPrice">$79</div>
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

.infoRow{
  width: 100%;
  display: flex;
  justify-content: space-between;
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
  display: flex;
  flex-direction: column;
  width: 80%;
  border-bottom: 2px solid $secondary;
  padding-bottom: 2vw;
}

.serviceDesc{
  margin-top: 2vw;
  width: 80%;
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
  display: flex;
  justify-content: space-evenly;
  align-items: end;
  width: 100%;
  height: 100%;
  animation: fadein 1s forwards;
}

.option{
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 1vw;
  background-color: $secondary;
  width: 15vw;
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
  margin-top: 2vw;
  border-radius: 6px;
  background-size: cover;
  background-position: 100% 50%;
  background-image: v-bind(imageUrl);
  animation: collapse 1s forwards;
}

.active{
   padding: 2vw;
   height: 50vh;
   display: flex;
   justify-content: space-evenly;
   align-items: center;
   border-radius: 6px;
   background-size: cover;
   background-position: 100% 50%;
   background-image: v-bind(imageUrl);
   animation: expand 1s forwards;
 }

@keyframes expand {
  from{
    margin-top: 0;
    opacity: 0;
    height: 0;
  }
  to{
    margin-top: 2vw;
    opacity: 1;
    height: 50vh;
  }
}

@keyframes collapse {
  from{
    margin-top: 2vw;
    height: 50vh;
    opacity: 1;
    display: flex;
  }
  to{
    margin-top: 0;
    height: 0;
    opacity: 0;
    display: none;
  }
}



</style>

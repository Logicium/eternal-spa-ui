<script setup lang="ts">

import data from "@/data.ts";
import {useRoute} from "vue-router";
import {computed, ref} from "vue";
import Map from "@/components/Map.vue";
import CalLargeIcon from "@/assets/icons/CalLargeIcon.vue";
import TimeLargeIcon from "@/assets/icons/TimeLargeIcon.vue";
import LocationLargeIcon from "@/assets/icons/LocationLargeIcon.vue";

const route = useRoute();
const id = Number(route.params.id);
console.log("ID: ",id);
const loadedData = data.events[id];

const imageUrl = computed(()=> 'url("'+loadedData.image+'")').value;

let dateTime = new Date(loadedData.time);
let day = dateTime.toLocaleString('en-US', {weekday: 'short'});
const dayLong = dateTime.toLocaleString('en-US', {weekday: 'long'});
let date = ref(dateTime.getDate());
let month = dateTime.toLocaleString('en-US', {month: 'short'});
const monthLong = dateTime.toLocaleString('en-US', {month: 'long'});
const year = dateTime.toLocaleString('en-US', {year: 'numeric'});
let time = dateTime.toLocaleString('en-US', { hour: 'numeric', hour12: true });

const endTime = new Date(loadedData.end_time).toLocaleString('en-US', { hour: 'numeric', hour12: true });

</script>

<template>

  <div class="headerLarge">

    <div class="info">

      <div class="name">{{loadedData.name}}</div>

<!--      <div class="locale">-->
<!--        <LocationIcon/>{{loadedData.location}} | <TimeIcon/> {{time}}-->
<!--      </div>-->

      <div class="cards">

        <div class="infoCard">
          <div class="icon"><CalLargeIcon/></div>
          <div class="infoCol">
            <div>Date:</div>
            <div>{{monthLong}}, {{date}} {{year}}</div>
          </div>
        </div>

        <div class="infoCard">
          <div class="icon"><TimeLargeIcon/></div>
          <div class="infoCol">
            <div>Time:</div>
            <div>{{time}} - {{endTime}}</div>
          </div>
        </div>

        <div class="infoCard">
          <div class="icon"><LocationLargeIcon/></div>
          <div class="infoCol">
            <div>Location:</div>
            <div class="locationName">{{ loadedData.location }}</div>
          </div>
        </div>

      </div>

    </div>

  </div>

  <div class="event">



    <div class="about">
      <div class="title">Information</div>
      <div>{{loadedData.descFull}}</div>
      <!--      <div class="title">Price</div>-->
      <!--      <div>Free</div>-->
    </div>

    <div class="location">

      <div class="infoRow">

        <div class="infoCol">
          <div class="title">Location</div>
          <div class="locationName">{{loadedData.location}}</div>
          <div class="address">{{loadedData.address}}</div>
        </div>

        <div class="infoCol price">
          <div class="title">Price</div>
          <div>Free</div>
        </div>

        <div class="infoCol booking">
          <div class="title">Booking</div>
          <div>{{dateTime.toDateString()}}</div>
          <div class="cta">Add to Calendar</div>
        </div>

      </div>



      <div class="map"><Map/></div>

    </div>

  </div>

</template>

<style scoped lang="scss">

@import "../assets/Colors";
@import "../assets/Fonts";

.title{
  font-size: $fontMed;
}

.bold{
  font-weight: 500;
}

.infoRow{
  display: grid;
  grid-template-columns: repeat(3,1fr);
  margin-bottom: 2rem;
}


.cards{
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-gap: 2rem;
  margin-top: 2rem;
  font-size: $fontNormal;
  width: 80%;
  justify-self: center;
}

.infoCard{
  display: flex;
  align-items: center;
  justify-content: center;
}

.icon{
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 1vw;
}

.about{
  margin-top: 1rem;
  margin-bottom: 1rem;
}

.booking{
  text-align: right;
}

.price{
  text-align: center;
}
.name{
  width: 80%;
  text-align: center;
  justify-self: center;
}

.locationInfo{
  display: flex;
}

.locationInfo2{
  min-width: 50%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.eventInfo{
  width: 50%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.locationName{

}

.eventCard{
  height: 20vh;
  border: 4px solid $secondary;
  border-radius: 6px;
  display: flex;
}

.headerLarge{
  display: flex;
  flex-direction: column;
  height: 70vh;
  background-size: cover;
  background-position: 100% 35%;
  background-image: v-bind(imageUrl);
  font-size: $fontBig;
  color: $primary;
  justify-content: space-evenly;
  align-items: center;
  padding: 2rem;
}

.locale{
  display: flex;
  align-items: center;
  justify-content: center;
  white-space: break-spaces;
  font-size: $fontMed;
}

.event{
  display: flex;
  flex-direction: column;
  justify-self: center;
  width: 80%;
  padding-bottom: 2rem;
}

.map{
  height: 30vh;
}

.date{
  width: 50%;
  margin-right: 1vw;
  background-color: $secondary;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  border-radius: 6px;
}

.num{
  font-size: $fontMed;
  font-weight: 500;
}

.cta{
  margin-left: auto;
  border-bottom: 4px solid $secondary;
  width: fit-content;
  font-weight: 500;
  color: $quaternary;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
}

</style>

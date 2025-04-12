<script setup lang="ts">

import {computed, ref, watch} from "vue";
import BackIcon from "@/assets/icons/BackIcon.vue";
import data from "@/data.ts";
import NextIcon from "@/assets/icons/NextIcon.vue";

const props = defineProps(
  {
    backClick: {
      type: Function
    },
    toggle:{
      type: Object
    },
    data:{
      type: Object,
      required:true,
    }
  }
);

const dateTime = ref(new Date());
const day = ref();
const date = ref();
const month = ref();
const year = ref();
const time = ref();

const serviceData = ref();
const serviceImage = ref();

const selectedPackage = ref({desc:'',duration:0,price:0});
const selectedPackageName = ref();
const selectedAddons = ref([]);
const selectedAddonsNames = ref([]);
const totalDuration = ref(0);
const totalCost = ref(0);

const calcPrice = function (){
  let total = selectedPackage.value.price;
  if(selectedAddons){
    selectedAddons.value.forEach((addOn)=>{
      total += addOn.price;
    });
  }
  return total;
};

const calcDuration = function (){
  let total = selectedPackage.value.duration;
  if(selectedAddons){
    selectedAddons.value.forEach((addOn)=>{
      total += addOn.duration;
    });
  }
  return total;
};

watch(selectedAddonsNames,(newValue,oldValue)=>{
  selectedAddons.value = serviceData.value.addOns.filter( addOn => (
    selectedAddonsNames.value.includes(addOn.name)
  ));
});

watch(()=>props.data,(newValue,oldValue)=>{
  if(newValue){
    dateTime.value = new Date(newValue.timeslot);
    day.value = dateTime.value.toLocaleString('en-US', {weekday: 'long'});
    date.value = dateTime.value.getDate();
    month.value = dateTime.value.toLocaleString('en-US', {month: 'long'});
    year.value = dateTime.value.toLocaleString('en-US', {year: 'numeric'});
    time.value = formatTime(dateTime.value);

    serviceData.value = data.services.find(service => (service.id === newValue.serviceId) );
    serviceImage.value = computed(()=> 'url("'+serviceData.value.image+'")').value;
  }
});

watch(selectedPackageName,(newValue,oldValue)=>{
  selectedPackage.value = serviceData.value.packages.find( packageItem => (
    packageItem.name === newValue
  ));
});



const formatTime = function(date: Date){
  const formatter = new Intl.DateTimeFormat('en-US', {
    hour: '2-digit',
    minute: '2-digit',
    hour12: true
  });
  return formatter.format(date);
};

const backPanelClick = function(){
  props.backClick();
}

</script>

<template>
  <div class="summaryWrap">
    <div :class="toggle ? 'summary slideIn' : 'summary' ">
      <template v-if="data">

        <div class="packages">

          <div class="controls">
            <div class="backBtn" @click="backPanelClick"><BackIcon/>Back</div>
            <template v-if="serviceData">
              <select id="packages" v-model="selectedPackageName">
                <template v-for="packageItem in serviceData.packages">
                  <option>{{packageItem.name}}</option>
                </template>
              </select>
            </template>
          </div>

          <div class="title">Package Selection</div>

          <div class="pkgSelection">
            <template v-if="serviceData">

              <div>{{selectedPackage.desc}}</div>

              <div>Duration: {{selectedPackage.duration}} minutes</div>

              <div>Price: ${{selectedPackage.price}}</div>

              <div class="title">Add ons</div>

              <div class="addOns">
                <div v-for="(addOn,index) in serviceData.addOns" class="addOn">
                  <input type="checkbox" :id="addOn.name" :value="addOn.name" v-model="selectedAddonsNames"/>
                  <label :for="addOn.name">{{addOn.name}}</label>
                  <div>Price: ${{addOn.price}}</div>
                </div>
              </div>

            </template>
          </div>

        </div>

        <div class="summaryArea">
          <template v-if="serviceData">

            <div class="row">

              <div class="col">
                <div class="title">Booking Summary</div>
                <div>Service: {{serviceData.name}} | {{selectedPackage.name}}</div>
                <div>Add ons: {{selectedAddonsNames.toString()}}</div>
                <div>Date: {{day}} {{date}}, {{month}} {{year}}
                </div><div>Time: {{time}}</div>
                <div>Duration: {{calcDuration()}} minutes</div>
                <div>Total Price: ${{calcPrice()}}</div>
                <div class="confirmBtn">Book & Checkout<NextIcon/></div>

              </div>

              <div class="serviceImg"></div>

            </div>

          </template>
        </div>

      </template>
    </div>
  </div>

</template>

<style scoped lang="scss">

@import "../assets/Library";

.row{
  display: flex;
  justify-content: space-between;
}

.col{
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.controls{
  display: flex;
  align-items: center;
}

.summary{
  margin-top: 2rem;
  z-index: 1;
  position: relative;
  width: 80%;
  display: flex;
  flex-direction: column;
  transform: translateX(0%);
  transition: 0.5s;
  justify-self: center;
  overflow: hidden;
}

.addOns{
  display: grid;
  grid-template-columns: repeat(3,1fr);
  grid-gap: 1vw;
}

.addOn{
  background-color: $secondary;
  border-radius: 6px;
  padding: 1vw;
}

.serviceImg{
  background-image: v-bind(serviceImage);
  background-size: cover;
  background-position: 100% 100%;
  aspect-ratio: 3/2;
  min-width: 30%;
  max-width: 30%;
  border-radius: 6px;
  margin-left: 1vw;
  text-align: right;
  color: $primary;
}

.panelHidden{
  transform: translateX(5%);
}

.slideIn{
  animation: 0.5s slidein ease;
}

.title{
  font-size: $fontMed;
}

.backBtn{
  height: 45px;
  width: fit-content;
  background-color: $secondary;
  border-radius: 6px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  padding: 1vw;
  margin-right: 1vw;
}

.packages,.summaryArea{
  display: flex;
  width: 100%;
  flex-direction: column;
  justify-content: space-between;
  border: 4px solid $secondary;
  border-radius: 6px;
  padding: 1vw;
}

.summaryArea{
  margin-top: 2rem;
  flex-direction: column;
}

.confirmBtn{
  background-color: $quaternary;
  color: $primary;
  border-radius: 6px;
  height: 45px;
  display: flex;
  align-items: center;
  margin-top: 1vw;
  padding: 1vw;
  justify-content: center;
  cursor: pointer;
  width: fit-content;
}

.summaryWrap{
  position: absolute;
  display: flex;
  width: 100%;
  justify-content: center;
}


select{
  height: 45px;
  background-color: $secondary;
  border: none;
  color: $quaternary;
  width: 100%;
  font-family: "Outfit", sans-serif;
  font-size: $fontNormal;
  transition: 0.5s;
  border-radius: 6px;
}

select:focus{
  outline: none;
}



</style>

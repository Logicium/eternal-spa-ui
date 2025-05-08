<script setup lang="ts">

import {computed, ref, watch} from "vue";
import BackIcon from "@/assets/icons/nav/BackIcon.vue";
import NextIcon from "@/assets/icons/nav/NextIcon.vue";
import CheckoutCard from "@/components/cards/CheckoutCard.vue";
import {useServicesStore} from "@/stores/ServiceStore.ts";
import utils from "@/utils/utils.ts";
import type {Booking} from "@/interfaces/Booking.ts";
import type {Addon} from "@/interfaces/Addon.ts";
import type {Package} from "@/interfaces";

const props = defineProps(
  {
    backClick: {
      type: Function,
      required: true,
    },
    toggle:{
      type: Boolean
    },
    data:{
      type:[Object as () => Booking,null],
    },
    selectedPackageName:{
      type:[String,null]
    },
    selectedAddonsNames:{
      type:Object
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

const selectedPackage = ref({id:'',name:'',desc:'',duration:0,price:0});
const selectedAddons = ref([]);

const allServicesData = useServicesStore();

const calcPrice = function (){
  return utils.calc.calcTotalPrice(selectedPackage.value.price, selectedAddons.value);
};

const calcDuration = function (){
  return utils.calc.calcTotalDuration(selectedPackage.value.duration, selectedAddons.value);
};

const calcTimeEnd = function(): Date { // Return a Date object or null if input is invalid
  const startTime = dateTime.value; // Assuming dateTime.value holds a Date object
  const totalDurationMinutes = calcDuration();
  return utils.date.calcTimeEnd(startTime, totalDurationMinutes);
};

watch(()=>props.selectedAddonsNames,(newValue,oldValue)=>{
  if(newValue){
    selectedAddons.value = serviceData.value.addons.filter( (addOn:Addon) => (
      newValue.includes(addOn.name)
    ));
  }
});

watch(()=>props.data,(newValue,oldValue)=>{
  if(newValue){
    console.log(newValue);
    dateTime.value = new Date(newValue.timeStart);
    day.value = dateTime.value.toLocaleString('en-US', {weekday: 'long'});
    date.value = dateTime.value.getDate();
    month.value = dateTime.value.toLocaleString('en-US', {month: 'long'});
    year.value = dateTime.value.toLocaleString('en-US', {year: 'numeric'});
    time.value = formatTime(dateTime.value);

    serviceData.value = allServicesData?.services?.find(service => (service.id === newValue.service) );
    serviceImage.value = computed(()=> 'url("'+serviceData.value.image+'")').value;
  }
});

watch(()=>props.selectedPackageName,(newValue,oldValue)=>{
  if(newValue) {
    selectedPackage.value = serviceData.value.packages.find((packageItem:Package) => (
      packageItem.name === newValue
    ));
  }
});

const formatTime = function(date: Date){
  return utils.date.formatTime(date);
};

const backPanelClick = function(){
  props.backClick();
  // selectedPackageName.value = null;
  // selectedAddonsNames.value = [];
  // selectedPackage.value =  {desc:'',duration:0,price:0};
}

</script>

<template>
  <div class="summaryWrap">
    <div :class="toggle ? 'summary slideIn' : 'summary' ">
      <template v-if="data">

        <div class="summaryArea">
          <template v-if="serviceData">

            <div class="row">
              <div class="col">
                <div class="title">Booking Summary</div>
                <div>Service: {{serviceData.name}} | {{selectedPackage.name}}</div>
                <div>Add ons: {{selectedAddonsNames?.toString()}}
                  <template v-if="selectedAddonsNames?.length===0">None</template>
                </div>
                <div>Date: {{day}} {{date}}, {{month}} {{year}}
                </div><div>Time: {{time}}</div>
                <div>Duration: {{calcDuration()}} minutes</div>
                <div>Total Price: ${{calcPrice()}}</div>
                <div class="backBtn" @click="backPanelClick"><BackIcon/>Back: Package Selection</div>
              </div>

              <div class="serviceImg"></div>

            </div>

          </template>
        </div>

        <CheckoutCard
          :guest-id="null"
          :vendor-id="data.vendorId || ''"
          :time-start="dateTime.toString()"
          :time-end="calcTimeEnd().toString()"
          :total-duration="calcDuration()"
          :service-id="serviceData?.id?.toString() || ''"
          :package-id="selectedPackage?.id || ''"
          :addons="selectedAddons"
        />

      </template>
    </div>
  </div>

</template>

<style scoped lang="scss">

@import "../../assets/Library";

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
  margin-top: $sp-xl;
  position: relative;
  width: $w-80;
  display: flex;
  flex-direction: column;
  transform: translateX(0%);
  transition: 0.5s;
  justify-self: center;
  overflow: hidden;
  transition-behavior: allow-discrete;
}

.serviceImg{
  background-image: v-bind(serviceImage);
  background-size: cover;
  background-position: 100% 100%;
  aspect-ratio: 3/2;
  min-width: 30%;
  max-width: 30%;
  border-radius: $br-md;
  margin-left: $sp-vw-sm;
  text-align: right;
  color: $primary;
}

.panelHidden{
  transform: translateX(5%);
  display: none !important;
  position: absolute;
}

.slideIn{
  animation: 0.5s slidein ease;
}

.title{
  font-size: $fontMed;
}

.backBtn{
  height: $h-btn;
  width: fit-content;
  background-color: $secondary;
  border-radius: $br-md;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  padding: $sp-vw-sm;
  margin-top: $sp-vw-sm;
}

.summaryArea{
  display: flex;
  width: $w-full;
  flex-direction: column;
  justify-content: space-between;
  border: $bw-md solid $secondary;
  border-radius: $br-md;
  padding: $sp-vw-sm;
}

.confirmBtn{
  background-color: $quaternary;
  color: $primary;
  border-radius: $br-md;
  height: $h-btn;
  display: flex;
  align-items: center;
  margin-top: $sp-vw-sm;
  padding: $sp-vw-sm;
  justify-content: center;
  cursor: pointer;
  width: fit-content;
}

.summaryWrap{
  display: flex;
  width: $w-full;
  justify-content: center;
  margin-bottom: $sp-xl;
  overflow: hidden;
}




</style>

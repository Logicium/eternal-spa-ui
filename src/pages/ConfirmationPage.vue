<script setup lang="ts">
import {computed, ref, watch} from "vue";
import api from "@/router/api.ts";
import LoadingPage from "@/pages/LoadingPage.vue";
import TransitionPanel from "@/components/panels/TransitionPanel.vue";
import Map from "@/components/Map.vue";

import { useRoute } from 'vue-router'
import type {Reservation} from "@/interfaces";

const fetchedData = ref<Reservation | null>(null);
const imageUrl = ref(null);

const route = useRoute()
const reservationId = route.query.orderId;

console.log("Confirmation Page")
const fetchData = async function (){
  const response = await fetch(`http://localhost:3000/reservation/${reservationId}`, {});

  const data = await response.json();
  fetchedData.value = data;
  // imageUrl.value = computed(()=> 'url("https://strapi-8w04.onrender.com'+data.data.bannerImage.url+'")').value;
  console.log(data);
}

const formatDate = function(dateString:string) {
  if (!dateString) return '';
  const date = new Date(dateString);
  const day = date.toLocaleString('en-US', { weekday: 'long' });
  const dateNum = date.getDate();
  const month = date.toLocaleString('en-US', { month: 'long' });
  const year = date.toLocaleString('en-US', { year: 'numeric' });
  return `${day} ${dateNum}, ${month} ${year}`;
}

const formatTime = function(dateString:string) {
  if (!dateString) return '';
  const date = new Date(dateString);
  const formatter = new Intl.DateTimeFormat('en-US', {
    hour: '2-digit',
    minute: '2-digit',
    hour12: true
  });
  return formatter.format(date);
}

fetchData();

</script>

<template>

  <TransitionPanel>

    <LoadingPage v-if="fetchedData===null" />
    <div v-else class="confirmationWrapper">
      <div class="header">CONFIRMATION</div>
      <div class="confirmation">
        <div class="summaryArea">
          <div class="row">
            <div class="col half-width">
              <div class="title">Booking Confirmation</div>
              <div class="infoRow"><span class="label">Service:</span> {{ fetchedData.name }}</div>
              <div class="infoRow"><span class="label">Order ID:</span> {{ fetchedData.orderId }}</div>
              <div class="infoRow"><span class="label">Date:</span> {{ formatDate(fetchedData.timeStart) }}</div>
              <div class="infoRow"><span class="label">Time:</span> {{ formatTime(fetchedData.timeStart) }} - {{ formatTime(fetchedData.timeEnd) }}</div>
              <div class="infoRow"><span class="label">Duration:</span> {{ fetchedData.totalDuration }} minutes</div>
              <div class="infoRow"><span class="label">Total Price:</span> ${{ fetchedData.totalPrice }}</div>
              <div class="infoRow"><span class="label">Status:</span>
                <span :class="fetchedData.confirmed ? 'status confirmed' : 'status pending'">
                  {{ fetchedData.confirmed ? 'Confirmed' : 'Pending' }}
                </span>
              </div>

              <div v-if="fetchedData.receiptUrl" class="buttonRow">
                <a :href="fetchedData.receiptUrl" target="_blank" class="button">View Receipt</a>
              </div>
            </div>
            <div class="col half-width map-container">
              <Map />
            </div>
          </div>
        </div>
      </div>
    </div>

  </TransitionPanel>

</template>

<style scoped lang="scss">

@import "../assets/Library";

.confirmationWrapper {
  display: flex;
  flex-direction: column;
  width: 100%;
  align-items: center;
  margin-bottom: 2rem;
}

.confirmation {
  width: 80%;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.summaryArea {
  display: flex;
  width: 100%;
  flex-direction: column;
  justify-content: space-between;
  border: 4px solid $secondary;
  border-radius: 6px;
  padding: 2vw;
  margin-top: 2rem;
}

.row {
  display: flex;
  justify-content: space-between;
}

.col {
  display: flex;
  flex-direction: column;
  width: 100%;
}

.half-width {
  width: 50%;
}

.map-container {
  min-height: 300px;
  padding-left: 1rem;
}

.title {
  font-size: $fontMed;
  margin-bottom: 1rem;
  color: $quaternary;
}

.header{
  min-width: 100%;
  background-image: url("/fishers-peak/mountain2.jpg");
}

.infoRow {
  margin-bottom: 0.8rem;
  font-size: $fontNormal;
}

.label {
  font-weight: bold;
  color: $quaternary;
  margin-right: 0.5rem;
}

.status {
  padding: 0.2rem 0.5rem;
  border-radius: 4px;
  font-weight: bold;
}

.confirmed {
  background-color: #72BAA9;
  color: white;
}

.pending {
  background-color: #FFD2A0;
  color: $quaternary;
}

.buttonRow {
  margin-top: 1.5rem;
  display: flex;
  gap: 1rem;
}

</style>

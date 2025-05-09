<script setup lang="ts">

import {ref, watch} from 'vue'
import type WaveSurfer from 'wavesurfer.js'
import { WaveSurferPlayer } from '@meersagor/wavesurfer-vue'
import PlayIcon from "@/assets/icons/audio/PlayIcon.vue";
import * as colors from "@/assets/Colors.scss"
import PauseIcon from "@/assets/icons/audio/PauseIcon.vue";
import SkipForwardIcon from "@/assets/icons/audio/SkipForwardIcon.vue";
import SkipBackIcon from "@/assets/icons/audio/SkipBackIcon.vue";

const props = defineProps(['url'])

const options = ref({
  height: 120,
  // waveColor: '#A9B5DF',
  waveColor: '#FFF2F2',
  progressColor: '#2D336B',
  barGap: 5,
  barWidth: 5,
  barRadius: 8,
  duration: 80,
  url: props.url,
})

const currentTime = ref<string>('00:00')
const totalDuration = ref<string>('00:00')
const waveSurfer = ref<WaveSurfer | null>(null)

const formatTime = (seconds: number): string => [seconds / 60, seconds % 60].map((v) => `0${Math.floor(v)}`.slice(-2)).join(':')

const timeUpdateHandler = (time: number) => {
  currentTime.value = formatTime(time)
}
const readyHandler = (duration: any) => {
  totalDuration.value = formatTime(duration)
}
const readyWaveSurferHandler = (ws: WaveSurfer) => {
  waveSurfer.value = ws
}
const playActive = ref(false);

watch(currentTime,()=>{
  console.log(currentTime.value)
  if(currentTime.value===totalDuration.value){
    playActive.value=false;
  }
});

const skipSeconds = (seconds: number) => {
  if (waveSurfer.value) {
    waveSurfer.value.skip(seconds);
  }
}
</script>

<template>
  <div class="controls">

    <WaveSurferPlayer
      :options="options"
      @timeupdate="(time: number) => timeUpdateHandler(time)"
      @ready="(duration: number) => readyHandler(duration)"
      @waveSurfer="(ws: WaveSurfer) => readyWaveSurferHandler(ws)"
      :style="{'z-index':0,'position':'relative'}"
    />
    <div class="times">

      <div class="time"> {{ currentTime }}</div>

      <div class="buttons">

        <div class="skip" @click="skipSeconds(-10)"><SkipBackIcon/></div>

        <div class="playBtn" @click="waveSurfer?.playPause();playActive=!playActive">
          <div :class=" !playActive ? 'controlIcon rotateIn' : 'controlIcon'"><PlayIcon/></div>
          <div :class=" playActive ? 'controlIcon rotateIn' : 'controlIcon'"><PauseIcon/></div>
        </div>

        <div class="skip" @click="skipSeconds(10)"><SkipForwardIcon/></div>
      </div>

      <div class="time"> {{ totalDuration }}</div>

    </div>
  </div>
</template>

<style scoped lang="scss">

@import "../../assets/Colors";
@import "../../assets/Fonts";

.controls{
  display: flex;
  flex-direction: column;
  padding: 2rem;
  justify-content: center;
  margin: 2rem 0;
}

.times{
  display: grid;
  grid-template-columns: repeat(3,1fr);
  grid-gap: 2rem;
  font-size: $fontMed;
  width: 50%;
  justify-self: center;
  border-radius: 6px;
  padding-top: 2rem;
  align-self: center;
}

.time{
  align-self: center;
  justify-self: center;
}

.skip{
  font-size: $fontNormal;
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
}

.buttons{
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.playBtn{
  background-color: $quaternary;
  display: flex;
  justify-content: center;
  align-items: center;
  color: $primary;
  height: 45px;
  width: 45px;
  border-radius: 50%;
  cursor: pointer;
  align-self: center;
  justify-self: center;
}

.controlIcon{
  position: absolute;
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 0;
  transform:rotate(180deg);
  transition: transform 1s ease,opacity 1s ease;
}

.rotateIn{
  transform:rotate(0deg);
  transition: transform 1s ease,opacity 1s ease;
  opacity: 1;
}

</style>

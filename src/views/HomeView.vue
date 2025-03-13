<script setup lang="ts">
import data from "../data.ts";
import Service from "@/components/Service.vue";
</script>

<template>
  <div class="home">

    <div class="titleWrap">
      <div class="title">ETERNAL SPA & WELLNESS CENTER</div>
      <div class="heroWrap">
        <video class="heroVideo parallax" src="../../public/spa0.mp4" autoplay muted loop></video>
      </div>
    </div>

    <div class="serviceWrap">

      <div class="serviceText">
        {{data.about0}}
      </div>

      <div class="serviceGrid">

        <div class="serviceDesc parallax-1">
          <div class="inner"> {{data.about1}}</div>
        </div>

        <Service name="Massage Therapy" image="../../public/massage1.jpg" :offset="false" style="grid-row: span 3"/>

        <Service name="Salt Bath" image="./../public/salt1.jpg" :offset="true" style="grid-row: span 3"/>

        <div class="serviceDesc parallax-2">
          <div class="inner">{{data.about1}}</div>
        </div>

        <div class="serviceDesc parallax-3" style="{grid-column: 1/3;}">
          <div class="inner">{{data.about1}}</div>
        </div>

        <Service name="Red Light Therapy"  image="../../public/light-therapy.jpg" style="grid-row: span 3"/>


      </div>

    </div>

  </div>

</template>

<style scoped>

.serviceDesc{
  grid-column: span 2;
  grid-row: span 3;
  display: flex;
  height: 100%;
}

.inner{
  align-self: center;
}
.home{
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.serviceGrid{
  position: relative;
  display: grid;
  grid-template-columns: 10vw 10vw 10vw 10vw;
  grid-template-rows: repeat(12,20vh);
  grid-column-gap: 10vw;
}

.serviceWrap{
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
}

.serviceText{
  text-align: center;
  width: 60%;
  font-size: calc(12px + 3vw);
  z-index: 1;
}

.titleWrap{
  width: 100%;
  height: 80vh;
}

.title{
  position: absolute;
  top: 30%;
  font-size: calc(12px + 7vw);
  text-align: center;
  mix-blend-mode: difference;
  filter: invert(80%);
  font-family: "Plaster", serif;
  z-index: 1;
}

.heroWrap{
  display: flex;
  justify-content: center;
  height: 50vh;
}

.parallax{
  animation-name: parallax;
  animation-duration: 1ms;
  animation-direction: alternate;
  animation-timeline: scroll(block nearest);
}

.parallax-1, .parallax-2, .parallax-3{
  animation-duration: 1ms;
  animation-direction: alternate;
  animation-timeline: scroll(block nearest);
}
.parallax-1{
  animation-name: parallax-1;
}
.parallax-2{
  animation-name: parallax-2;
}
.parallax-3{
  animation-name: parallax-3;
}

.heroVideo{
  position: absolute;
  width: 100%;
  height: 60vh;
  z-index: 0;
  object-fit: cover;
}

@keyframes parallax{
  from{
    transform: translateY(20%);
  }
  to{
    transform: translateY(-100%);
  }

}

@keyframes parallax-1{
  from{
    transform: translateY(30%);
  }
  to{
    transform: translateY(-50%);
  }
}

@keyframes parallax-2{
  from{
    transform: translateY(60%);
  }
  to{
    transform: translateY(-40%);
  }
}

@keyframes parallax-3{
  from{
    transform: translateY(100%);
  }
  to{
    transform: translateY(-20%);
  }
}

</style>

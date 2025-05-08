<script setup lang="ts">

import FacebookIcon from "@/assets/icons/socials/FacebookIcon.vue";
import YTIcon from "@/assets/icons/socials/YTIcon.vue";
import InstaIcon from "@/assets/icons/socials/InstaIcon.vue";
import {useRoute, useRouter} from 'vue-router';
import {onMounted, ref, watch} from "vue";

const route = useRoute();
const router = useRouter();
const showFull = ref(true);
const showFooter = ref(true);

onMounted(async ()=>{
  await router.isReady();
  showFull.value = !(router.currentRoute.value.path === '/login' || router.currentRoute.value.path === '/guest/account');
  showFooter.value = !(router.currentRoute.value.path === '/vendor/account');
  console.log(router.currentRoute.value.path)
})

watch(() => route.fullPath,
  (newPath, oldPath) => {
    console.log('Route changed from:', oldPath, 'to:', newPath);
    showFull.value = !(newPath === '/login' || newPath === '/guest/account');
    showFooter.value = !(newPath === '/vendor/account');
});

</script>

<template>

<div class="footer" v-if="showFooter">

  <div class="heroImage" v-if="showFull">
    <div class="ctaWrap">
      <div class="ctaText">Sign up to earn reward points and manage your bookings.</div>
      <div class="cta">
        <input type="email" placeholder="Email">
        <div class="button">Sign Up</div>
      </div>
    </div>

  </div>


  <div class="links">

    <div>
      <div class="name">CONTACT</div>
      <div>+1 719 256 1024</div>
      <div>sales@eternalspa.com</div>
    </div>

    <div>
      <div class="name">HOURS</div>
      <div>Mon - Fri: 10AM - 8PM</div>
      <div>Sat - Sun: 10AM - 5PM</div>

    </div>

    <div>
      <div class="name">LOCATION</div>
      <div>335 E Main Street</div>
      <div>Trinidad, CO 81082</div>
    </div>

  </div>

  <div class="socials">
    <div class="icon"><FacebookIcon/></div>
    <div class="icon"><InstaIcon/></div>
    <div class="icon"><YTIcon/></div>
  </div>

  <div class="disclaimers">
    <div class="policy">
      <RouterLink to="/login"><div class="link">Login</div></RouterLink>
      <RouterLink to="/privacy"><div class="link">Privacy Policy</div></RouterLink>
      <RouterLink to="/terms"><div class="link">Terms of Use</div></RouterLink>
    </div>
    <div>© All Rights Reserved</div>
  </div>

</div>

</template>

<style lang="scss" scoped>
@import "../assets/Library";

.heroImage{
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  padding-bottom: 2rem;
  background-image: url("/salt1.jpg");
  border-radius: 6px;
  color: $primary;
  background-size: cover;
  background-position: 100% 100%;
}

.policy{
  display: flex;
}

.socials{
  padding-bottom: 2rem;
  display: flex;
  width: 25rem;
  justify-content: space-evenly;
}

.icon{
  cursor: pointer;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 45px;
  width: 45px;
  background-color: $primary;
  color: $quaternary;
  transition: 0.5s;
}

.disclaimers{
  display: flex;
  flex-direction: column;
  width: 60%;
  align-items: center;
}

.footer{
  padding-bottom: 2rem;
  background-color: $secondary;
  color: $quaternary;
  border-top-left-radius: 6px;
  border-top-right-radius: 6px;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.ctaWrap{
  width: 60%;
}

.ctaText{
  margin-top: 1rem;
  margin-bottom: 1rem;
  font-size: 3vw;
  text-align: center;
}

.cta{
  margin-top: 2rem;
  display: flex;
  justify-content: space-between;
}

.name{
  font-weight: 600;
}

.links{
  margin-top: 2rem;
  margin-bottom: 2rem;
  display: flex;
  width: 60%;
  justify-content: space-between;
}

.link{
  cursor: pointer;
  margin: 0.5rem;
  transition: 0.5s;
}

.link:hover{
  font-weight: 600;
  transition: 0.5s;
}

.icon:hover{
  background-color: $quaternary;
  color: $primary;
  transition: 0.5s;
}


.button{
  cursor: pointer;
  color: $primary;
  width: 20%;
  height: 45px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: $quaternary;
  border-radius: 6px;
  padding: 1vw;
  margin-left: 1vw;
}

input{
  background-color: $primary;
  width: 80%;
}

a{
  color: $quaternary;
}

</style>

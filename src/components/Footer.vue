<script setup lang="ts">

</script>

<template>

<div class="footer">

  <div class="heroImage">
    <div class="ctaWrap">
      <div class="ctaText">Sign up to earn reward points and manage your bookings.</div>
      <div class="cta">
        <input type="email" placeholder="Email">
        <div class="button">SIGN UP</div>
      </div>
    </div>

  </div>

  <div class="links">

    <div class="navigation">
      <div class="name">NAVIGATION</div>
      <div>Home</div>
      <div>Services</div>
      <div>Specialists</div>
      <div>Podcast</div>
    </div>

    <div class="socials">
      <div class="name">SOCIAL</div>
      <div>Facebook</div>
      <div>Instagram</div>
      <div>Messenger</div>
    </div>

    <div class="resources">
      <div class="name">RESOURCES</div>
      <div>About</div>
      <div>Contact</div>
      <div>Terms of Service</div>
    </div>

  </div>

  <div class="disclaimers">
    <div>2025 Chappel House </div>
    <div>All Rights Reserved</div>
  </div>



</div>

</template>

<style lang="scss" scoped>
@import "../assets/Colors";

.heroImage{
  width: 100%;
  display: flex;
  justify-content: center;
  height: 30vh;
  background-image: url("public/salt1.jpg");
  border-radius: 6px;
  color: $primary;
  background-size: cover;
  background-position: 100% 100%;
}

.disclaimers{
  display: flex;
  width: 60%;
  justify-content: space-between;
}

.footer{
  padding-bottom: 2rem;
  background-color: $secondary;
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
  width: 80%;
  border-radius: 6px;
  border: none;
  font-family: "Outfit", sans-serif;
  font-size: 16px;
}

</style>

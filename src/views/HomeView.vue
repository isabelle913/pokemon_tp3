<template>
  <section ref="homeRef" class="home-class section">
    <!-- <div class="container mx-auto flex justify-center items-center text-white"> -->
    <div class="container mx-auto flex place-content-center items-center text-white h-full">
      <div class="home-title mb-32">
        Pokem
        <img class="w-[250px] h-[250px] inline" src="../assets/img/pokemon-symbol-logo-1000-blanc.png" alt="Balle Pokemon" />
        n
      </div>
    </div>
  </section>
  <section class="section carousel h-[1000px]">Carousel</section>
  <section class="section description h-[1000px]">Bandeau description</section>
  <section class="section newsletter h-[1000px]">inscription infolettre</section>
</template>

<script setup>
import { computed, onMounted, ref } from "vue";
import { useObserverStore } from "../stores/observer";

const observerStore = useObserverStore();

const homeRef = ref(null);

defineExpose({ homeRef });

onMounted(() => {
  observerStore.setHomeClass(document.querySelector(".home-class"));
});

/*
2 images
présenter sujet
section inscription infolettre
  nom
  email
  soumettre avec validation
  message merci ou confirmation


*/
</script>

<style>
.home-class {
  height: 100vh;
  background-color: #222e50;
}
.home-title {
  font-family: "Roboto Serif", serif;
  font-weight: 400;
  font-size: calc(4em + 8vw);
  /* font-size: 15vw; */
  /* font-size: min(30vw, 35px); */
}
.home-title:hover {
  color: #f4d77b;
}
</style>

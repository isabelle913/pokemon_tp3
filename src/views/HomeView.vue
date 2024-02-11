<template>
  <!-- Titre -->
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
  <!-- Slider -->
  <section class="section carousel pt-4">
    <div class="slider-pokemons auto-cols-max">
      <CardItem v-for="pokemon in displayPokemons" :key="pokemon.id" :pokemon="pokemon" :show-favorite="false" :show-types="false" />
    </div>
  </section>
  <section class="section description h-[1000px]">Bandeau description</section>
  <section class="section newsletter h-[1000px]">inscription infolettre</section>
</template>

<script setup>
import { computed, onMounted, ref, watch } from "vue";
import { useObserverStore } from "../stores/observer";
import { usePokemonsStore } from "../stores/pokemon";
import { useServices } from "../services/services.js";
import CardItem from "@/components/Card-item.vue";

const observerStore = useObserverStore();
const store = usePokemonsStore();
const { requestDetailsPokemon } = useServices();

const homeRef = ref(null);

defineExpose({ homeRef });

onMounted(() => {
  observerStore.setHomeClass(document.querySelector(".home-class"));
});

/// section slider

const displayPokemons = computed(() => {
  if (store.pokemons) return store.pokemons.slice(1, 10);
  else return [];
});

function getDetailsPokemons() {
  console.log("HOME displayPokemons", displayPokemons.value);
  const pokemonsNeedDetails = displayPokemons.value.filter((pokemon) => !pokemon.isLoaded);
  console.log("HOME pokemonsNeedDetails", pokemonsNeedDetails);
  if (pokemonsNeedDetails.length > 0) requestDetailsPokemon(pokemonsNeedDetails);
}

function load() {
  getDetailsPokemons();
}
load();

watch(displayPokemons, () => {
  getDetailsPokemons();
});

/*
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

/* slider */
.slider-pokemons {
  display: grid;
  grid-auto-flow: column;
  /* grid-auto-columns: 21%; */
  gap: 10px;

  /* overflow-x: auto; */
  overscroll-behavior-inline: contain;

  scroll-snap-type: inline mandatory;
  /* scroll-padding-inline: ; */
}
.slider-pokemons:hover {
  overflow-x: auto;
}
.slider-pokemons > * {
  scroll-snap-align: start;
  grid-template-rows: max-content;
}
.carousel {
  /* background-color: #222e50; */
  background: linear-gradient(#222e50, transparent);
}
</style>

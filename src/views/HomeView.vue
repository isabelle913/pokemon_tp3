<template>
  <!-- Titre -->
  <section ref="homeRef" class="home-class section">
    <div class="container mx-auto flex justify-center items-center text-white h-full">
      <div class="home-title mb-32 text-center">
        Pokem<span class="sm:hidden">o</span>
        <span class="hidden sm:inline md:mx-2 lg-mx-4 xl:mx-10"
          ><img
            class="w-[100px] h-[100px] md:w-[150px] md:h-[150px] lg:w-[200px] lg:h-[200px] xl:w-[250px] xl:h-[250px] 2xl:w-[300px] 2xl:h-[300px] inline"
            src="../assets/img/pokemon-symbol-logo-1000-blanc.png"
            alt="Balle Pokemon" /></span
        >n
      </div>
    </div>
  </section>

  <div class="background-home">
    <!-- Slider -->
    <section class="section carousel pt-4">
      <div class="slider-pokemons auto-cols-max">
        <CardItem v-for="pokemon in displayPokemons" :key="pokemon.id" :pokemon="pokemon" :show-favorite="false" :show-types="false" />
      </div>
    </section>

    <!-- description -->
    <section class="section description">
      <div class="container mx-auto flex flex-col bg-white my-6 p-6 rounded font-medium">
        <div class="text-2xl md:text-3xl font-medium mb-6">Je vous présente mon site sur les Pokémons.</div>
        <div class="mb-3 text-xl md:text-2xl">
          J’ai pris plaisir à faire ce TP3 du cours « Intégration d'interface utilisateur ». Cours dans le cadre d’un AEC fait au Cégep de Trois-Rivières.
        </div>
        <div class="text-xl md:text-2xl">
          Les Frameworks Vue.js et Tailwind CSS ainsi que Axios et PokéApi ont été mes outils. Merci, PokéApi pour ton savoir infini.
        </div>
      </div>
    </section>

    <!-- Pokemons newsletter -->
    <section class="section newsletter pb-6"><pok-news></pok-news></section>
  </div>
</template>

<script setup>
import { computed, onMounted, ref, watch } from "vue";
import { useObserverStore } from "../stores/observer";
import { usePokemonsStore } from "../stores/pokemon";
import { useServices } from "../services/services.js";
import CardItem from "@/components/Card-item.vue";
import PokNews from "@/components/pok-news.vue";

const observerStore = useObserverStore();
const store = usePokemonsStore();
const { requestDetailsPokemon } = useServices();

const homeRef = ref(null);

defineExpose({ homeRef });

onMounted(() => {
  observerStore.setHomeClass(document.querySelector(".home-class"));
});

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
.background-home {
  background-image: url("../assets/img/background-ligne-grises.jpg");
  background-size: cover;
}
</style>

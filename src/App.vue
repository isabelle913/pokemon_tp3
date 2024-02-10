<template>
  <Header></Header>
  <RouterView />
  <Footer></Footer>
</template>

<script setup>
import { onMounted, onBeforeMount } from "vue";
// import { RouterLink, RouterView } from "vue-router";
import { usePokemonsStore } from "./stores/pokemon";
import { useServices } from "./services/services.js";
import { useObserverStore } from "./stores/observer";
import { useObserver } from "./composables/observers";

import Header from "./components/Header.vue";
import Footer from "./components/Footer.vue";

const store = usePokemonsStore();
const { requestPokemons, requestDetailsPokemon } = useServices();
const observerStore = useObserverStore(); // TODO valider si doit garder
const observer = useObserver(); // TODO valider si doit garder

onBeforeMount(() => {
  if (store.pokemons && store.pokemons.length) return;
  requestPokemons();
});

// TODO M'assurer que pas en double

/* TODO
  Header
  footer

  page home
  page liste
    Recherche simple
    Recherche avancé / filtre
  page favoris

  card petite
  card details

  loading

  readme

*/
</script>

<style>
.header-class {
  background-color: #222e50;
}
.nav-scrolled {
  background-color: transparent;
  color: white;
}
.nav-scrolled:hover {
  color: #f4d77b;
}
.page-title {
  font-family: "Roboto Serif", serif;
  font-weight: 500;
  font-size: calc(1em + 3vw);
}
</style>

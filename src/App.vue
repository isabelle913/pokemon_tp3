<template>
  <Header></Header>
  <RouterView />
  <Footer></Footer>
</template>

<script setup>
import { onBeforeMount } from "vue";
import { usePokemonsStore } from "./stores/pokemon";
import { useServices } from "./services/services.js";

import Header from "./components/Header.vue";
import Footer from "./components/Footer.vue";

const store = usePokemonsStore();
const { requestPokemons } = useServices();

onBeforeMount(() => {
  if (store.pokemons && store.pokemons.length) return;
  requestPokemons();
});

/* TODO
  menu hamburger

  Changer limit pour api

  loading

  Mettre en ligne
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

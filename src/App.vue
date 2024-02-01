<template>
  <Header></Header>
  <RouterView />
  <Footer></Footer>
</template>

<script setup>
import { onMounted } from "vue";
// import { RouterLink, RouterView } from "vue-router";
import { useObserverStore } from "./stores/observer";
import { useObserver } from "./composables/observers";

import Header from "./components/Header.vue";
import Footer from "./components/Footer.vue";

const observerStore = useObserverStore();
const observer = useObserver();

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

  Favicon
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

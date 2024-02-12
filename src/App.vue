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
  console.log(
    "Bonjour Fabrice, il y a plus de 1200 Pokémons, j'ai chosit dans télécharger seulement 150. L'API des Pokemons fonctionne qu'au premier call il nous envoie seulement le nom et l'url. Pour avoir plus d'info sur ce Pokémon, il faut faire un autre appel avec l'url du Pokémon. Il est possible de changer cette limite via une variable (limit) dans le fichier services. Je fais les appels pour avoir info des Pokémons lors d'une recherche ou pour les afficher dans la page liste Pokémon"
  );
});
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

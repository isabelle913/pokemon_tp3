<template>
  <header>
    <div class="text-center text-3xl">Bonjour{{ pokemons }}</div>
    <div class="wrapper">
      <!-- <nav>
        <RouterLink to="/">Home</RouterLink>
        <RouterLink to="/about">About</RouterLink>
      </nav> -->
    </div>
  </header>

  <RouterView />
</template>

<script setup>
// import { RouterLink, RouterView } from "vue-router";
import { usePokemonsStore } from "./stores/pokemon";

// const pokemonStore = usePokemonsStore();
const { pokemons } = usePokemonsStore();

// console.log("Ici", pokemonStore.pokemons.value);
</script>

<style scoped></style>

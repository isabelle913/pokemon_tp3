<template>
  <div>Liste view</div>

  <div v-for="pokemon in pokemons" :key="pokemon.id">
    {{ pokemon.name }} -> {{ pokemon.id }}
  </div>
</template>

<script setup>
// import { onMounted, ref } from "vue";
import { usePokemonsStore } from "../stores/pokemon";
import { useServices } from "../services/services.js";

const { pokemons } = usePokemonsStore();
const { requestPokemon } = useServices();

function load() {
  requestPokemon("pokemon/?limit=15&offset=0");
}
load();
</script>

<style></style>

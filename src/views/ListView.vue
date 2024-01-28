<template>
  <div>Liste view</div>

  <div>
    <label for="searchPokemon">Inscrire le pokemeon voulue</label>
    <input
      v-model.trim="searchPokemon"
      type="text"
      name="searchPokemon"
      id="searchPokemon"
      @input="onSearchPokemon"
      class="outline" />
  </div>

  <div v-for="pokemon in store.pokemons" :key="pokemon.id">
    {{ pokemon.name }} -> {{ pokemon.id }}
  </div>

  <!-- POurrais être un toggle ou une flèche par en haut ou en bas -->
  <button @click="onSort">Trier => {{ isSortAscending }}</button>
  <br />

  <div>Résultat de la recherche</div>
  <div v-for="pokemon in store.pokemonsFiltered" :key="pokemon.id">
    {{ pokemon.name }} -> {{ pokemon.id }}
  </div>

  <!-- TODO offrir vue sous forme de grille ou tableau   -->
</template>

<script setup>
import { ref } from "vue";
import { usePokemonsStore } from "../stores/pokemon";
import { useServices } from "../services/services.js";

// TODO ?? Pourquoi les valeurs ne se mettent pas à jour
// const { pokemons, pokemonsFiltered, sortPokemons, setFilterValue } = usePokemonsStore();
const store = usePokemonsStore();
const { requestPokemons } = useServices();

let isSortAscending = true;
const searchPokemon = ref();

function onSearchPokemon() {
  store.setFilterValue(searchPokemon.value);
}

function onSort() {
  isSortAscending = !isSortAscending;
  store.sortPokemons(isSortAscending);
}

function load() {
  if (store.pokemons.length) return;
  requestPokemons("pokemon/?limit=15&offset=0");
}
load();
// TODO afficher message si pas de pokemon suite à la recherche
</script>

<style></style>

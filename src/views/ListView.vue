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

  <div v-for="pokemon in displayPokemons" :key="pokemon.id">
    {{ pokemon.name }} -> {{ pokemon.id }}
    <span v-if="pokemon.base_experience">
      => {{ pokemon.base_experience }}</span
    >
  </div>

  <!-- POurrais être un toggle ou une flèche par en haut ou en bas -->
  <button @click="onSort">Trier => {{ isSortAscending }}</button>
  <br />

  <!-- <div>Résultat de la recherche</div>
  <div v-for="pokemon in store.pokemonsFiltered" :key="pokemon.id">
    {{ pokemon.name }} -> {{ pokemon.id }}
  </div> -->
  <div>Current page => {{ currentPage }}</div>
  <br />
  <div>Bonjour</div>
  <div>previousPage: {{ previousPage }}</div>
  <RouterLink
    v-if="previousPage"
    :to="{ name: 'list', query: { page: previousPage } }"
    >Page précédante</RouterLink
  >

  <div>nextPage: {{ nextPage }}</div>
  <RouterLink v-if="nextPage" :to="{ name: 'list', query: { page: nextPage } }"
    >Page suivante</RouterLink
  >

  <!-- TODO offrir vue sous forme de grille ou tableau   -->
</template>

<script setup>
import { computed, ref, watch } from "vue";
import { useRoute } from "vue-router";
import { usePokemonsStore } from "../stores/pokemon";
import { useServices } from "../services/services.js";

// TODO ?? Pourquoi les valeurs ne se mettent pas à jour
// const { pokemons, pokemonsFiltered, sortPokemons, setFilterValue } = usePokemonsStore();
const store = usePokemonsStore();
const { requestPokemons, requestDetailsPokemon } = useServices();
const route = useRoute();

const isSortAscending = ref(true); // TODO mettre bouton pour...
const isGrillDisplay = ref(true); // TODO mettre bouton pour...
const nbPokemonsByPage = ref(10); // TODO mettre contrôle pour... // TODO corriger erreur sur dernière page
const searchPokemon = ref(); // TODO afficher message si pas de pokemon suite à la recherche

const currentPage = computed(() => Number.parseInt(route.query.page || 1));
const previousPage = computed(() => {
  const previousPage = currentPage.value - 1;
  const firstPage = 1;
  return previousPage >= firstPage ? previousPage : false;
});
const nextPage = computed(() => {
  const nextPage = currentPage.value + 1;
  const lastPage = store.pokemonsFiltered.length / nbPokemonsByPage.value;
  return currentPage.value <= lastPage ? nextPage : false;
});
const firstIndex = computed(
  () => (currentPage.value - 1) * nbPokemonsByPage.value
);
const lastIndex = computed(() => currentPage.value * nbPokemonsByPage.value);
const displayPokemons = computed(() =>
  store.pokemonsFiltered.slice(firstIndex.value, lastIndex.value)
);

function onSearchPokemon() {
  // TODO est-ce que je pourrais invoqué la fonction directement du html?
  store.setFilterValue(searchPokemon.value);
}

function onSort() {
  isSortAscending.value = !isSortAscending.value;
  store.sortPokemons(isSortAscending.value);
}

function getDetailsPokemons() {
  const pokemonsNeedDetails = displayPokemons.value.filter(
    (pokemon) => !pokemon.isLoaded
  );

  // TODO vérifier si vide pas d'appel
  if (pokemonsNeedDetails) requestDetailsPokemon(pokemonsNeedDetails);
}

function load() {
  // TODO mettre variables globale pour limit, offset, nbPokemonsByPage, ...
  if (store.pokemons.length) return;
  requestPokemons("pokemon/?limit=15&offset=0");
}
load();

watch(displayPokemons, () => {
  getDetailsPokemons();
});
</script>

<style></style>

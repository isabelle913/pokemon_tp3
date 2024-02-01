<template>
  <div class="container mx-auto py-8 px-4">
    <div class="text-center page-title">Pokemons</div>

    <div class="flex justify-center py-8 gap-4">
      <!-- prettier-ignore -->
      <input v-model.trim="searchPokemon" type="text" name="searchPokemon" placeholder="Quel Pokemon cherchez-vous?" id="searchPokemon" @input="onSearchPokemon"
        class="w-1/2 border-0 rounded-md py-3 px-7 text-gray-900 placeholder:text-gray-400 ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 text-sm sm:text-lg md:text-xl text-center" />
      <!-- prettier-ignore -->
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" @click="onResetSearch" class="w-12 h-12 stroke-gray-400 self-center cursor-pointer">
        <path stroke-linecap="round" stroke-linejoin="round" d="m9.75 9.75 4.5 4.5m0-4.5-4.5 4.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
      </svg>
    </div>

    <!-- prettier-ignore -->
    <div v-if="isGrillDisplay" class="flex flex-col sm:flex-row items-center sm:flex-wrap sm:justify-center gap-8 my-6">
      <CardItem v-for="pokemon in displayPokemons" :key="pokemon.id" :pokemon="pokemon" />
    </div>
    <!-- prettier-ignore -->
    <div v-else class=" flex flex-col gap-8">
      <ListItem v-for="pokemon in displayPokemons" :key="pokemon.id" :pokemon="pokemon" />
    </div>
    <!-- bas du tableau -->
    <div class="grid grid-cols-12 items-center">
      <div class="col-span-10 flex gap-8 justify-center">
        <!-- prettier-ignore -->
        <RouterLink :to="{ name: 'list', query: { page: previousPage } }" :class="{ disabledLink: !previousPage }" class="flex gap-2 text-2xl items-center">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
            <path stroke-linecap="round" stroke-linejoin="round" d="M6.75 15.75 3 12m0 0 3.75-3.75M3 12h18" />
          </svg>
          Page précédante
        </RouterLink>
        <!-- prettier-ignore -->
        <RouterLink :to="{ name: 'list', query: { page: nextPage } }" :class="{ disabledLink: !nextPage }" class="flex gap-2 text-2xl  items-center"> 
          Page suivante
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
            <path stroke-linecap="round" stroke-linejoin="round" d="M17.25 8.25 21 12m0 0-3.75 3.75M21 12H3" />
          </svg>
        </RouterLink>
      </div>
      <div class="col-span-1 flex items-center">
        <!-- prettier-ignore -->
        <input
          class="mr-2 mt-[0.3rem] h-3.5 w-8 appearance-none rounded-[0.4375rem] bg-neutral-300 before:pointer-events-none before:absolute before:h-3.5 before:w-3.5 before:rounded-full before:bg-transparent before:content-[''] after:absolute after:z-[2] after:-mt-[0.1875rem] after:h-5 after:w-5 after:rounded-full after:border-none after:bg-neutral-100 after:shadow-[0_0px_3px_0_rgb(0_0_0_/_7%),_0_2px_2px_0_rgb(0_0_0_/_4%)] after:transition-[background-color_0.2s,transform_0.2s] after:content-[''] checked:bg-primary checked:after:absolute checked:after:z-[2] checked:after:-mt-[3px] checked:after:ml-[1.0625rem] checked:after:h-5 checked:after:w-5 checked:after:rounded-full checked:after:border-none checked:after:bg-primary checked:after:shadow-[0_3px_1px_-2px_rgba(0,0,0,0.2),_0_2px_2px_0_rgba(0,0,0,0.14),_0_1px_5px_0_rgba(0,0,0,0.12)] checked:after:transition-[background-color_0.2s,transform_0.2s] checked:after:content-[''] hover:cursor-pointer focus:outline-none focus:ring-0 focus:before:scale-100 focus:before:opacity-[0.12] focus:before:shadow-[3px_-1px_0px_13px_rgba(0,0,0,0.6)] focus:before:transition-[box-shadow_0.2s,transform_0.2s] focus:after:absolute focus:after:z-[1] focus:after:block focus:after:h-5 focus:after:w-5 focus:after:rounded-full focus:after:content-[''] checked:focus:border-primary checked:focus:bg-indigo-600 checked:focus:before:ml-[1.0625rem] checked:focus:before:scale-100 checked:focus:before:shadow-[3px_-1px_0px_13px_#3b71ca] checked:focus:before:transition-[box-shadow_0.2s,transform_0.2s] dark:bg-neutral-600 dark:after:bg-neutral-400 dark:checked:bg-primary dark:checked:after:bg-primary dark:focus:before:shadow-[3px_-1px_0px_13px_rgba(255,255,255,0.4)] dark:checked:focus:before:shadow-[3px_-1px_0px_13px_#3b71ca"
          type="checkbox" role="switch" id="flexSwitchCheckDefault" v-model="isGrillDisplay" />
        <!-- prettier-ignore -->
        <label class="inline-block pl-[0.15rem] hover:cursor-pointer text-2xl" for="flexSwitchCheckDefault" >Grille</label >
      </div>
      <div class="col-span-1 flex justify-end">
        <!-- prettier-ignore -->
        <svg v-if="!isSortAscending" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"  class="w-16 h-16 stroke-gray-400" @click="onSort">
          <path stroke-linecap="round" stroke-linejoin="round" d="m15 11.25-3-3m0 0-3 3m3-3v7.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
        </svg>
        <!-- prettier-ignore -->
        <svg v-if="isSortAscending" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"  class="w-16 h-16 stroke-gray-400" @click="onSort">
          <path stroke-linecap="round" stroke-linejoin="round" d="m9 12.75 3 3m0 0 3-3m-3 3v-7.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
        </svg>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed, ref, watch } from "vue";
import { useRoute, useRouter } from "vue-router";
import { usePokemonsStore } from "../stores/pokemon";
import { useServices } from "../services/services.js";
import CardItem from "../components/Card-item.vue";
import ListItem from "../components/List-item.vue";

const store = usePokemonsStore();

const { requestPokemons, requestDetailsPokemon } = useServices();
const route = useRoute();
const router = useRouter();

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
  const lastPage = store.pokemonsFiltered?.length / nbPokemonsByPage.value;
  return currentPage.value <= lastPage ? nextPage : false;
});
const firstIndex = computed(
  () => (currentPage.value - 1) * nbPokemonsByPage.value
);
const lastIndex = computed(() => currentPage.value * nbPokemonsByPage.value);
const displayPokemons = computed(() => {
  if (store.pokemonsFiltered)
    return store.pokemonsFiltered.slice(firstIndex.value, lastIndex.value);
  else return [];
});

function onSearchPokemon() {
  // TODO corriger erreur si > 2 lettres ds ma recherche!!!
  store.setFilterValue(searchPokemon.value.toLowerCase());
  router.push({ name: "list", query: { page: 1 } });
}
function onResetSearch() {
  store.setFilterValue("");
  searchPokemon.value = "";
}
function onSort() {
  isSortAscending.value = !isSortAscending.value;
  store.sortPokemons(isSortAscending.value);
  // console.log("isGrillDisplay", isGrillDisplay.value);
}

function getDetailsPokemons() {
  // prettier-ignore
  const pokemonsNeedDetails = displayPokemons.value.filter((pokemon) => !pokemon.isLoaded);

  // TODO vérifier si vide pas d'appel
  if (pokemonsNeedDetails) requestDetailsPokemon(pokemonsNeedDetails);
}

function load() {
  // TODO mettre variables globale pour limit, offset, nbPokemonsByPage, ...
  if (store.pokemons && store.pokemons.length) return;

  requestPokemons("pokemon/?limit=15&offset=0");
}
load();

watch(displayPokemons, () => {
  getDetailsPokemons();
});
</script>

<style scoped>
.disabledLink {
  opacity: 0.5;
  pointer-events: none;
}
</style>

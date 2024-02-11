<template>
  <div class="container mx-auto py-8 px-4">
    <div class="text-center page-title">Vos Pokemons favoris</div>

    <div v-if="hasFavorite">
      <div v-if="isGrillDisplay" class="flex flex-col sm:flex-row items-center sm:flex-wrap sm:justify-center gap-8 my-6">
        <CardItem v-for="pokemon in store.pokemonsFavorite" :key="pokemon.id" :pokemon="pokemon" />
      </div>
      <div v-else class="flex flex-col gap-8">
        <ListItem v-for="pokemon in store.pokemonsFavorite" :key="pokemon.id" :pokemon="pokemon" />
      </div>

      <!-- bas du tableau -->
      <div class="grid grid-cols-12 items-center">
        <div class="col-start-11 col-end-12 flex items-center">
          <!-- prettier-ignore -->
          <input
            class="mr-2 mt-[0.3rem] h-3.5 w-8 appearance-none rounded-[0.4375rem] bg-neutral-300 before:pointer-events-none before:absolute before:h-3.5 before:w-3.5 before:rounded-full before:bg-transparent before:content-[''] after:absolute after:z-[2] after:-mt-[0.1875rem] after:h-5 after:w-5 after:rounded-full after:border-none after:bg-neutral-100 after:shadow-[0_0px_3px_0_rgb(0_0_0_/_7%),_0_2px_2px_0_rgb(0_0_0_/_4%)] after:transition-[background-color_0.2s,transform_0.2s] after:content-[''] checked:bg-primary checked:after:absolute checked:after:z-[2] checked:after:-mt-[3px] checked:after:ml-[1.0625rem] checked:after:h-5 checked:after:w-5 checked:after:rounded-full checked:after:border-none checked:after:bg-primary checked:after:shadow-[0_3px_1px_-2px_rgba(0,0,0,0.2),_0_2px_2px_0_rgba(0,0,0,0.14),_0_1px_5px_0_rgba(0,0,0,0.12)] checked:after:transition-[background-color_0.2s,transform_0.2s] checked:after:content-[''] hover:cursor-pointer focus:outline-none focus:ring-0 focus:before:scale-100 focus:before:opacity-[0.12] focus:before:shadow-[3px_-1px_0px_13px_rgba(0,0,0,0.6)] focus:before:transition-[box-shadow_0.2s,transform_0.2s] focus:after:absolute focus:after:z-[1] focus:after:block focus:after:h-5 focus:after:w-5 focus:after:rounded-full focus:after:content-[''] checked:focus:border-primary checked:focus:bg-indigo-600 checked:focus:before:ml-[1.0625rem] checked:focus:before:scale-100 checked:focus:before:shadow-[3px_-1px_0px_13px_#3b71ca] checked:focus:before:transition-[box-shadow_0.2s,transform_0.2s] dark:bg-neutral-600 dark:after:bg-neutral-400 dark:checked:bg-primary dark:checked:after:bg-primary dark:focus:before:shadow-[3px_-1px_0px_13px_rgba(255,255,255,0.4)] dark:checked:focus:before:shadow-[3px_-1px_0px_13px_#3b71ca"
            type="checkbox" role="switch" id="flexSwitchCheckDefault" v-model="isGrillDisplay" />
          <label class="inline-block pl-[0.15rem] hover:cursor-pointer text-2xl" for="flexSwitchCheckDefault">Grille</label>
        </div>
        <div class="col-start-12 col-end-13 flex justify-end">
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
    <div v-else :style="{ height: screenHeightStyle }">
      <div class="text-3xl text-center page-title mt-14">Vous n'avez pas choisi vos préférés</div>
    </div>
  </div>
</template>

<script setup>
import { computed, ref } from "vue";
import { usePokemonsStore } from "../stores/pokemon";
import CardItem from "../components/Card-item.vue";
import ListItem from "../components/List-item.vue";

const store = usePokemonsStore();

const isSortAscending = ref(true);
const isGrillDisplay = ref(true);
const screenHeight = ref(window.innerHeight);

const hasFavorite = computed(() => (store.pokemonsFavorite.length > 0 ? true : false));

const screenHeightStyle = computed(() => {
  return screenHeight.value - 88 - 104 - 120 + "px";
});

function onSort() {
  isSortAscending.value = !isSortAscending.value;
  store.sortPokemons(isSortAscending.value);
}
</script>

<style scoped></style>

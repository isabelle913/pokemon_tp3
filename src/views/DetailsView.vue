<template>
  <div class="container mx-auto py-8 px-4">
    <div v-if="isValidID">
      <div class="text-center page-title mb-8">{{ pokemon.displayName }}</div>
      <div class="grid grid-cols-12">
        <div class="col-span-12 md:col-span-6 max-h-[300px] md:max-h-[500px]">
          <img :src="pokemon.img" alt="" />
        </div>
        <div
          class="col-span-12 md:col-span-6 pt-6 md:pt-0 md:pl-6 md:max-w-[500px]">
          <div
            class="border-2 border-indigo-600 rounded p-6 grid grid-cols-12 gap-y-2">
            <div class="col-span-6 text-2xl pb-4">Caractéristiques</div>
            <div class="col-span-6 row-span-2 text-2xl flex justify-end">
              <!-- prettier-ignore -->
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" @click="onFavorite()" class="w-20 h-20 cursor-pointer"
                  :class="pokemon.isFavorite ? 'fill-red-500 stroke-red-500' : 'stroke-black' ">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z" />
                </svg>
            </div>
            <div class="col-span-6 flex flex-col">
              <p class="text-xl">Expérience:</p>
              <p>{{ pokemon.experience }}</p>
            </div>
            <div class="col-span-6 flex flex-col">
              <p class="text-xl">Taille:</p>
              <p>{{ pokemon.height }} m</p>
            </div>
            <div class="col-span-6">
              <p class="text-xl">Poids:</p>
              <p>{{ pokemon.weight }} kg</p>
            </div>
            <div class="col-span-12 my-4">
              <p class="text-xl">Type:</p>
              <pok-chips
                :types="pokemon.types"
                class-align="justify-start"></pok-chips>
            </div>
            <div class="col-span-12 my-4">
              <p class="text-xl">Compétences:</p>
              <pok-chips
                :abilities="pokemon.abilities"
                class-align="justify-start"></pok-chips>
            </div>
          </div>
        </div>
      </div>
      <div class="border-2 border-indigo-600 rounded p-6 mt-8">
        <pok-stats :stats="pokemon.stats"></pok-stats>
      </div>
    </div>
    <div v-else :style="{ height: screenHeightStyle }">
      <div class="text-3xl text-center page-title mt-14">
        Ce Pokémon n'est pas né encore
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed, ref, reactive, watch } from "vue";
import { useRoute, useRouter } from "vue-router";
import { usePokemonsStore } from "../stores/pokemon";
import { useServices } from "../services/services.js";
import pokChips from "../components/pok-chips.vue";
import pokStats from "@/components/pok-stats.vue";

const store = usePokemonsStore();
const route = useRoute();
const router = useRouter();
const { requestPokemons, requestDetailsPokemon } = useServices();

const id = ref();
const isValidID = ref(true);
let pokemon = reactive({});

const screenHeight = ref(window.innerHeight);

function onFavorite(id) {
  pokemon.isFavorite = !pokemon.isFavorite;
}
const screenHeightStyle = computed(() => {
  // TODO corriger si changement header 88 footer 104
  return screenHeight.value - 88 - 104 - 120 + "px";
});

function load() {
  id.value = route.params.id;

  if (!id.value) router.push({ name: home });
  if (!store.pokemon) requestPokemons();

  pokemon = store.pokemons
    .filter((pokemon) => pokemon.id === Number(id.value))
    .at(0);

  if (!pokemon) {
    isValidID.value = false;
    return;
  }
  // console.log("Mon pokemon", pokemon);

  if (!pokemon.isLoaded) requestDetailsPokemon([pokemon]);
}
load();
</script>

<style scoped>
img {
  width: 100%;
  height: 100%;
}
</style>

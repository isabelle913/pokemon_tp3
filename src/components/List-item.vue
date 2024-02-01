<template>
  <div
    class="grid grid-cols-12 h-32 w-full p-2 justify-start cursor-pointer sm:shadow"
    @click="goToDetails(pokemon.id)">
    <div class="col-span-2 h-24">
      <img class="" :src="pokemon.img" />
    </div>

    <div
      class="col-span-4 text-3xl font-medium flex justify-center items-center">
      <span class="block">{{ pokemon.displayName }}</span>
    </div>

    <div class="col-span-4 flex justify-center items-center gap-2">
      <!-- prettier-ignore -->
      <div v-for="(type, index) in pokemon.types" :key="index" class="rounded-lg w-[70px] py-1 text-center" :style="{ backgroundColor: `${type.color}` }" >
        {{ type.displayName }}
      </div>
    </div>

    <div class="col-span-2 group flex justify-center items-center">
      <!-- prettier-ignore -->
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" @click.stop="onFavorite(pokemon.id)" class="w-16 h-16 cursor-pointer"
          :class="pokemon.isFavorite ? 'fill-red-500 stroke-red-500' : 'stroke-black' ">
          <path stroke-linecap="round" stroke-linejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z" />
        </svg>
    </div>
  </div>
</template>

<script setup>
import { usePokemonsStore } from "../stores/pokemon";

const store = usePokemonsStore();

const props = defineProps({
  pokemon: {
    type: Object,
    required: true,
  },
});

function onFavorite(id) {
  const pokemon = store.pokemons.find((pokemon) => pokemon.id === id);
  pokemon.isFavorite = !pokemon.isFavorite;
}

function goToDetails(id) {
  // TODO mettre bouton vers pages détails
  console.log("goToDetails", id);
}
</script>

<style scoped>
img {
  width: 100%;
  height: 100%;
}
</style>

<template>
  <div
    class="flex flex-col items-center basis-60 grow rounded-lg sm:shadow p-2 cursor-pointer"
    :class="showTypes ? 'h-[380px]' : 'h-[300px]'"
    @click="goToDetails(pokemon.id)">
    <div class="" :class="showTypes ? 'h-3/4' : 'h-5/6'">
      <img class="" :src="pokemon.img" :alt="pokemon.displayName" />
    </div>
    <div class="pt-2">
      <div class="grid grid-cols-12">
        <div class="text-2xl font-medium text-center pl-2" :class="showFavorite ? 'col-span-10' : 'col-span-12'">
          {{ pokemon.displayName }}
        </div>
        <div v-if="showFavorite" class="col-span-2 group flex">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            @click.stop="onFavorite(pokemon.id)"
            class="w-10 h-10 cursor-pointer"
            :class="pokemon.isFavorite ? 'fill-red-500 stroke-red-500' : 'stroke-black'">
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z" />
          </svg>
        </div>
      </div>

      <pok-chips v-if="showTypes" :types="pokemon.types"></pok-chips>
    </div>
  </div>
</template>

<script setup>
import { usePokemonsStore } from "../stores/pokemon";
import { useRouter } from "vue-router";
import pokChips from "./pok-chips.vue";

const store = usePokemonsStore();
const router = useRouter();

const props = defineProps({
  pokemon: {
    type: Object,
    required: true,
  },
  showFavorite: {
    type: Boolean,
    default: true,
  },
  showTypes: {
    type: Boolean,
    default: true,
  },
});
function onFavorite(id) {
  const pokemon = store.pokemons.find((pokemon) => pokemon.id === id);
  pokemon.isFavorite = !pokemon.isFavorite;
}

function goToDetails(id) {
  router.push({ name: "pokemon", params: { id: id } });
}
</script>

<style scoped>
img {
  width: 100%;
  height: 100%;
}
</style>

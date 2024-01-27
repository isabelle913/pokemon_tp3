import { ref } from "vue";
import { defineStore } from "pinia";

export const usePokemonsStore = defineStore("pokemonStore", () => {
  const pokemons = ref(["Coucou"]);
  const pokemonFavorites = ref([]);

  return { pokemons, pokemonFavorites };
});

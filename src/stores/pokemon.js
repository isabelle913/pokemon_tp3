import { ref } from "vue";
import { defineStore } from "pinia";

export const usePokemonsStore = defineStore("pokemonStore", () => {
  const pokemons = ref([]);
  const pokemonFavorites = ref([]);

  function getUnikID() {
    return Date.now() + Math.trunc(Math.random() * 10000);
  }

  function addPokemon(pokemon) {
    this.pokemons.push({
      id: getUnikID(),
      name: pokemon.name,
      url: pokemon.url,
      isLoader: false,
    });
  }

  function sortPokemon() {
    console.log("sortPokemon");
  }

  return { pokemons, pokemonFavorites, addPokemon, sortPokemon };
});

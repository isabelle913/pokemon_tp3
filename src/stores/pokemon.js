import { computed, ref } from "vue";
import { defineStore } from "pinia";

export const usePokemonsStore = defineStore("pokemonStore", () => {
  // TODO ?? this. ou .value
  // TODO ?? comme les notes ou comme https://pinia.vuejs.org/core-concepts/ avec state, getters, actions
  const pokemons = ref([]);
  const pokemonsFavorite = ref([]);
  let filterValue = ref("");

  const pokemonsFiltered = computed(() => {
    if (!filterValue.value) return pokemons.value;
    else
      return pokemons.value.filter((pokemon) =>
        pokemon.name.includes(filterValue.value)
      );
  });

  function getID(pokemon) {
    return Number(pokemon.url.split("/")[6]);
  }
  // TODO améliorer pour utiliser Class
  function addPokemon(pokemon) {
    pokemons.value.push({
      id: getID(pokemon),
      name: pokemon.name,
      url: pokemon.url,
      isLoader: false,
    });
  }
  // TODO déterminer les propriétés que je veux
  function addDetailsPokemon(pokemonWithDetails) {
    pokemons.value.map((pokemon) => {
      if (pokemon.id === pokemonWithDetails.id) {
        pokemon.base_experience = pokemonWithDetails.base_experience;
      }
    });
  }

  function sortPokemons(ascendant) {
    if (ascendant) {
      pokemons.value.sort((a, b) => {
        if (a.name < b.name) return -1;
        if (a.name > b.name) return 1;
        return 0;
      });
    } else {
      pokemons.value.sort((a, b) => {
        if (a.name < b.name) return 1;
        if (a.name > b.name) return -1;
        return 0;
      });
    }
  }

  function setFilterValue(searchValue) {
    filterValue.value = searchValue;
    console.log("pokemonsFiltered.value", pokemonsFiltered.value);
  }

  return {
    pokemons,
    pokemonsFavorite,
    pokemonsFiltered,

    addPokemon,
    sortPokemons,
    setFilterValue,
    addDetailsPokemon,
  };
});

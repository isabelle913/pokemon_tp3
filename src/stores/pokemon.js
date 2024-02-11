import { computed, ref } from "vue";
import { defineStore } from "pinia";
import { useTypesStyle } from "../composables/types-style";
import { useGetStats } from "../composables/get-stats";

export const usePokemonsStore = defineStore("pokemonStore", () => {
  const typeStyle = useTypesStyle();
  const composableGetStats = useGetStats();

  const pokemons = ref([]);
  const pokemonsFavorite = ref([]); // TODO est-ce que j'utilise seulement la propriété ou cet array? Voir demande du projet
  let filterValue = ref(""); // TODO si doit vraiment être let!

  // TODO Compléter le first et last
  // TODO s'assurer de retourner number
  const firstPokemon = computed(() => {
    return 1;
  });
  const lastPokemon = computed(() => {
    return 15;
  });

  const pokemonsFiltered = computed(() => {
    if (!filterValue.value) return pokemons.value;
    else return pokemons.value.filter((pokemon) => pokemon.name.includes(filterValue.value));
  });

  function addPokemon(pokemon) {
    const displayName = pokemon.name.replace(pokemon.name.charAt(0), pokemon.name.charAt(0).toUpperCase());

    pokemons.value.push({
      id: Number(pokemon.url.split("/")[6]),
      name: pokemon.name,
      displayName,
      url: pokemon.url,
      isLoaded: false,
      isFavorite: false,
    });
  }

  function addDetailsPokemon(pokemonWithDetails) {
    // console.log("pokemonWithDetails", pokemonWithDetails);
    // console.log(
    //   "pokemonWithDetails",
    //   composableGetStats.getStats(pokemonWithDetails.stats)
    // );

    // TODO faire une class
    pokemons.value.map((pokemon) => {
      //prettier-ignore
      if (pokemon.id === pokemonWithDetails.id) {
        pokemon.isLoaded = true;
        pokemon.experience = pokemonWithDetails.base_experience;
        pokemon.img = pokemonWithDetails.sprites.other.dream_world.front_default;
        pokemon.types = pokemonWithDetails.types.map((type) => typeStyle.getTypeStyle(type.type.name));
        pokemon.height = pokemonWithDetails.height;
        pokemon.weight = pokemonWithDetails.weight;
        pokemon.abilities = pokemonWithDetails.abilities.map((ability) => ability.ability.name);
        pokemon.stats = composableGetStats.getStats(pokemonWithDetails.stats);
      }
      // }
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
    firstPokemon,
    lastPokemon,

    addPokemon,
    sortPokemons,
    setFilterValue,
    addDetailsPokemon,
  };
});

import { computed, ref } from "vue";
import { defineStore } from "pinia";
import { useTypesStyle } from "../composables/types-style";

export const usePokemonsStore = defineStore("pokemonStore", () => {
  const typeStyle = useTypesStyle();
  const pokemons = ref([]);
  const pokemonsFavorite = ref([]); // TODO est-ce que j'utilise seulement la propriété ou cet array? Voir demande du projet
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

  function addPokemon(pokemon) {
    const displayName = pokemon.name.replace(
      pokemon.name.charAt(0),
      pokemon.name.charAt(0).toUpperCase()
    );

    pokemons.value.push({
      id: getID(pokemon),
      name: pokemon.name,
      displayName,
      url: pokemon.url,
      isLoader: false,
      isFavorite: false,
    });
  }

  function addDetailsPokemon(pokemonWithDetails) {
    // console.log(typeStyle.getTypeStyle());
    // console.log("pokemonWithDetails", pokemonWithDetails.types);

    pokemons.value.map((pokemon) => {
      if (pokemon.id === pokemonWithDetails.id) {
        pokemon.base_experience = pokemonWithDetails.base_experience;
        pokemon.img =
          pokemonWithDetails.sprites.other.dream_world.front_default;
        pokemon.types = pokemonWithDetails.types.map((type) =>
          typeStyle.getTypeStyle(type.type.name)
        );
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

    addPokemon,
    sortPokemons,
    setFilterValue,
    addDetailsPokemon,
  };
});

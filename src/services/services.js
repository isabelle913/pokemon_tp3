import axios from "axios";
import { usePokemonsStore } from "../stores/pokemon";

export function useServices() {
  const { addPokemon, sortPokemons } = usePokemonsStore();

  const api = axios.create({ baseURL: "https://pokeapi.co/api/v2/" });

  function requestPokemons(url) {
    console.log("requestPokemon");

    api
      .get(url)
      .then((resp) => {
        console.log("resp", resp.data.results);
        resp.data.results.map((pokemon) => {
          addPokemon(pokemon);
        });
        sortPokemons(true);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  return { requestPokemons };
}
//https://pokeapi.co/api/v2/
// pokemon/?limit=1500&offset=0"

//https://pokeapi.co/api/v2/pokemon/?limit=15&offset=0

// const url = "pokemon/?limit=1500&offset=0";

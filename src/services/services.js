import axios from "axios";
import { usePokemonsStore } from "../stores/pokemon";

export function useServices() {
  const { pokemons, addPokemon, sortPokemons, addDetailsPokemon } = usePokemonsStore();

  const api = axios.create({ baseURL: "https://pokeapi.co/api/v2/" });
  // TODO mettre variable pour limit et +/- offset
  const url_base = "pokemon/?limit=15&offset=0";

  function requestPokemons(url = url_base) {
    console.log("requestPokemons", pokemons);
    if (!pokemons) console.log("!!!!!!!!"); // TODO remplacer par un return
    api
      .get(url)
      .then((resp) => {
        console.log("resp", resp.data.results);
        if (!resp.data.results) throw new Error("Aucun pokemon trouvé");
        resp.data.results.map((pokemon) => {
          addPokemon(pokemon);
        });
        sortPokemons(true);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  // TODO gestion des erreurs +/- variable dans le store genre isError

  async function requestDetailsPokemon(pokemonsNeedDetails) {
    console.log("requestDetailsPokemon 0", pokemonsNeedDetails);
    // console.log(pokemonsNeedDetails.length);

    if (!pokemonsNeedDetails.length) return;
    console.log("requestDetailsPokemon 1", pokemonsNeedDetails);

    let min = 0;
    let max = pokemonsNeedDetails.length <= 3 ? pokemonsNeedDetails.length - 1 : 3;
    const length = pokemonsNeedDetails.length - 1;

    for (let y = 0; y <= length; y = y + 4) {
      const listID = [];
      for (let i = min; i <= max; i++) {
        listID.push(pokemonsNeedDetails[i].id);
      }
      min = min + 4;
      max = max + 4 >= length ? length : max + 4;

      const datas = await Promise.all(listID.map((id) => api.get(`pokemon/${id}/`)));
      // TODO  si pas de data ?
      // console.log(datas);
      datas.map((pokemonWithDetails) => {
        if (pokemonWithDetails.status === 200) addDetailsPokemon(pokemonWithDetails.data);
      });
    }
  }

  return { requestPokemons, requestDetailsPokemon };
}
//https://pokeapi.co/api/v2/
// pokemon/?limit=1500&offset=0"

//https://pokeapi.co/api/v2/pokemon/?limit=15&offset=0

// const url = "pokemon/?limit=1500&offset=0";

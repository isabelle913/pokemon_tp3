import axios from "axios";

export default function useServices() {
  const api = axios.create({});

  return { api };
}
//https://pokeapi.co/api/v2/
// pokemon/?limit=1500&offset=0"

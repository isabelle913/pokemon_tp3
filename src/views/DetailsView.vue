<template>
  <div>Details</div>
  <div>Pokemon: {{ pokemon }}</div>
</template>

<script setup>
import { computed, onMounted } from "vue";
import { usePokemonsStore } from "../stores/pokemon";
import { useRoute, useRouter } from "vue-router";

const store = usePokemonsStore();
const route = useRoute();
const router = useRouter();

const id = route.params.id;

// TODO transférer le load des pokemon dans app
const pokemon = computed(() => {
  let kleenex = store.pokemons.map((pokemon) => {
    console.log("pokemon", pokemon);

    pokemon.value.id === id;
  });
  return kleenex;
});

function onFavorite(id) {
  const pokemon = store.pokemons.find((pokemon) => pokemon.id === id);
  pokemon.isFavorite = !pokemon.isFavorite;
}

// function goToDetails(id) {
//   router.push({ name: "pokemon", params: { id: id } });
// }

// function loadPokemon() {
//   // const id = route.params.id;
//   console.log("id", id);
//   if (!id) router.push({ name: home });
// }

onMounted(() => {
  console.log("id", id);
  if (!id) router.push({ name: home });
});
</script>

<style scoped>
img {
  width: 100%;
  height: 100%;
}
</style>

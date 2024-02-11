<template>
  <div class="header-class sticky top-0">
    <div class="container mx-auto">
      <div class="flex justify-between p-2 text-white">
        <div class="cursor-pointer" @click="goToHome">
          <img class="w-[100px]" src="../assets/img/pikachu-500.png" />
        </div>
        <div class="flex gap-5 self-center text-xl md:text-2xl font-medium mr-8">
          <RouterLink :to="{ name: 'home' }" class="nav-link focus:outline-none">Accueil</RouterLink>
          <RouterLink :to="{ name: 'list' }" class="nav-link focus:outline-none">Liste des Pokemons</RouterLink>
          <RouterLink :to="{ name: 'favorites' }" class="nav-link focus:outline-none">Vos favoris</RouterLink>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
// TODO hamburger sur petits écrans ou diminuer encore taille du texte
// TODO ?? POurquoi le lien home nous ramène dans le bas de la page!

import { onMounted } from "vue";
import { useObserverStore } from "../stores/observer";
import { RouterLink, useRouter } from "vue-router";

const observerStore = useObserverStore();
const router = useRouter();

function goToHome() {
  router.push({ name: "home" });
}

onMounted(() => {
  observerStore.setHeaderClass(document.querySelector(".header-class"));
});
</script>

<style scoped>
.nav-link:hover,
.nav-link:focus {
  color: #f4d77b;
}
.router-link-exact-active {
  color: #f4d77b;
  text-decoration: underline #f4d77b;
  text-underline-offset: 10px;
}
</style>

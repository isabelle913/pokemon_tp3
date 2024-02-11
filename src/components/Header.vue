<template>
  <div class="header-class sticky top-0">
    <div class="container mx-auto">
      <div class="flex justify-between p-2 text-white">
        <div class="cursor-pointer" @click="goToHome">
          <img class="w-[100px]" src="../assets/img/pikachu-500.png" />
        </div>
        <div class="flex gap-5 self-center text-xl md:text-2xl font-medium mr-8">
          <RouterLink :to="{ name: 'home' }" class="nav-link">Accueil</RouterLink>
          <RouterLink :to="{ name: 'list' }" class="nav-link">Liste des Pokemons</RouterLink>
          <RouterLink :to="{ name: 'favorites' }" class="nav-link">Vos favoris</RouterLink>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
// TODO mettre fixed dans le haut
// TODO hamburger sur petits écrans ou diminuer encore taille du texte

import { onMounted, ref } from "vue";
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
.nav-link:hover {
  color: #f4d77b;
}
.router-link-exact-active {
  color: #f4d77b;
  text-decoration: underline #f4d77b;
  text-underline-offset: 10px;
}
</style>

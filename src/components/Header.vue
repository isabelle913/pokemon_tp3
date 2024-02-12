<template>
  <div class="header-class sticky top-0" :class="isOpenMenu ? 'h-[180px]' : ''">
    <div class="container mx-auto">
      <div class="flex justify-between p-2 text-white">
        <div class="cursor-pointer" @click="goToHome">
          <img class="w-[100px]" src="../assets/img/pikachu-500.png" />
        </div>
        <div class="nav-links flex gap-5 self-center text-xl md:text-2xl font-medium mr-8" :class="isOpenMenu ? 'active' : ''">
          <RouterLink :to="{ name: 'home' }" class="nav-link focus:outline-none">Accueil</RouterLink>
          <RouterLink :to="{ name: 'list' }" class="nav-link focus:outline-none">Liste des Pokemons</RouterLink>
          <RouterLink :to="{ name: 'favorites' }" class="nav-link focus:outline-none">Vos favoris</RouterLink>
        </div>
        <div class="sm:hidden flex flex-col justify-center" @click="onOpenMenu">
          <div v-if="!isOpenMenu" class="hamburger text-4xl cursor-pointer">&#9776;</div>
          <div v-else class="hamburger text-4xl cursor-pointer">&#9747;</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
// TODO hamburger sur petits écrans ou diminuer encore taille du texte
// TODO ?? POurquoi le lien home nous ramène dans le bas de la page!

import { onMounted, ref } from "vue";
import { useObserverStore } from "../stores/observer";
import { RouterLink, useRouter } from "vue-router";

const observerStore = useObserverStore();
const router = useRouter();
const isOpenMenu = ref(false);

function goToHome() {
  router.push({ name: "home" });
}
function onOpenMenu() {
  isOpenMenu.value = !isOpenMenu.value;
  console.log("miip");
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
.hamburger:hover,
.hamburger:focus {
  color: #f4d77b;
}

@media (max-width: 600px) {
  .nav-links {
    position: fixed;
    left: -100%;
    top: 2%;
    flex-direction: column;
    /* background bleu?? */
    width: 50%;
    margin: 0 auto;
    text-align: center;
    transition: 0.25s;
  }
  .active {
    left: 30%;
  }
  /* .header-class {
    height: 180px;
  } */
}
</style>

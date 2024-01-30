<template>
  <div class="header-class sticky top-0">
    <div class="container mx-auto">
      <div class="flex justify-between p-8 text-white">
        <div>Logo</div>
        <div class="flex gap-3">
          <div>Accueil</div>
          <div>Liste</div>
          <div>Favoris</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
// TODO mettre fixed dans le haut
// TODO hamburger sur petits écrans

import { onMounted, ref } from "vue";
import { useObserverStore } from "../stores/observer";

const observerStore = useObserverStore();

onMounted(() => {
  observerStore.setHeaderClass(document.querySelector(".header-class"));
});
</script>

<style scoped></style>

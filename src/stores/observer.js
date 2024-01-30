import { ref } from "vue";
import { defineStore } from "pinia";

export const useObserverStore = defineStore("pokemonStore", () => {
  const headerClass = ref(null);
  const homeClass = ref(null);

  function setHeaderClass(newValue) {
    headerClass.value = newValue;
  }
  function setHomeClass(newValue) {
    homeClass.value = newValue;
  }

  return {
    headerClass,
    homeClass,

    setHeaderClass,
    setHomeClass,
  };
});

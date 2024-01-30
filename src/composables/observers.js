// import { ref } from "vue";
import { useObserverStore } from "@/stores/observer";

export function useObserver() {
  const observerStore = useObserverStore();

  const options = {
    rootMargin: "-90px 0px 0px 0px",
  };

  function onSectionObserver(entries) {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) {
        observerStore.headerClass.classList.add("nav-scrolled");
      } else {
        observerStore.headerClass.classList.remove("nav-scrolled");
      }
    });
  }

  const headerObserver = new IntersectionObserver(onSectionObserver, options);

  function onObserve() {
    headerObserver.observe(observerStore.homeClass);
  }

  function onTest() {
    console.log("Composables homeClass", observerStore.homeClass);
    console.log("Composables headerClass", observerStore.headerClass);
  }

  return {
    onTest,
    onObserve,
  };
}

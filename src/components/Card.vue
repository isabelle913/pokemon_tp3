<template>
  <div class="bg-yellow-200 w-[250px]">{{ pokemon.name }}</div>
</template>

<script setup>
const props = defineProps({
  pokemon: {
    type: Object,
    required: true,
  },
});

console.log("props", props);
</script>

<style></style>

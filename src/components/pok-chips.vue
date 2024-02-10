<template>
  <div class="flex gap-2 pt-2" :class="classAlign">
    <div v-if="types" v-for="(type, index) in types" :key="index" class="rounded-lg w-[70px] py-1 text-center" :style="{ backgroundColor: `${type.color}` }">
      {{ type.displayName }}
    </div>

    <div v-if="abilities" v-for="(ability, index) in abilities" :key="index" class="rounded-lg px-3 py-1 text-center" :style="getColor()">
      {{ ability }}
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  types: {
    type: Array,
    required: false,
  },
  abilities: {
    type: Array,
    required: false,
  },
  classAlign: {
    type: String,
    default: "justify-center",
  },
});

const colors = ["#9EB7B8", "#D56723", "#3DC7EF", "#B97FC9", "#F7DE3F", "#A38C21", "#729F3F", "#7B62A3"];

function getRandomNumber(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

function getColor() {
  const index = getRandomNumber(0, 7);
  return { backgroundColor: colors[index] };
}
</script>

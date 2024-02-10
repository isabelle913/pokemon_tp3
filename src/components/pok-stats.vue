<template>
  <div class="text-2xl pb-4 text-center">Statistiques</div>
  <div class="grid grid-cols-12 gap-x-2">
    <div v-for="(value, property) in stats" :key="property" class="col-span-2 flex flex-col items-center">
      <div class="w-full flex flex-col items-center gap-y-1">
        <div v-for="(color, index) in getRangeStat(value)" :key="index" class="w-5/6 md:w-3/4 lg:w-3/5 h-2 rounded" :style="{ backgroundColor: color }"></div>
      </div>
      <div class="text-xl text-center">{{ getDisplayName(property) }}</div>
    </div>
  </div>
</template>
<script setup>
const props = defineProps({
  stats: {
    type: Object,
  },
});

function getRangeStat(value) {
  const rangeSlots = [];
  const numberSlotComplete = Math.trunc(value / 20);
  for (let i = 0; i < 20; i++) {
    rangeSlots.push(i < numberSlotComplete ? "#75DDDD" : "#F4D77B");
  }
  return rangeSlots.reverse();
}

function getDisplayName(property) {
  switch (property) {
    case "stat_hp":
      return "HP";
    case "stat_attack":
      return "Attaque";
    case "stat_defense":
      return "Défense";
    case "stat_special_attack":
      return "Attaque spéciale";
    case "stat_special_defense":
      return "Défense spéciale";
    case "stat_speed":
      return "Vitesse";
    default:
      return "Force";
  }
}
</script>

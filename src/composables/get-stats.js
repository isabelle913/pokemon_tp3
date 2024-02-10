export function useGetStats() {
  function getStats(stats) {
    let hp = 0;
    let attack = 0;
    let defense = 0;
    let special_attack = 0;
    let special_defense = 0;
    let speed = 0;

    stats.forEach((stat) => {
      switch (stat.stat.name) {
        case "hp":
          hp = stat.base_stat;
          break;
        case "attack":
          attack = stat.base_stat;
          break;
        case "defense":
          defense = stat.base_stat;
          break;
        case "special-attack":
          special_attack = stat.base_stat;
          break;
        case "special-defense":
          special_defense = stat.base_stat;
          break;
        case "speed":
          speed = stat.base_stat;
          break;
        default:
      }
    });

    return {
      stat_hp: hp,
      stat_attack: attack,
      stat_defense: defense,
      stat_special_attack: special_attack,
      stat_special_defense: special_defense,
      stat_speed: speed,
    };
  }

  return { getStats };
}

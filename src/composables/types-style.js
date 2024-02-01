export function useTypesStyle() {
  function getTypeStyle(type) {
    switch (type) {
      case "normal":
        return {
          name: type,
          displayName: "Normal",
          color: "#9EB7B8",
        };

      case "fighting":
        return {
          name: type,
          displayName: "Combat",
          color: "#D56723",
        };

      case "flying":
        return {
          name: type,
          displayName: "Vol",
          color: "#3DC7EF",
        };

      case "poison":
        return {
          name: type,
          displayName: "Poison",
          color: "#B97FC9",
        };

      case "ground":
        return {
          name: type,
          displayName: "Sol",
          color: "#F7DE3F",
        };

      case "rock":
        return {
          name: type,
          displayName: "Roche",
          color: "#A38C21",
        };

      case "bug":
        return {
          name: type,
          displayName: "Insecte",
          color: "#729F3F",
        };

      case "ghost":
        return {
          name: type,
          displayName: "Spectre",
          color: "#7B62A3",
        };

      case "steel":
        return {
          name: type,
          displayName: "Acier",
          color: "#9EB7B8",
        };

      case "fire":
        return {
          name: type,
          displayName: "Feu",
          color: "#FC7C23",
        };

      case "water":
        return {
          name: type,
          displayName: "Eau",
          color: "#4592C4",
        };

      case "grass":
        return {
          name: type,
          displayName: "Plante",
          color: "#9BCC50",
        };

      case "electric":
        return {
          name: type,
          displayName: "Électrik",
          color: "#EED535",
        };

      case "psychic":
        return {
          name: type,
          displayName: "Psy",
          color: "#F366B9",
        };

      case "ice":
        return {
          name: type,
          displayName: "Glace",
          color: "#51C4E7",
        };

      case "dragon":
        return {
          name: type,
          displayName: "Dragon",
          color: "#616161",
        };

      case "dark":
        return {
          name: type,
          displayName: "Ténèbres",
          color: "#707070",
        };

      case "fairy":
        return {
          name: type,
          displayName: "Fée",
          color: "#FDB9E9",
        };

      case "unknown":
        return {
          name: type,
          displayName: "Surprise",
          color: "#7B62A3",
        };

      case "shadow":
        return {
          name: type,
          displayName: "Ombre",
          color: "#707070",
        };

      default:
        return {
          name: type,
          displayName: "Inconnu",
          color: "#7B62A3",
        };
    }
  }

  return { getTypeStyle };
}

<template>
  <div class="container mx-auto bg-white rounded p-6">
    <div class="text-center pok-new-title mb-6">PokémonsNews</div>
    <div class="text-2xl md:text-3xl font-medium mb-6">Pour être au courant de tout ce qui se passe dans le monde des Pokémons!</div>

    <form v-if="!isFormCompleted" class="flex flex-col justify center gap-y-6" @submit.prevent="onSubmit">
      <div class="relative h-11 w-full min-w-[200px]">
        <!-- prettier-ignore -->
        <input
            class="peer h-full w-full rounded-md border border-blue-gray-200 bg-transparent px-3 py-3 font-sans text-sm font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 focus:border-2 focus:border-pink-500 focus:border-t-transparent focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50"
            placeHolder=" " 
            type="text" 
            name="name" 
            id="name"
            v-model.trim="name" />
        <label
          class="before:content[' '] after:content[' '] pointer-events-none absolute left-0 -top-1.5 flex h-full w-full select-none text-[11px] font-normal leading-tight text-blue-gray-400 transition-all before:pointer-events-none before:mt-[6.5px] before:mr-1 before:box-border before:block before:h-1.5 before:w-2.5 before:rounded-tl-md before:border-t before:border-l before:border-blue-gray-200 before:transition-all after:pointer-events-none after:mt-[6.5px] after:ml-1 after:box-border after:block after:h-1.5 after:w-2.5 after:flex-grow after:rounded-tr-md after:border-t after:border-r after:border-blue-gray-200 after:transition-all peer-placeholder-shown:text-sm peer-placeholder-shown:leading-[4.1] peer-placeholder-shown:text-blue-gray-500 peer-placeholder-shown:before:border-transparent peer-placeholder-shown:after:border-transparent peer-focus:text-[11px] peer-focus:leading-tight peer-focus:text-pink-500 peer-focus:before:border-t-2 peer-focus:before:border-l-2 peer-focus:before:!border-pink-500 peer-focus:after:border-t-2 peer-focus:after:border-r-2 peer-focus:after:!border-pink-500 peer-disabled:text-transparent peer-disabled:before:border-transparent peer-disabled:after:border-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500"
          for="name">
          Votre nom
        </label>
        <span v-if="!isNameValid" class="flex items-center font-medium tracking-wide text-red-500 text-xs mt-1 ml-1 pl-2">Veuillez inscrire votre nom.</span>
      </div>
      <div class="relative h-11 w-full min-w-[200px]">
        <!-- prettier-ignore -->
        <input
            class="peer h-full w-full rounded-md border border-blue-gray-200 bg-transparent px-3 py-3 font-sans text-sm font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 focus:border-2 focus:border-pink-500 focus:border-t-transparent focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50"
            placeHolder=" " 
            type="text" 
            name="email" 
            id="email"
            v-model.trim="email" />
        <label
          class="before:content[' '] after:content[' '] pointer-events-none absolute left-0 -top-1.5 flex h-full w-full select-none text-[11px] font-normal leading-tight text-blue-gray-400 transition-all before:pointer-events-none before:mt-[6.5px] before:mr-1 before:box-border before:block before:h-1.5 before:w-2.5 before:rounded-tl-md before:border-t before:border-l before:border-blue-gray-200 before:transition-all after:pointer-events-none after:mt-[6.5px] after:ml-1 after:box-border after:block after:h-1.5 after:w-2.5 after:flex-grow after:rounded-tr-md after:border-t after:border-r after:border-blue-gray-200 after:transition-all peer-placeholder-shown:text-sm peer-placeholder-shown:leading-[4.1] peer-placeholder-shown:text-blue-gray-500 peer-placeholder-shown:before:border-transparent peer-placeholder-shown:after:border-transparent peer-focus:text-[11px] peer-focus:leading-tight peer-focus:text-pink-500 peer-focus:before:border-t-2 peer-focus:before:border-l-2 peer-focus:before:!border-pink-500 peer-focus:after:border-t-2 peer-focus:after:border-r-2 peer-focus:after:!border-pink-500 peer-disabled:text-transparent peer-disabled:before:border-transparent peer-disabled:after:border-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500"
          for="email">
          Inscrire votre courriel
        </label>
        <span v-if="!isEmailValid" class="flex items-center font-medium tracking-wide text-red-500 text-xs mt-1 ml-1 pl-2">
          Veuillez inscrire un courriel valide.</span
        >
      </div>

      <div class="flex justify-center">
        <button type="submit" class="btn-submit rounded px-6 py-3 text-xl focus:outline-none">Soumettre</button>
      </div>
    </form>
    <div v-if="isFormCompleted" class="flex flex-col">
      <p class="text-3xl md:text-4xl font-medium my-12 text-center">Félicitation, votre inscription est confirmée.</p>
      <div class="md:w-1/2 self-end">
        <p class="text-xs text-end mb-6">
          ** Vous allez recevoir des tonnes de courriels complètement inutiles, contenant plein de publicités, pour vous vendre des Poks-Accessoires. Vous
          deviendrez complètement accros.
        </p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
const name = ref("");
const email = ref("");

const isNameValid = ref(true);
const isEmailValid = ref(true);

const isFormCompleted = ref(false);

function validate() {
  const patternEmail = /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/;
  isNameValid.value = name.value !== "" ? true : false;
  isEmailValid.value = patternEmail.test(email.value) ? true : false;
  return isNameValid.value && isEmailValid.value ? true : false;
}

function onSubmit() {
  if (!validate()) return;
  console.log("Submit", name.value, email.value);

  name.value = "";
  email.value = "";
  isFormCompleted.value = true;
}
</script>

<style scoped>
.pok-new-title {
  font-family: "Roboto Serif", serif;
  font-weight: 400;
  font-size: calc(2em + 4vw);
}
.btn-submit {
  background-color: #222e50;
  color: white;
}
.btn-submit:hover,
.btn-submit:focus {
  color: #f4d77b;
  scale: 1.2;
}
</style>

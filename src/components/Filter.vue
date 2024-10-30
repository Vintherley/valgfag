<script setup>
import { ref, computed } from 'vue';

// Separate ingredienser for at undgå gentagelse
const ingredientsList = {
  spaghetti: 'spaghetti',
  æg: 'æg',
  bacon: 'bacon',
  parmesan: 'parmesan',
  fløde: 'fløde',
  tomat: 'tomat',
  løg: 'løg',
  hvidløg: 'hvidløg',
  basilikum: 'basilikum',
  bouillon: 'bouillon',
  mel: 'mel',
  mælk: 'mælk',
  sukker: 'sukker',
  smør: 'smør',
  kylling: 'kylling',
  salat: 'salat',
  agurk: 'agurk',
  avocado: 'avocado',
  pasta: 'pasta',
  kød: 'kød',
  tomatsauce: 'tomatsauce',
  ost: 'ost',
  bechamelsauce: 'bechamelsauce',
};

// Opskrifter med referencer til `ingredientsList`, gør det til en reaktiv variabel
const recipes = ref([
  { id: 1, name: 'Spaghetti Carbonara', ingredients: [ingredientsList.spaghetti, ingredientsList.æg, ingredientsList.bacon, ingredientsList.parmesan, ingredientsList.fløde] },
  { id: 2, name: 'Tomatsuppe', ingredients: [ingredientsList.tomat, ingredientsList.løg, ingredientsList.hvidløg, ingredientsList.basilikum, ingredientsList.bouillon] },
  { id: 3, name: 'Pandekager', ingredients: [ingredientsList.mel, ingredientsList.æg, ingredientsList.mælk, ingredientsList.sukker, ingredientsList.smør] },
  { id: 4, name: 'Kyllingesalat', ingredients: [ingredientsList.kylling, ingredientsList.salat, ingredientsList.tomat, ingredientsList.agurk, ingredientsList.avocado] },
  { id: 5, name: 'Lasagne', ingredients: [ingredientsList.pasta, ingredientsList.kød, ingredientsList.tomatsauce, ingredientsList.ost, ingredientsList.bechamelsauce] },
]);

// Reactive variable til søgeterm
const searchTerm = ref('');

// Computed property til filtrerede opskrifter baseret på søgetermen
const filteredRecipes = computed(() => {
  if (!searchTerm.value) return recipes.value; // Returner alle opskrifter, hvis der ikke er nogen søgeterm

  // Filtrer opskrifter baseret på navn eller ingredienser
  return recipes.value.filter(recipe => {
    const lowerCaseSearchTerm = searchTerm.value.toLowerCase();

    // Tjek om søgetermen findes i navnet på opskriften
    const nameMatches = recipe.name.toLowerCase().includes(lowerCaseSearchTerm);

    // Tjek om søgetermen findes i nogen af ingredienserne
    const ingredientMatches = recipe.ingredients.some(ingredient =>
      ingredient.toLowerCase().includes(lowerCaseSearchTerm)
    );

    return nameMatches || ingredientMatches;
  });
});

</script>

<template>
  <div>
    <h1>Find lækre opskrifter baseret på det du har i køleskabet</h1>
    
    <!-- Input-felt til søgning -->
    <input
      type="text"
      placeholder="Hvad kunne du tænke dig idag?"
      class="filter-input"
      v-model="searchTerm"
    />
    <button class="filter-btn">Søg</button>

    <!-- Liste over filtrerede opskrifter -->
    <ul>
      <li v-for="recipe in filteredRecipes" :key="recipe.id">
        <strong>{{ recipe.name }}</strong> <br />
        Ingredienser: {{ recipe.ingredients.join(', ') }}
      </li>
    </ul>
  </div>
</template>

<style>
h1{
    color:brown;
}
.filter-input{
    width: 200px;
    height: 40px;
}
.filter-btn{
    width: 90px;
    height: 40px;
    border-radius: 5px;
}
</style>
<script setup>
import { ref, computed, onMounted, watch } from 'vue';
import { initializeApp } from 'firebase/app';
import { getDatabase, ref as dbRef, onValue } from 'firebase/database';

// Firebase-konfiguration
const firebaseConfig = {
  apiKey: "AIzaSyDjpBiMAu5z7lGASSzv3Z-eMqFDYpUgi_0",
  authDomain: "camelina-godkendt.firebaseapp.com",
  databaseURL: "https://camelina-godkendt-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "camelina-godkendt",
  storageBucket: "camelina-godkendt.appspot.com",
  messagingSenderId: "393442725508",
  appId: "1:393442725508:web:f25b640497b175756b7cd1"
};

// Initialiser Firebase-appen
const app = initializeApp(firebaseConfig);
const database = getDatabase(app);

// Opskrifter, som en reaktiv variabel
const recipes = ref([]);

// Hent data fra Firebase Realtime Database
const loadRecipesFromFirebase = () => {
  const recipesRef = dbRef(database, 'recipes');
  onValue(recipesRef, (snapshot) => {
    if (snapshot.exists()) {
      recipes.value = Object.values(snapshot.val());
      console.log("Hentede opskrifter:", recipes.value); // Log data
    } else {
      console.log('No data available');
    }
  });
};

// Reactive variable til søgeterm
const searchTerm = ref('');
const filteredRecipes = ref([]); // Initialiser den filtrerede liste

// Funktion til at filtrere opskrifter baseret på søgetermen
const filterRecipes = () => {
  if (!searchTerm.value) {
    filteredRecipes.value = recipes.value; // Returner alle opskrifter, hvis der ikke er nogen søgeterm
  } else {
    const lowerCaseSearchTerm = searchTerm.value.toLowerCase();

    filteredRecipes.value = recipes.value.filter(recipe => {
      const nameMatches = recipe.name.toLowerCase().includes(lowerCaseSearchTerm);
      const ingredientMatches = Array.isArray(recipe.ingredients) && recipe.ingredients.some(ingredient =>
        ingredient.toLowerCase().includes(lowerCaseSearchTerm)
      );
      return nameMatches || ingredientMatches;
    });
  }
};

// Watcher til at opdatere `filteredRecipes` automatisk, når `searchTerm` ændres
watch(searchTerm, () => {
  filterRecipes();
});

// Hent opskrifter, når komponenten loader
onMounted(() => {
  loadRecipesFromFirebase();
  filterRecipes(); // Sæt initial filtrering
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
    <button class="filter-btn" @click="filterRecipes">Søg</button>

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
h1 {
  color: brown;
}
.filter-input {
  width: 200px;
  height: 40px;
}
.filter-btn {
  width: 90px;
  height: 40px;
  border-radius: 5px;
}
</style>

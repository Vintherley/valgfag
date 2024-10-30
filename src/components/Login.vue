<template>
  <div>
    <h2>Login</h2>
    <input type="text" v-model="username" placeholder="Brugernavn" />
    <input type="password" v-model="password" placeholder="Kodeord" />
    <button @click="login">Login</button>
  </div>
</template>

<script setup>
import { ref } from 'vue';

const username = ref('');
const password = ref('');

// Login function with hardcoded credentials
const login = () => {
  if (username.value === 'Charlotte' && password.value === '123V22pry') {
    alert('Login successful!');
    // Here you can add logic to navigate to a different page or store the login status
  } else {
    alert('Incorrect username or password.');
  }
};
</script>

<style>
/* Add your styling here */
</style>


  
  

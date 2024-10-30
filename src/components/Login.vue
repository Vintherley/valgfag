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
  import { initializeApp } from 'firebase/app';
  import { getFirestore } from 'firebase/firestore';
  
  const firebaseConfig = {
    apiKey: "YOUR_API_KEY",
    authDomain: "YOUR_PROJECT_ID.firebaseapp.com",
    projectId: "YOUR_PROJECT_ID",
    storageBucket: "YOUR_PROJECT_ID.appspot.com",
    messagingSenderId: "YOUR_SENDER_ID",
    appId: "YOUR_APP_ID",
  };
  
  const app = initializeApp(firebaseConfig);
  const db = getFirestore(app);
  
  const username = ref('');
  const password = ref('');
  
  const login = () => {
    if (username.value === 'Charlotte' && password.value === '123V22pry') {
      alert('Login successful!');
    } else {
      alert('Incorrect username or password.');
    }
  };
  </script>
  
  

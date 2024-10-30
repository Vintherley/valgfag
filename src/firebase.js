import firebase from 'firebase/app';
import 'firebase/firestore';

// Your Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyDjpBiMAu5z7lGASSzv3Z-eMqFDYpUgi_0",
    authDomain: "camelina-godkendt.firebaseapp.com",
    databaseURL: "https://camelina-godkendt-default-rtdb.europe-west1.firebasedatabase.app",
    projectId: "camelina-godkendt",
    storageBucket: "camelina-godkendt.appspot.com",
    messagingSenderId: "393442725508",
    appId: "1:393442725508:web:f25b640497b175756b7cd1"
  };

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

// Export the Firestore database
const db = firebase.firestore();
export { db };
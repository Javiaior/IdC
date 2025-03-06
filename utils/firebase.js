// pages/firebaseConfig.js
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

// Your Firebase config
const firebaseConfig = {
  apiKey: "AIzaSyCh4FD2gRw8rVzxfD5E3XghSubcmiwoDsk",
  authDomain: "isla-del-combate.firebaseapp.com",
  projectId: "isla-del-combate",
  storageBucket: "isla-del-combate.firebasestorage.app",
  messagingSenderId: "17981599304",
  appId: "1:17981599304:web:990e236af32eca7132f27d",
  measurementId: "G-97QBBVLLPD",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db };

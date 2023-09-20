import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDVU427ctfBUHDMz3qDpE46UrpqJxpE0-c",
  authDomain: "chat-44f1a.firebaseapp.com",
  projectId: "chat-44f1a",
  storageBucket: "chat-44f1a.appspot.com",
  messagingSenderId: "32488995886",
  appId: "1:32488995886:web:06093346ef3759d64b33bf",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth();
export const storage = getStorage();
export const db = getFirestore();

// // Import the functions you need from the SDKs you need
// import { initializeApp } from "firebase/app";
// // TODO: Add SDKs for Firebase products that you want to use
// // https://firebase.google.com/docs/web/setup#available-libraries

// // Your web app's Firebase configuration
// const firebaseConfig = {
//   apiKey: "AIzaSyDVU427ctfBUHDMz3qDpE46UrpqJxpE0-c",
//   authDomain: "chat-44f1a.firebaseapp.com",
//   projectId: "chat-44f1a",
//   storageBucket: "chat-44f1a.appspot.com",
//   messagingSenderId: "32488995886",
//   appId: "1:32488995886:web:06093346ef3759d64b33bf"
// };

// // Initialize Firebase
// const app = initializeApp(firebaseConfig);

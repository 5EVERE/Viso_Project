// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDAfWPHhHoze0iCGlQIMr4SaE0vh7cTCfU",
  authDomain: "viso-project.firebaseapp.com",
  projectId: "viso-project",
  storageBucket: "viso-project.appspot.com",
  messagingSenderId: "488206153210",
  appId: "1:488206153210:web:cafac1deef548ae0c2a043",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
export { db };

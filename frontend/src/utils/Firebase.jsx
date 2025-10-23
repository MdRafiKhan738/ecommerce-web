// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getAuth,GoogleAuthProvider} from "firebase/auth"

const firebaseConfig = {
  apiKey: "AIzaSyAD4YXOouHryL0Jcl-EauuhXWC-OR-JopA",
  authDomain: "loginonecart-eba3b.firebaseapp.com",
  projectId: "loginonecart-eba3b",
  storageBucket: "loginonecart-eba3b.firebasestorage.app",
  messagingSenderId: "519237190575",
  appId: "1:519237190575:web:00616748fbbe435b49255a"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth=getAuth(app)
const provider=new GoogleAuthProvider()
export{auth,provider}
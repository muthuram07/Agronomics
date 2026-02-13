import { initializeApp, getApps, getApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyCDqjERsXFx4W3VWKqaO2tWnkSD21CzymM",
    authDomain: "agro-project-31.firebaseapp.com",
    projectId: "agro-project-31",
    storageBucket: "agro-project-31.firebasestorage.app",
    messagingSenderId: "647793492463",
    appId: "1:647793492463:web:9bda6826e047c8f391361a",
    measurementId: "G-ZJWZDS40NK"
};

// Initialize Firebase
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
const auth = getAuth(app);

export { app, auth };

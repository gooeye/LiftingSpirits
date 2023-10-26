import { initializeApp } from "https://www.gstatic.com/firebasejs/10.5.0/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/10.5.0/firebase-analytics.js";
// import { firebase } from "https://www.gstatic.com/firebasejs/10.5.0/firebase-app.js";
import { getFirestore, getDocs, collection, doc, setDoc } from "https://www.gstatic.com/firebasejs/10.5.0/firebase-firestore.js";


// TODO: Replace the following with your app's Firebase project configuration
// See: https://support.google.com/firebase/answer/7015592
const firebaseConfig = {
    apiKey: "AIzaSyByL2UivS9auwkM5vyc7REfo3uAjyjq_E0",
    authDomain: "liftingspirits1.firebaseapp.com",
    databaseURL: "https://liftingspirits1-default-rtdb.asia-southeast1.firebasedatabase.app",
    projectId: "liftingspirits1",
    storageBucket: "liftingspirits1.appspot.com",
    messagingSenderId: "223340916076",
    appId: "1:223340916076:web:6897d475b8789b0e8ad749",
    measurementId: "G-1EDMKV8YRT"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);


// Initialize Cloud Firestore and get a reference to the service
const db = getFirestore(app);
export async function addCollection(page, data) {
    const thingy = doc(collection(db, page));
    await setDoc(thingy, data);
}
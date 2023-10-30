// Import the functions you need from the SDKs you need
import { initializeApp }  from "https://www.gstatic.com/firebasejs/10.5.0/firebase-app.js";
import { getAuth, onAuthStateChanged, signInWithEmailAndPassword, createUserWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.5.0/firebase-auth.js";
import { getFirestore,collection, setDoc, doc, getDoc, query, where, getDocs} from "https://www.gstatic.com/firebasejs/10.5.0/firebase-firestore.js";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyByL2UivS9auwkM5vyc7REfo3uAjyjq_E0",
  authDomain: "liftingspirits1.firebaseapp.com",
  projectId: "liftingspirits1",
  storageBucket: "liftingspirits1.appspot.com",
  messagingSenderId: "223340916076",
  appId: "1:223340916076:web:6897d475b8789b0e8ad749",
  measurementId: "G-1EDMKV8YRT",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth();
const db = getFirestore(app);

//get drinks created by the user
const user_info = sessionStorage.getItem("user_info")
const user_infoObj = JSON.parse(user_info)

const username = user_infoObj.username


const q = query(collection(db, "drinks"), where("created", "==", username));

const drinks = await getDocs(q);

var created_drinks = []
drinks.forEach((drink) => {
  // doc.data() is never undefined for query doc snapshots
  created_drinks.push(drink.data())
});

export { created_drinks }

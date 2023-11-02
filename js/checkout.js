// Import the functions you need from the SDKs you need
import { initializeApp }  from "https://www.gstatic.com/firebasejs/10.5.0/firebase-app.js";
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

//get users cart
const user_info = sessionStorage.getItem("user_info")
const user_infoObj = JSON.parse(user_info)

const cart = (JSON.parse(sessionStorage.getItem('checkout'))).cart

const q = query(collection(db, "inventory"), where("name", "==", username));
const drinks = await getDocs(q);


var price_cart = []
for(let item of cart){
  const q = query(collection(db, "inventory"), where("name", "==", item.name));
  const x = await getDocs(q)

  x.forEach(add => {
    price_cart.push(x.data())
  });
}

export { price_cart }

// Import the functions you need from the SDKs you need
import { initializeApp }  from "https://www.gstatic.com/firebasejs/10.5.0/firebase-app.js";
import { getFirestore,collection, setDoc, doc, getDoc, query, where, getDocs} from "https://www.gstatic.com/firebasejs/10.5.0/firebase-firestore.js";
import { firebaseConfig } from "/js/config.js"

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

// Import the functions you need from the SDKs you need
import { initializeApp }  from "https://www.gstatic.com/firebasejs/10.5.0/firebase-app.js";
import { getAuth, onAuthStateChanged, signInWithEmailAndPassword, createUserWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.5.0/firebase-auth.js";
import { getFirestore,collection, setDoc, doc, getDoc, query, where, getDocs} from "https://www.gstatic.com/firebasejs/10.5.0/firebase-firestore.js";
import { firebaseConfig } from "/js/config.js"

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

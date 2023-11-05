import { initializeApp } from "https://www.gstatic.com/firebasejs/10.5.0/firebase-app.js";
import { getFirestore, collection, setDoc, doc, addDoc, getDoc } from "https://www.gstatic.com/firebasejs/10.5.0/firebase-firestore.js";

import { firebaseConfig } from "/js/config.js"
import { uploadImage } from "/js/util.js";

const app = initializeApp(firebaseConfig);
const db = getFirestore(app)

const user_info = sessionStorage.getItem("user_info")
const user_infoObj = JSON.parse(user_info)

export function createDrink(drink) {
    drink.file = uploadImage("uploadImages", "drinks", drink.name)
    const drinkRef = doc(db, "drinks", drink.name);
    drink.steps = drink.steps.split(',').map(part => part.trim())
    drink.ingredients = drink.ingredients.split(',').map(part => part.trim())
    setDoc(drinkRef, drink)

    
}

export function rateDrinks(name, rating, user) {

    const drinkRef = doc(db, "drinks", name);
    const userRef = doc(db, "users", user);
    
    setDoc(eventRef, drink)
}
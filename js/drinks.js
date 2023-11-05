import { initializeApp } from "https://www.gstatic.com/firebasejs/10.5.0/firebase-app.js";
import { getFirestore, collection, setDoc, doc, addDoc, getDoc } from "https://www.gstatic.com/firebasejs/10.5.0/firebase-firestore.js";

import { firebaseConfig } from "/js/config.js"

const app = initializeApp(firebaseConfig);
const db = getFirestore(app)

// var name = document.getElementById("name").value
// var eventdate = document.getElementById("eventDate").value
// var time = document.getElementById("eventTime").value
// var location = document.getElementById("eventLocation").value
// var desc  = document.getElementById("eventDescription").value
// var cost = document.getElementById("eventCost").value
// var max = document.getElementById("eventMaxOccupancy").value
// var image = document.getElementById("eventImage").value


const user_info = sessionStorage.getItem("user_info")
const user_infoObj = JSON.parse(user_info)

export function createDrink(drink) {

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


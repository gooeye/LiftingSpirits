import { initializeApp } from "https://www.gstatic.com/firebasejs/10.5.0/firebase-app.js"
import { getFirestore, collection, setDoc, doc, addDoc, getDoc, increment } from "https://www.gstatic.com/firebasejs/10.5.0/firebase-firestore.js"
import { firebaseConfig } from "/js/config.js"
import { uploadImage } from "/js/util.js"
import { getAndUpdateUserRating } from "/js/users.js"


const app = initializeApp(firebaseConfig);
const db = getFirestore(app)

const user_info = sessionStorage.getItem("user_info")
const user_infoObj = JSON.parse(user_info)

export function createEvent(event){
    event.file = uploadImage("uploadImages","events", event.name)
    const eventRef = doc(db,'events',event.name)
    setDoc(eventRef,event)
}

export function createDrink(drink) {
    drink.file = uploadImage("uploadImages", "drinks", drink.name)
    const drinkRef = doc(db, "drinks", drink.name)
    drink.steps = drink.steps.split(',').map(part => part.trim())
    drink.ingredients = drink.ingredients.split(',').map(part => part.trim())
    setDoc(drinkRef, drink)
}

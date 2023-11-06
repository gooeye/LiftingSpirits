import { initializeApp } from "https://www.gstatic.com/firebasejs/10.5.0/firebase-app.js"
import { getFirestore, collection, setDoc, doc, addDoc, getDocs, increment, query, where } from "https://www.gstatic.com/firebasejs/10.5.0/firebase-firestore.js"
import { firebaseConfig } from "/js/config.js"
import { uploadImage } from "/js/util.js"
import { getAndUpdateUserRating } from "/js/users.js"

class Event {
    constructor (name, date, location, description, cost, max, organiser, img ) {
        this.name = name
        this.date = date
        this.location = location
        this.description = description 
        this.cost = cost 
        this.max = max 
        this.organiser = organiser
        this.img = img
    }
}

const eventConverter = {
    toFirestore: (event) => {
        return {
            name: event.name,
            date: event.date,
            location: event.location,
            description: event.description,
            cost: event.cost,
            max: event.max,
            organiser: event.organiser,
            img: event.img,
        };
    },
    fromFirestore: (snapshot, options) => {
        const data = snapshot.data(options);
        return new Event(data.name, data.date, data.location, data.description, data.cost, data.max, data.organiser, data.img );
    }
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app)

const user_info = sessionStorage.getItem("user_info")
const user_infoObj = JSON.parse(user_info)

export function createEvent(event){
    event.file = uploadImage("uploadImages","events", event.name)
    const eventRef = doc(db,'events',event.name)
    setDoc(eventRef,event)
}

export async function getAllEvents() {
    try {
        const querySnapshot = await getDocs(collection(db, "events").withConverter(eventConverter));
        let result = []
        querySnapshot.forEach((doc) => {
            result.push(doc.data());
        });
        return result
    }
    catch (e) {
        console.log(e)
        return false
    }
}

export async function getEventsCreatedBy(user) {
    const docRef = collection(db, "events").withConverter(eventConverter)
    const q = query(docRef, where("organiser", "==", user))
    try {
        let data = await getDocs(q)
        let result = []
        data.forEach((doc) => {
            result.push(doc.data());
        })
        return result
    }
    catch (e) {
        console.log(e)
        return false
    }
}
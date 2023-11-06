import { initializeApp } from "https://www.gstatic.com/firebasejs/10.5.0/firebase-app.js"
import { getFirestore, collection, setDoc, doc, addDoc, getDocs, increment, query, where } from "https://www.gstatic.com/firebasejs/10.5.0/firebase-firestore.js"
import { firebaseConfig } from "/js/config.js"
import { uploadImage } from "/js/util.js"
import { getAndUpdateUserRating } from "/js/users.js"

export class Event {
    constructor (name, timestamp, location, description, cost, max, participating, organiser, img ) {
        this.name = name
        this.timestamp = timestamp
        this.location = location
        this.description = description 
        this.cost = cost 
        this.max = max 
        this.participating = participating 
        this.organiser = organiser
        this.img = img
    }
    getDate() {
        return new Date(this.timestamp)
    }
}

const eventConverter = {
    toFirestore: (event) => {
        return {
            name: event.name,
            timestamp: event.timestamp,
            location: event.location,
            description: event.description,
            cost: event.cost,
            max: event.max,
            participating: event.participating,
            organiser: event.organiser,
            img: event.img,
        };
    },
    fromFirestore: (snapshot, options) => {
        const data = snapshot.data(options);
        return new Event(data.name, data.timestamp, data.location, data.description, data.cost, data.max, data.participating, data.organiser, data.img );
    }
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app)

const user_info = sessionStorage.getItem("user_info")
const user_infoObj = JSON.parse(user_info)

export function createEvent(event){
    event.img = uploadImage("eventImage","events", event.name)
    const eventRef = doc(db,'events',event.name).withConverter(eventConverter)
    setDoc(eventRef, event)
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

export async function getUpcomingEvents() {
    const docRef = collection(db, "events").withConverter(eventConverter)
    const date = new Date();
    const q = query(docRef, where("timestamp", ">", date.getTime()))
    console.log(date.getTime())
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
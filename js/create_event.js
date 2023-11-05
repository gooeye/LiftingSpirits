import { initializeApp } from "https://www.gstatic.com/firebasejs/10.5.0/firebase-app.js";
import { getFirestore, collection, setDoc, doc, addDoc, getDoc } from "https://www.gstatic.com/firebasejs/10.5.0/firebase-firestore.js";

import { firebaseConfig } from "/js/config.js"

const app = initializeApp(firebaseConfig);
const db = getFirestore(app)

var eventname = document.getElementById("eventName").value
var eventdate = document.getElementById("eventDate").value
var time = document.getElementById("eventTime").value
var location = document.getElementById("eventLocation").value
var desc  = document.getElementById("eventDescription").value
var cost = document.getElementById("eventCost").value
var max = document.getElementById("eventMaxOccupancy").value
var image = document.getElementById("eventImage").value


const user_info = sessionStorage.getItem("user_info")
const user_infoObj = JSON.parse(user_info)

const eventRef = doc(db, "events", eventname);

setDoc(eventRef,{
    name: eventname,
    date: eventdate,
    time: time,
    
    created: user_infoObj.username,

    location: location,
    description: desc,

    cost:cost,
    max:max,
})
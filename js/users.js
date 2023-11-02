import { initializeApp } from "https://www.gstatic.com/firebasejs/10.5.0/firebase-app.js";
import { collection, doc, query, where, getDoc, getDocs, getFirestore } from "https://www.gstatic.com/firebasejs/10.5.0/firebase-firestore.js";

import { firebaseConfig } from "/js/config.js"

const app = initializeApp(firebaseConfig);
const db = getFirestore(app)

export async function getUserInfo(user) {
    const docRef = doc(db, "users", user)
    const docSnap = await getDoc(docRef)
    
    if (docSnap.exists()) {
        return docSnap.data()
    } else {
      // docSnap.data() will be undefined in this case
        return false
    }
}

export async function userNameExists(user) {
    const docRef = collection(db, "users");
    const q = query(docRef, where("username", "==", user))
    let data = await getDocs(q)
    let userExists = false
    data.forEach((doc) => {
        userExists = true
    })
    console.log(userExists)
    return userExists
}

export async function emailExists(email) {
    const docRef = doc(db, "users", email)
    let data = await getDoc(docRef)
    if (data.exists()) {
        return true
    } else {
        return false
    }
}
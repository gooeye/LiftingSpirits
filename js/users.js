import { initializeApp } from "https://www.gstatic.com/firebasejs/10.5.0/firebase-app.js"
import { collection, doc, query, where, getDoc, getDocs, getFirestore, updateDoc, arrayUnion, deleteDoc } from "https://www.gstatic.com/firebasejs/10.5.0/firebase-firestore.js"

import { firebaseConfig } from "/js/config.js"
import { addToGlobalRating } from "/js/drinks.js"

const app = initializeApp(firebaseConfig)
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
    const docRef = collection(db, "users")
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

export async function addDrink(email, status, drink, rating) {
    // params:
    //  email: string, email of user
    // status: int, 0 = won't try, 1 = tried, 2 = want to try
    //  drink: string, name of drink
    // rating: int || undefined, rating
    if (rating && status != 1) {
        throw new Error('Can\'t rate a drink you haven\'t tried')
    }
    const userRef = doc(db, "users", email)
    if (status == 0) {
        updateDoc(userRef, {
            will_drink : arrayUnion(drink)
        })
    }
    else if (status == 1) {
        let toUpdate = {}
        let key = 'tried.'+drink
        toUpdate[key] = rating
        try {
            await Promise.all([
                updateDoc(userRef, toUpdate),
                addToGlobalRating(drink, rating)
            ])
            return true
        } catch (e) {
            console.log(e)
            return 0
        }
    }
    else if (status == 2) {
        updateDoc(userRef, {
            will_not_drink : arrayUnion(drink)
        })
    }
}

export async function deleteUser (email) {
    const userRef = doc(db, "users", email)
    try {
        await deleteDoc(userRef)
        return true
    } catch (e) {
        console.error(e)
        return false
    }
}

export async function getAndUpdateUserRating(email, drinkName, rating) {
    const userRef = doc(db, 'users', email)
    try {
        const userDoc = await getDoc(userRef)
        if (userDoc.exists()) {
            const userData = userDoc.data()
            const tried = userData.tried || {}
            if (drinkName in tried) {
                let toUpdate = {}
                let key = 'tried.'+drinkName
                toUpdate[key] = rating
                await updateDoc(userRef, toUpdate)
                return tried[drinkName]
            } else {
                return 0
            }
        } else {
            console.log('User document not found.')
            return 0
        }
    } catch (error) {
        console.error('Error retrieving user rating:', error)
        return 0
    }
}
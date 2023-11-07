import { initializeApp } from "https://www.gstatic.com/firebasejs/10.5.0/firebase-app.js"
import { collection, doc, query, where, getDoc, getDocs, getFirestore, updateDoc, arrayUnion, deleteDoc, arrayRemove, increment } from "https://www.gstatic.com/firebasejs/10.5.0/firebase-firestore.js"

import { firebaseConfig } from "/js/config.js"
import { addToGlobalRating, removeRating } from "/js/drinks.js"
import { getEvent } from "/js/events.js"
import { getUrl } from "/js/util.js"

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

export async function addDrinkToList(email, status, drink, rating) {
    // params:
    //  email: string, email of user
    // status: int, 0 = want to try, 1 = tried, 2 = won't try
    //  drink: string, name of drink
    // rating: int || undefined, rating
    if (rating && status != 1) {
        throw new Error('Can\'t rate a drink you haven\'t tried')
    }
    const userRef = doc(db, "users", email)
    if (status == 1) {
        let toUpdate = {}
        let key = 'tried.'+drink
        toUpdate[key] = rating
        try {
            await Promise.all([
                updateDoc(userRef, toUpdate),
                updateDoc(userRef, {will_not_drink : arrayRemove(drink)}),
                updateDoc(userRef, {wil_drink : arrayRemove(drink)}),
                addToGlobalRating(drink, rating)
            ])
            return true
        } catch (e) {
            console.log(e)
            return 0
        }
    } else {
        try {
            const userDoc = await getDoc(userRef)
            if (userDoc.exists()) {
                const userData = userDoc.data()
                const tried = userData.tried || {}
                if (drink in tried) {
                    await removeRating(drink, tried[drink])
                }
            }
        } catch (error) {
            console.error('Error retrieving user rating:', error)
            return 0
        }
        if (status == 0) {
            try {
                await Promise.all([
                    updateDoc(userRef, {will_drink : arrayUnion(drink)}),
                    updateDoc(userRef, {will_not_drink : arrayRemove(drink)}),
                    updateDoc(userRef, {tried : arrayRemove(drink)})
                ])
                return true
            } catch (e) {
                console.log(e)
                return 0
            }        
        }
        else if (status == 2) {
            try {
                await Promise.all([
                    updateDoc(userRef, {will_not_drink : arrayUnion(drink)}),
                    updateDoc(userRef, {will_drink : arrayRemove(drink)}),
                    updateDoc(userRef, {tried : arrayRemove(drink)})
                ])
                return true
            } catch (e) {
                console.log(e)
                return 0
            }
        }
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


export async function getJoinedEvents(email) {
    const userRef = doc(db, 'users', email)
    let eventList = []
    let result = []
    try {
        const userDoc = await getDoc(userRef)
        if (userDoc.exists()) {
            const data = userDoc.data()
            eventList = data.joined_events || []
        } else {
            console.log('Document not found.')
            return 0
        }
    } catch (error) {
        console.error('Error retrieving rating:', error)
        return 0
    }
    for (let eventName of eventList) {
        result.push(await getEvent(eventName))
    }
    return result
}

export async function joinEvent(event, email) {
    const userRef = doc(db, 'users', email)
    const eventRef = doc(db,'events',event)
    
    try {
        let userDoc = await getDoc(userRef)
        if (!userDoc.data().joined_events.includes(event)) {
            await Promise.all([
                updateDoc(userRef, {"joined_events" : arrayUnion(event)}),
                updateDoc(eventRef, {participating: increment(1)})
            ])
            console.log('Event joined successfully.')
            return true
        } else {
            throw new Error("User already in event")
        }
    } catch (error) {
        console.error('Error joining event:', error)
        return false
    }
}

export async function leaveEvent(event, email) {
    const userRef = doc(db, 'users', email)
    const eventRef = doc(db,'events',event)
    try {
        let userDoc = await getDoc(userRef)
        if (userDoc.data().joined_events.includes(event)) {
            await Promise.all([
                updateDoc(userRef, {"joined_events" : arrayRemove(event)}),
                updateDoc(eventRef, {participating: increment(-1)})
            ])
            console.log('Event left successfully.')
            return true
        } else {
            throw new Error("User not in event")
        }
    } catch (error) {
        console.error('Error leaving event:', error)
        return false
    }
}

export async function getDrinksInList(email) {
    const userRef = doc(db, 'users', email)
    let drinkList = []
    let result = []
    try {
        const userDoc = await getDoc(userRef)
        if (userDoc.exists()) {
            const data = userDoc.data()
            drinkList = data.will_drink || []
            console.log(drinkList)
            for (let drink of data.will_drink) {
                console.log(drink, "hi")
                const docRef = doc(db, "drinks", drink)
                const docSnap = await getDoc(docRef)
                if (docSnap.exists()) {
                    var drinkData = docSnap.data()
                    var url = await getUrl(drinkData.img)
                } else {
                    return false
                }
                
                result.push({name: drink, status: "Want to try", img: url})
            }
            for (let drink of data.will_not_drink) {
                const docRef = doc(db, "drinks", drink)
                const docSnap = await getDoc(docRef)
                if (docSnap.exists()) {
                    var drinkData = docSnap.data()
                    var url = await getUrl(drinkData.img)
                } else {
                    return false
                }
                
                result.push({name: drink, status: "Won't try", img: url})
            }
            for (let drink of data.tried) {
                const docRef = doc(db, "drinks", drink)
                const docSnap = await getDoc(docRef)
                if (docSnap.exists()) {
                    var drinkData = docSnap.data()
                    var url = await getUrl(drinkData.img)
                } else {
                    return false
                }
                result.push({name: drink, rating: data.tried[drink], status: "Tasted", img: url})
            }
            return drinkList
        } else {
            console.log('Document not found.')
            return 0
        }
    } catch (error) {
        console.error('Error retrieving rating:', error)
        return 0
    }
}
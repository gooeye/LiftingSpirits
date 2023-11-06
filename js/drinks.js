import { initializeApp } from "https://www.gstatic.com/firebasejs/10.5.0/firebase-app.js"
import { getFirestore, collection, setDoc, doc, addDoc, getDoc, getDocs, increment, updateDoc } from "https://www.gstatic.com/firebasejs/10.5.0/firebase-firestore.js"
import { firebaseConfig } from "/js/config.js"
import { uploadImage } from "/js/util.js"
import { getAndUpdateUserRating } from "/js/users.js"

const app = initializeApp(firebaseConfig)
const db = getFirestore(app)

const user_info = sessionStorage.getItem("user_info")
const user_infoObj = JSON.parse(user_info)

export async function createDrink(drink) {
    if (drinkExists(drink)) {
        drink.file = uploadImage("uploadImages", "drinks", drink.name)
        const drinkRef = doc(db, "drinks", drink.name)
        drink.steps = drink.steps.split(',').map(part => part.trim())
        drink.ingredients = drink.ingredients.split(',').map(part => part.trim())
        setDoc(drinkRef, drink)
        return 1
    } else {
        return 2
    }
}

export async function getAllDrinks() {
    try {
        const querySnapshot = await getDocs(collection(db, "drinks"));
        let result = []
        querySnapshot.forEach((doc) => {
            result.push(doc.id);
        });
        return result
    }
    catch (e) {
        console.log(e)
        return false
    }
}

export async function drinkExists(drink) {
    try {
        const querySnapshot = await getDocs(collection(db, "drinks"));
        let result = false
        querySnapshot.forEach((doc) => {
            if (doc.id == drink) result = true
        });
        return result
    }
    catch (e) {
        console.log(e)
        throw new error(e)
    }
}

export async function addToGlobalRating(name, rating) {
    const drinkRef = doc(db, 'drinks', name)
    try {
        await updateDoc(drinkRef, {
            rating: increment(rating),
            num_tried: increment(1)
        })
        console.log('Rating updated successfully.')
        return true
    } catch (error) {
        console.error('Error updating rating:', error)
        return false
    }
}

export async function updateRating(drink, rating, email) {
    const drinkRef = doc(db, 'drinks', drink)
    let oldRating = await getAndUpdateUserRating (email, drink, rating)
    if (!oldRating) throw new error('Can\'t update for a user that has not rated the drink')
    try {
        await updateDoc(drinkRef, {
            rating: increment(rating - oldRating)
        })
        console.log('Rating updated successfully.')
        return true
    } catch (error) {
        console.error('Error updating rating:', error)
        return false
    }
}

export async function removeRating(drink, rating) {
    const drinkRef = doc(db, 'drinks', drink)
    try {
        await updateDoc(drinkRef, {
            rating: increment(-rating),
            num_tried: increment(-1)
        })
        console.log('Rating updated successfully.')
        return true
    } catch (error) {
        console.error('Error updating rating:', error)
        return false
    }
}

export async function getGlobalRating(name) {
    const drinkRef = doc(db, 'drinks', name)

    try {
        const drinkDoc = await getDoc(drinkRef)

        if (drinkDoc.exists()) {
            const data = drinkDoc.data()
            const rating = data.rating || 0
            const num_tried = data.num_tried || 1
            return rating/num_tried
        } else {
            console.log('Document not found.')
            return 0
        }
    } catch (error) {
        console.error('Error retrieving rating:', error)
        return 0
    }
}
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.5.0/firebase-app.js"
import { getFirestore, collection, setDoc, doc, addDoc, getDoc, getDocs, increment, updateDoc, query, orderBy, limit } from "https://www.gstatic.com/firebasejs/10.5.0/firebase-firestore.js"
import { firebaseConfig } from "/js/config.js"
import { uploadImage } from "/js/util.js"
import { getAndUpdateUserRating } from "/js/users.js"

const app = initializeApp(firebaseConfig)
const db = getFirestore(app)

const user_info = sessionStorage.getItem("user_info")
const user_infoObj = JSON.parse(user_info)

export async function createDrink(drink) {
    if (drinkExists(drink)) {
        drink.img = uploadImage("uploadImages", "drinks", drink.name)
        const drinkRef = doc(db, "drinks", drink.name)
        drink.steps = drink.steps.split(',').map(part => part.trim())
        drink.ingredients = drink.ingredients.split(',').map(part => part.trim())
        setDoc(drinkRef, drink)
        setTimeout(()=> {
            window.location.assign("my_concoctions.html");
        }
         ,5000);
    
        return 1
    } else {
        return 2
    }
}

export async function getAllDrinks() {
    try {
        const querySnapshot = await getDocs(collection(db, "drinks"));
        let result = {}
        querySnapshot.forEach((doc) => {
            result[doc.data().name]=doc.data();
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

export async function addToGlobalRating(drink, rating) {
    const drinkRef = doc(db, 'drinks', drink)
    try {
        await updateDoc(drinkRef, {
            rating: increment(rating),
            num_tried: increment(1)
        })
        console.log('Rating updated successfully.')
        return await getGlobalRating(drink)
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
        return await getGlobalRating(drink)
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
            num_tried: increment(-1),
        })
        console.log('Rating updated successfully.')
        return await getGlobalRating(drink)
    } catch (error) {
        console.error('Error updating rating:', error)
        return false
    }
}

export async function getGlobalRating(drink) {
    const drinkRef = doc(db, 'drinks', drink)

    try {
        const drinkDoc = await getDoc(drinkRef)
        if (drinkDoc.exists()) {
            const data = drinkDoc.data()
            const rating = data.rating || 0
            const num_tried = data.num_tried || 1
            
            await updateDoc(drinkRef, {
                rating_per_tried: rating/num_tried
            })
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

export async function getTopDrinks() {
    const drinkRef = collection(db, "drinks")
    try {
        let q = query(drinkRef, orderBy("rating_per_tried", "desc"), limit(10));
        let data = await getDocs(q)
        let result = {}
        data.forEach((doc) => {
            if (doc.data().rating) result[doc.data().name]=doc.data();
        })
        console.log(result)
        return result
    } catch (e) {
        console.log(e)
        return false
    }
}
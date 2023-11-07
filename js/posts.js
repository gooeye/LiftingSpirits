import { initializeApp } from "https://www.gstatic.com/firebasejs/10.5.0/firebase-app.js"
import { getFirestore, collection, setDoc, doc, addDoc, getDoc, getDocs, increment, updateDoc } from "https://www.gstatic.com/firebasejs/10.5.0/firebase-firestore.js"
import { firebaseConfig } from "/js/config.js"
import { uploadImage } from "/js/util.js"
import { getAndUpdateUserRating } from "/js/users.js"

const app = initializeApp(firebaseConfig)
const db = getFirestore(app)

const user_info = sessionStorage.getItem("user_info")
const user_infoObj = JSON.parse(user_info)

export async function getAllPosts() {
    try {
        const querySnapshot = await getDocs(collection(db, "posts"));
        let posts = []
        querySnapshot.forEach((post) => {
            posts.push(post.data());
        });
        return posts
    }
    catch (e) {
        console.log(e)
        return false
    }
}
export async function createPost(postData) {
    try {
        const { title, category, description } = postData;
        const username = user_infoObj.username;
        
        let daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
        let months = ['January',"February","March","April","May","June","July","August","September","October","November","December"]
        let current = new Date()
        current.setDate(current.getDate())

        let dateString = current.getFullYear() + ", " + months[current.getMonth()] + ", " + current.getDate() + ", " + daysOfWeek[current.getDay()]
        const docRef = await addDoc(collection(db, "posts"), {
            title: title,
            category: category,
            description: description,
            author: username,
            date: dateString,
            
        });
        await location.reload();
        console.log("Post created with ID: ", docRef.id);
        return docRef.id; // Return the ID of the newly created post
    } catch (e) {
        console.error("Error creating post: ", e);
        return null;
    }
}

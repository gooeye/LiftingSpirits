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
export async function createPost(postData) {
    try {
        const { title, content, imageUrl } = postData;
        const username = user_infoObj.username;
        
        const docRef = await addDoc(collection(db, "posts"), {
            title: title,
            content: content,
            imageUrl: imageUrl,
            creator: username, // does this work lol
            createdAt: serverTimestamp() // Add a timestamp for when the post is created
        });

        console.log("Post created with ID: ", docRef.id);
        return docRef.id; // Return the ID of the newly created post
    } catch (e) {
        console.error("Error creating post: ", e);
        return null;
    }
}

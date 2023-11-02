// Import the functions you need from the SDKs you need
import { initializeApp }  from "https://www.gstatic.com/firebasejs/10.5.0/firebase-app.js";
import { getAuth, onAuthStateChanged, signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut } from "https://www.gstatic.com/firebasejs/10.5.0/firebase-auth.js";
import { getDatabase,set,ref,update } from "https://www.gstatic.com/firebasejs/10.5.0/firebase-database.js";
import { getFirestore, collection, setDoc, doc, addDoc, getDoc , query} from "https://www.gstatic.com/firebasejs/10.5.0/firebase-firestore.js";
import { firebaseConfig } from "/js/config.js"

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth();
const db = getFirestore(app);

//get html 
var userEmail = document.getElementById("email")
var userPassword = document.getElementById("password")
var loginButton = document.getElementById("loginButton")


const login = document.getElementById("loginButton")

//login function
const userSignIn = async() =>{
    const email = userEmail.value
    const password = userPassword.value
    signInWithEmailAndPassword(auth,email,password)
    .then((userCredential) => {
        const user = userCredential.user
        alert("Signed in successfully!")

        const userRef = doc(db,"users",email)
        getDoc(userRef).then((doc) => {
            if (doc.exists()) {
                sessionStorage.setItem("user_info", JSON.stringify({
                    email : email,
                    username: (doc.data()).username,
                    isLoggedIn: true,
                    
                }))
                window.location.replace("index.html");
            }
        })

    })
    .catch((error) =>{
        const errorCode = error.code
        const errorMessage = error.message
        console.log(errorCode + errorMessage)
        alert("Signed failed! Check that you have correctly entered your email and password")
        userEmail.innerHTML = ""
        userPassword.innerHTML = ""
    })
}
//give login button login function
login.addEventListener("click", userSignIn)









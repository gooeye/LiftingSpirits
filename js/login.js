// Import the functions you need from the SDKs you need
import { initializeApp }  from "https://www.gstatic.com/firebasejs/10.5.0/firebase-app.js";
import { 
    getAuth, 
    onAuthStateChanged, 
    signInWithEmailAndPassword, 
    createUserWithEmailAndPassword, 
    signOut 
    } from "https://www.gstatic.com/firebasejs/10.5.0/firebase-auth.js";
import { getDatabase,set,ref,update } from "https://www.gstatic.com/firebasejs/10.5.0/firebase-database.js";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyByL2UivS9auwkM5vyc7REfo3uAjyjq_E0",
  authDomain: "liftingspirits1.firebaseapp.com",
  projectId: "liftingspirits1",
  storageBucket: "liftingspirits1.appspot.com",
  messagingSenderId: "223340916076",
  appId: "1:223340916076:web:6897d475b8789b0e8ad749",
  measurementId: "G-1EDMKV8YRT",
  databaseURL: "https://liftingspirits1-default-rtdb.asia-southeast1.firebasedatabase.app/"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth();

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
        sessionStorage.setItem("user-info", JSON.stringify({
            email : email,
            isLoggedIn: true,
        }))
        window.location.replace("index.html");
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









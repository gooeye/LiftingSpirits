// Import the functions you need from the SDKs you need
import { initializeApp }  from "https://www.gstatic.com/firebasejs/10.5.0/firebase-app.js";
import { getAuth, signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.5.0/firebase-auth.js";
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
const database = getDatabase(app);

var login = document.getElementById("loginButton")

//define login function
login.addEventListener("click", () =>{


    var email = document.getElementById('email').value
    var password = document.getElementById('password').value


    signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            // Signed in 
            const user = userCredential.user;
            // ...
            var lgDate = new Date()
                update(ref(database, "users/" + user.uid),{
                    last_login : lgDate,
                })
                .then(() =>{
                    console.log("Success!")
                })
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                console.log(errorMessage)
        });
    })


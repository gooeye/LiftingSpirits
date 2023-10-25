// Import the functions you need from the SDKs you need
import { initializeApp }  from "https://www.gstatic.com/firebasejs/10.5.0/firebase-app.js";
import { getAuth, onAuthStateChanged, signInWithEmailAndPassword, createUserWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.5.0/firebase-auth.js";
import { getDatabase,set,ref,update } from "https://www.gstatic.com/firebasejs/10.5.0/firebase-database.js";
import { getFirestore,collection, addDoc, doc} from "https://www.gstatic.com/firebasejs/10.5.0/firebase-firestore.js";

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
const realtime = getDatabase(app);
const storage = getFirestore(app);

//registration function
var register = document.getElementById("regButton")

register.addEventListener("click", async () =>{

    var email = document.getElementById('regEmail').value
    var username = document.getElementById('userId').value
    var password = document.getElementById('regPassword').value
    var cpassword = document.getElementById('cPassword').value

    if (validate_email(email) == false){
        alert("Enter a valid email address")
        return
    }

    if(validatePassword(password) == false){
        alert("Your password must have more than 6 characters!")
        return
    }

    if(passwordMatch(password,cpassword) == false){
        alert("Both passwords don't match!")
        return
    }

    //update realtime database---------------------------------------------------------------------------------------------
    createUserWithEmailAndPassword(auth,email,password)
    .then(function(userCredential){
        var user = auth.currentUser

        update(ref(realtime, "users/" + user.uid),{
            email: email,
            username: username,
            last_login : "",
        })

        try {
            const docRef = addDoc(collection(storage, user.uid), {
              first: "Ada",
              last: "Lovelace",
              born: [1,2,3,4,5],
            });
            console.log("Document written with ID: ", docRef.id);
          } catch (e) {
            console.error("Error adding document: ", e);
          }
        


        alert("Account has been created!")
       // window.location.assign("login.html")
    })

    .catch(function(error){
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorMessage)
    })
    //---------------------------------------------------------------------------------------------------------------------
})

function passwordMatch(x,y){
    if (x !== y){
        return false
    }
    return true
}

function validatePassword(x){
    if(x.length < 6){
        return false
    }
    return true
}

function validate_email(email){
    let expression = /^[^@]+@\w+(\.\w+)+\w$/
    if(expression.test(email)==true){
        return true
    }
    return false
}



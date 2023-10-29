// Import the functions you need from the SDKs you need
import { initializeApp }  from "https://www.gstatic.com/firebasejs/10.5.0/firebase-app.js";
import { getAuth, onAuthStateChanged, signInWithEmailAndPassword, createUserWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.5.0/firebase-auth.js";
import { getFirestore,collection, setDoc, doc, addDoc} from "https://www.gstatic.com/firebasejs/10.5.0/firebase-firestore.js";

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
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth();
const db = getFirestore(app);

//registration function
var register = document.getElementById("regButton")

register.addEventListener("click", async () =>{

    var email = document.getElementById('regEmail').value
    var username = document.getElementById('userId').value
    var password = document.getElementById('regPassword').value
    var cpassword = document.getElementById('cPassword').value
    var dob = document.getElementById("dob").value

    if (validate_email(email) == false){
        alert("Enter a valid email address")
        document.getElementById('regPassword').innerHTML=""
        document.getElementById('cPassword').innerHTML=""
        return
    }

    if(validatePassword(password) == false){
        alert("Your password must have more than 6 characters!")
        document.getElementById('regPassword').innerHTML=""
        document.getElementById('cPassword').innerHTML=""
        return
    }

    if(passwordMatch(password,cpassword) == false){
        alert("Both passwords don't match!")
        document.getElementById('regPassword').innerHTML=""
        document.getElementById('cPassword').innerHTML=""
        return
    }

    if(validate_dob(dob) == false){
        alert("You are too young to be on this website! Come back when you're older!")
        document.getElementById('regPassword').innerHTML=""
        document.getElementById('cPassword').innerHTML=""
        return
    }

    //update database---------------------------------------------------------------------------------------------
    createUserWithEmailAndPassword(auth,email,password)
    .then(function(userCredential){
        const user = userCredential.user

        const userRef = doc(db, "users");

        setDoc(userRef,email,{
            userid: user.uid,
            username: username,
            email: email,
            dob: new Date(dob) ,

            joined_events:[],
            created_events:[],

            created_drinks:[],
            will_drink:[],
            will_not_drink:[],
            have_drank:[],
        })
    
        alert("Account has been created!")
        window.location.assign("login.html")
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

function validate_dob(date){
    let birth = new Date(date)
    let byear = birth.getFullYear()
    let bmonth  = birth.getMonth()
    let bday = birth.getDate()

    let current = new Date()
    let cyear = current.getFullYear()
    let cmonth = current.getMonth()
    let cday = current.getDate()

    let age = 0 

    if (cmonth < bmonth){
        age = age = cyear - byear - 1
    }
    else if((cmonth >= bmonth && cday >= bday) ||(cmonth > bmonth)){
        age =  age = cyear - byear
    }

    if(age < 18){
        return false
    }
    return true
}


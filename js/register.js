// Import the functions you need from the SDKs you need
import { initializeApp }  from "https://www.gstatic.com/firebasejs/10.5.0/firebase-app.js";
import { getAuth, onAuthStateChanged, signInWithEmailAndPassword, createUserWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.5.0/firebase-auth.js";
import { getFirestore, collection, setDoc, doc, addDoc, getDoc } from "https://www.gstatic.com/firebasejs/10.5.0/firebase-firestore.js";
import { firebaseConfig } from "/js/config.js"
import { emailExists } from "/js/users.js"

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
        document.getElementById('regEmail').value=""
    }
    else if(validatePassword(password) == false){
        alert("Your password must have more than 6 characters!")
        document.getElementById('regPassword').value=""
        document.getElementById('cPassword').value=""
    }

    else if(passwordMatch(password,cpassword) == false){
        alert("Both passwords don't match!")
        document.getElementById('regPassword').value=""
        document.getElementById('cPassword').value=""
    }

    else if(validate_dob(dob) == false){
        alert("You are too young to be on this website! Come back when you're older!")
        document.getElementById('regPassword').value=""
        document.getElementById('cPassword').value=""
    }
    else if(await emailExists(email)){
        alert("This email is already in use!")
        document.getElementById('regEmail').value=""
    } else {
        createUserWithEmailAndPassword(auth,email,password)
        .then(async function(userCredential){
            const user = userCredential.user

            const userRef = doc(db, "users", email);

            setDoc(userRef,{
                userid: user.uid,
                username: username.toLowerCase(),
                email: email,
                dob: new Date(dob) ,

                joined_events:[],
                created_events:[],

                created_drinks:[],
                will_drink:[],
                will_not_drink:[],
                friends:[],
            })
        
            alert("Account has been created!")
            // const docSnap = await getDoc(userRef);
            const checkData = setTimeout(() => {
                getDoc(userRef).then((doc) => {
                    if (doc.exists()) {
                        console.log("Document data:", doc.data());
                        clearTimeout(checkData);
                        window.location.assign("login.html")
                    } else {
                        // doc.data() will be undefined in this case
                        console.log("No such document!");
                    }
                }).catch((error) => {
                    console.log("Error getting document:", error);
                });
            }, 1000);
            
        })

        .catch(function(error){
            const errorCode = error.code;
            const errorMessage = error.message;
            console.log(errorMessage)
        })
    }
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
        age = cyear - byear - 1
    }
    else if((cmonth >= bmonth && cday >= bday) ||(cmonth > bmonth)){
        age = cyear - byear
    }

    if(age < 18){
        return false
    }
    return true
}



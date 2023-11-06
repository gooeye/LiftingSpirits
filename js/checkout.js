// Import the functions you need from the SDKs you need
import { initializeApp }  from "https://www.gstatic.com/firebasejs/10.5.0/firebase-app.js";
import { getFirestore,collection, setDoc, doc, getDoc, query, where, getDocs} from "https://www.gstatic.com/firebasejs/10.5.0/firebase-firestore.js";
import { firebaseConfig } from "/js/config.js"

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

//get users cart and add prices
export async function getPriceCart(){
  const order = (JSON.parse(sessionStorage.getItem('order'))).cart
  let price_cart = []
  for(let item of order){
    const q = query(collection(db, "inventory"), where("name", "==", item.name));
    const querySnapshot = await getDocs(q)
    querySnapshot.forEach(item_price=>{
      var toAdd = {
        name: item.name,
        qty: item.qty,
        price: (item_price.data()).price
      }
      price_cart.push(toAdd)
    })
  }
  return price_cart
}

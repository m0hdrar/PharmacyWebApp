import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";

const firebaseConfig = {
  apiKey: "AIzaSyBcSeCdC1BuGwZ83PZmiWtINrc5_cEUUTY",
  authDomain: "realtime-database-6131b.firebaseapp.com",
  databaseURL:
    "https://realtime-database-6131b-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "realtime-database-6131b",
  storageBucket: "realtime-database-6131b.appspot.com",
  messagingSenderId: "739374537647",
  appId: "1:739374537647:web:df1e9212ddcae344d16d5a",
};

const app = initializeApp(firebaseConfig);
import {
  getDatabase,
  ref,
  set,
  get,
  child,
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-database.js";
const db = getDatabase(app);

let saveBtn = document.getElementById("save-btn");
let expiry = document.getElementById("medExpiryDate");
let amount = document.getElementById("medAmount");
let name = document.getElementById("medName");
let id = document.getElementById("medId");
let searchBtn = document.getElementById("search-btn");
let searchResult = document.getElementById("search-result");
function addData() {
  set(ref(db, "med/" + id.value), {
    medName: name.value,
    medAmount: amount.value,
    medExpiryDate: expiry.value,
  });
  clearInputFieldEl(expiry);
  clearInputFieldEl(amount);
  clearInputFieldEl(name);
  clearInputFieldEl(id);
}
function searchData() {
  const medRef = ref(db);

  get(child(medRef, "med/" + searchId.value))
    .then((snapshot) => {
      if (snapshot.exists()) {
        searchResult.innerHTML = `<p> name:  ${snapshot.val().medName} </p>`;
        searchResult.innerHTML+= `<p> amount:  ${
          snapshot.val().medAmount
        } </p>`;
        searchResult.innerHTML += `<p> expiryDate:  ${
          snapshot.val().medExpiryDate
        } </p>`;
      } else {
        searchResult.innerHTML = `<p> No data available </p>`;
      }
    })
    .catch((error) => {
      alert(error.message);
    });
}
saveBtn.addEventListener("click", addData);
searchBtn.addEventListener("click", searchData);
console.log("firebase.js loaded");
function clearInputFieldEl(inputFieldEl) {
  inputFieldEl.value = "";
}

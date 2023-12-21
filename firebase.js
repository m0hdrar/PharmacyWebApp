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
  update,
  remove,
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-database.js";
const db = getDatabase(app);

let saveBtn = document.getElementById("save-btn");
let expiry = document.getElementById("medExpiryDate");
let amount = document.getElementById("medAmount");
let comrName = document.getElementById("comName");
let id = document.getElementById("medId");
let scintificName = document.getElementById("sinName");
let companName = document.getElementById("companyName");
let formula = document.getElementById("formulation");
let badge = document.getElementById("bdgId");
let price = document.getElementById("medPrice");
let searchName = document.getElementById("searchName");
let searchBtn = document.getElementById("search-btn");
let searchResult = document.getElementById("search-result");
let searchBtnName = document.getElementById("search-btnName");
let searchResultName = document.getElementById("search-resultName");
let updateBtn = document.getElementById("update-btn");
let removeBtn = document.getElementById("remove-btn");
function addData() {
  set(ref(db, "med/" + id.value), {
    comName: comrName.value,
    medAmount: amount.value,
    medExpiryDate: expiry.value,
    sinName: scintificName.value,
    companyName: companName.value,
    formulation: formula.value,
    bdgId: badge.value,
    medprice: price.value,
    totalPrice: price.value * amount.value,
  });
  clearInputFieldEl(expiry);
  clearInputFieldEl(amount);
  clearInputFieldEl(comrName);
  clearInputFieldEl(id);
  clearInputFieldEl(scintificName);
  clearInputFieldEl(companName);
  clearInputFieldEl(formula);
  clearInputFieldEl(badge);
  clearInputFieldEl(price);
}
function searchData() {
  const medRef = ref(db);
  clearInputFieldEl(searchResult);
  get(child(medRef, "med/" + searchId.value))
    .then((snapshot) => {
      if (snapshot.exists()) {
        searchResult.innerHTML = `<p> commercial name:  ${snapshot.val().comName} </p>`;
        searchResult.innerHTML += `<p> amount:  ${
          snapshot.val().medAmount
        } </p>`;
        searchResult.innerHTML += `<p> expiryDate:  ${
          snapshot.val().medExpiryDate
        } </p>`;
        searchResult.innerHTML += `<p> sinName:  ${
          snapshot.val().sinName
        } </p>`;
        searchResult.innerHTML += `<p> companyName:  ${
          snapshot.val().companyName
        } </p>`;
        searchResult.innerHTML += `<p> formulation:  ${
          snapshot.val().formulation
        } </p>`;
        searchResult.innerHTML += `<p> bdgId:  ${snapshot.val().bdgId} </p>`;
        searchResult.innerHTML += `<p> medprice:  ${
          snapshot.val().medprice
        } </p>`;
        searchResult.innerHTML += `<p> totalPrice:  ${
          snapshot.val().totalPrice
        } </p>`;
      } else {
        searchResult.innerHTML = `<p>medicine with given Id is not found</p>`;
      }
    })
    .catch((error) => {
      alert(error.message);
    });
}

function searchDataName() {
  const medRef = ref(db, "med");

  get(medRef).then((snapshot) => {
    if (snapshot.exists()) {
      const allMeds = snapshot.val();
      const medId = Object.keys(allMeds).find(
        (id) => allMeds[id].comName === searchName.value
      );

      if (medId) {
        const med = allMeds[medId];
        //searchResultName.innerHTML = `<p> commercial name:  ${med.comName} </p>`;
        searchResultName.innerHTML = `<p> amount:  ${med.medAmount} </p>`;
        searchResultName.innerHTML += `<p> expiryDate:  ${med.medExpiryDate} </p>`;
        searchResultName.innerHTML += `<p> scintific Name:  ${med.sinName} </p>`;
        searchResultName.innerHTML += `<p> company Name:  ${med.companyName} </p>`;
        searchResultName.innerHTML += `<p> formulation:  ${med.formulation} </p>`;
        searchResultName.innerHTML += `<p> Badge:  ${med.bdgId} </p>`;
        searchResultName.innerHTML += `<p> price:  ${med.medprice} </p>`;
        searchResultName.innerHTML += `<p> totalPrice:  ${med.totalPrice} </p>`;
        // searchResultName.innerHTML += `<p> id:  ${med.medId} </p>`;
      } else {
        searchResultName.innerHTML += `<p>medicine with given name is not found</p>`;
      }
    }
  });
  // clearInputFieldEl(comName);
}

function clearInputFieldEl(inputFieldEl) {
  inputFieldEl.value = "";
}

function updateData() {
  update(ref(db, "med/" + id.value), {
    //medName: name.value,
    medAmount: amount.value,
    medExpiryDate: expiry.value,
    medprice: price.value,
    totalPrice: price.value * amount.value,
    bdgId: badge.value,
    comName: comrName.value,
    companyName: companName.value,
  })
    .then(() => {
      alert("Data updated successfully");
    })
    .catch((error) => {
      alert(error.message);
    });
  clearInputFieldEl(expiry);
  clearInputFieldEl(amount);
  clearInputFieldEl(comrName);
  clearInputFieldEl(id);
  clearInputFieldEl(scintificName);
  clearInputFieldEl(companName);
  clearInputFieldEl(formula);
  clearInputFieldEl(badge);
  clearInputFieldEl(price);
}
function removeData() {
  remove(ref(db, "med/" + id.value))
    .then(() => {
      alert("Data removed successfully");
    })
    .catch((error) => {
      alert(error.message);
    });

  clearInputFieldEl(id);
}

saveBtn.addEventListener("click", addData);
searchBtn.addEventListener("click", searchData);
searchBtnName.addEventListener("click", searchDataName);
updateBtn.addEventListener("click", updateData);
removeBtn.addEventListener("click", removeData);

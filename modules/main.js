// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.16.0/firebase-app.js";
import {
  getAuth,
  createUserWithEmailAndPassword,
//   signInWithEmailAndPassword,
} from "https://www.gstatic.com/firebasejs/9.16.0/firebase-auth.js";
import {
  getDatabase,
  set,
  ref,
} from "https://www.gstatic.com/firebasejs/9.16.0/firebase-database.js";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

import { firebaseConfig } from "./firebase.js";
const app = initializeApp(firebaseConfig);
const database = getDatabase(app);
const auth = getAuth();
// console.log(database);
// console.log(app);


// console.log(app)

const registerBtn = document.querySelector("#registerBtn");

const register_new_user = (event) => {
  event.preventDefault();

    //apsirasom laukus
  const email = document.querySelector("#email-input").value;
  const passwd = document.querySelector("#pass-input").value;

  //funkcija kuri sukuria nauja user'i ir ikelia ji į database
  createUserWithEmailAndPassword(auth, email, passwd)
    .then((userCredential) => {
      const user = userCredential.user;
      console.log("new user created");

      //funkcija kuri aprašo kokia informacija bus įkelta į database
            //
      const loginTime = new Date();
        //set() - įrašo, perrašo nurodytoje vietoje esančius duomenis
        //ref() - arba Reference, aprašome kur bus įrašomi duomenys
      set(ref(database, "users/" + user.uid), {
        email: email,
        passwd: passwd,
        role: "simple_user",
        timestamp: `${loginTime}`,
      });
    })
    .catch((error) => {
      console.log(error);
    });
};
registerBtn.addEventListener("click", register_new_user);

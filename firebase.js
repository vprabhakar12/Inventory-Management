// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore"

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDt8KY2eLJFce1SRJejGHVrzZ2CAfpgCaE",
  authDomain: "inventor-management-64a70.firebaseapp.com",
  projectId: "inventor-management-64a70",
  storageBucket: "inventor-management-64a70.appspot.com",
  messagingSenderId: "115896118615",
  appId: "1:115896118615:web:f0917ae60aac4d774ca212",
  measurementId: "G-E3LJ007K4S"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const firestore = getFirestore(app);

export {firestore}
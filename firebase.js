// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics, isSupported } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
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

// Conditionally initialize analytics only if it's supported and we're in a browser environment
let analytics;
if (typeof window !== "undefined") {
  isSupported().then((supported) => {
    if (supported) {
      analytics = getAnalytics(app);
    }
  });
}

const firestore = getFirestore(app);

export { firestore };

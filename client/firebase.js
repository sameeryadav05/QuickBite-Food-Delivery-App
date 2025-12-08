// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from 'firebase/auth'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCv1Um_kyAIOi2Wo6BARTQ94dvM7zfaEjA",
  authDomain: "quickbite-b89bc.firebaseapp.com",
  projectId: "quickbite-b89bc",
  storageBucket: "quickbite-b89bc.firebasestorage.app",
  messagingSenderId: "986986065738",
  appId: "1:986986065738:web:d265b825694242df559bb3"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const auth = getAuth(app)

export {app,auth}
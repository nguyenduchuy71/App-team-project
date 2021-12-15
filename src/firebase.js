import firebase from "firebase";
const firebaseConfig = {
  apiKey: "AIzaSyD97Z3fGoUDuxQOfuifxPEv2xiG0tXYILU",
  authDomain: "senior-year-project-690c5.firebaseapp.com",
  projectId: "senior-year-project-690c5",
  storageBucket: "senior-year-project-690c5.appspot.com",
  messagingSenderId: "884418639987",
  appId: "1:884418639987:web:5e7e2cd4f6133d02ee1206",
  measurementId: "G-8HPKMDZ85P",
};
const firebaseApp = firebase.initializeApp(firebaseConfig);
const db = firebaseApp.firestore();
const auth = firebase.auth();
const provider = new firebase.auth.GoogleAuthProvider();

export { auth, provider, db };

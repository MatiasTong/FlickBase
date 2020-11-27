import firebase from "firebase/app";
import "firebase/database"


// Your web app's Firebase configuration
  // For Firebase JS SDK v7.20.0 and later, measurementId is optional
    let firebaseConfig = {
    apiKey: "AIzaSyCqLxTx1RMH9VPrMHCh4uxv3JUQERGRtbo",
    authDomain: "flickbase-9aff8.firebaseapp.com",
    databaseURL: "https://flickbase-9aff8.firebaseio.com",
    projectId: "flickbase-9aff8",
    storageBucket: "flickbase-9aff8.appspot.com",
    messagingSenderId: "751744938544",
    appId: "1:751744938544:web:498247db386b99719bb3f5"
  };
  // Initialize Firebase
  const fireDB = firebase.initializeApp(firebaseConfig);
//   firebase.analytics();
export default fireDB.database();
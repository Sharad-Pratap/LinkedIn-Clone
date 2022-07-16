// import firebase from 'firebase/app';
// import 'firebase/auth';
// import { getFirestore } from "firebase/firestore";


// const firebaseConfig = {
//     apiKey: "AIzaSyDS1Qbse-BpT_ZJ_Ed0R6aafqALZzt8pFA",
//     authDomain: "linkedin-clone-e1969.firebaseapp.com",
//     projectId: "linkedin-clone-e1969",
//     storageBucket: "linkedin-clone-e1969.appspot.com",
//     messagingSenderId: "80180029877",
//     appId: "1:80180029877:web:bd1dbc44d847082ba6d1fc"
// };

// const firebaseApp = firebase.initializeApp(firebaseConfig);
// // const db = firebaseApp.firestore();
// const db = getFirestore(firebaseApp);
// const auth = firebase.auth();
// const provider = new firebase.auth.GoogleAuthProvider();
// const storage = firebase.storage();
// export { auth, provider, storage };
// export default db;

import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore/lite"
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
    apiKey: "AIzaSyDS1Qbse-BpT_ZJ_Ed0R6aafqALZzt8pFA",
    authDomain: "linkedin-clone-e1969.firebaseapp.com",
    projectId: "linkedin-clone-e1969",
    storageBucket: "linkedin-clone-e1969.appspot.com",
    messagingSenderId: "80180029877",
    appId: "1:80180029877:web:bd1dbc44d847082ba6d1fc"
};

const firebaseApp = initializeApp(firebaseConfig);
const db = getFirestore(firebaseApp);
const auth = getAuth(firebaseApp);
const storage = getStorage(firebaseApp);

export default auth;
export { storage, db };




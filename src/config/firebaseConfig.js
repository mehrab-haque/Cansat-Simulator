import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyC_suyCZMm_XeBlkj4zAmzIGR6WamxjDw8",
    authDomain: "spacelab-b5c8d.firebaseapp.com",
    databaseURL: "https://spacelab-b5c8d-default-rtdb.firebaseio.com",
    projectId: "spacelab-b5c8d",
    storageBucket: "spacelab-b5c8d.appspot.com",
    messagingSenderId: "1084788491776",
    appId: "1:1084788491776:web:de8103275f3eb5257c3ae5"
};

const app = initializeApp(firebaseConfig);
const database = getDatabase(app);
const db = getFirestore(app);

export {app,database,db}
import { initializeApp } from "firebase/app"
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore"
import { getStorage } from "firebase/storage";
const firebaseApp = initializeApp({
    apiKey: 'AIzaSyAGjUpdHb_ZkVcOkA-51UA_3QWVXgBB7M0',
    authDomain: 'instagreen-1e998.firebaseapp.com',
    databaseURL: 'https://instagreen-1e998-default-rtdb.firebaseio.com',
    projectId: 'instagreen-1e998',
    storageBucket: 'instagreen-1e998.appspot.com',
    messagingSenderId: '1000476552134',
    appId: '1:1000476552134:web:ee34c55b35530f412fa0c7',
    measurementId: 'G-ZZEVGZF5YF',
});
const db = getFirestore(firebaseApp);
const storage = getStorage(firebaseApp);
const auth = getAuth(firebaseApp);
export { db, storage, auth };
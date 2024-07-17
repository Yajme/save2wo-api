// Import the functions you need from the SDKs you need

import { initializeApp } from "firebase/app";
import { Firestore,doc,setDoc,collection,getDocs, getFirestore, query,where } from "firebase/firestore";
import dotenv from 'dotenv';
//import history from './thresholds.json'  assert { type: 'json' };



dotenv.config();
// TODO: Add SDKs for Firebase products that you want to use

// https://firebase.google.com/docs/web/setup#available-libraries


// Your web app's Firebase configuration

const firebaseConfig = {
  apiKey: process.env.FIREBASE_API_KEY,
  authDomain: process.env.FIREBASE_AUTH_DOMAIN,
  projectId: process.env.FIREBASE_PROJECT_ID,
  storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.FIREBASE_APP_ID
};


// Initialize Firebase


let app;
let firestoreDb;
const initializeFirebase = ()=>{
    try{
        app = initializeApp(firebaseConfig);
        firestoreDb = getFirestore(app);
        return app;
    }catch(err){
        console.log(`${err}`);
    }
    
}
const getData = async(collectionName)=>{
    try{
        const collectionRef = collection(firestoreDb,collectionName);
        const finalData = [];

        const docSnap = await getDocs(collectionRef);

        docSnap.forEach((doc)=>{
            finalData.push(doc.data());
        });

        return finalData;

    }catch(error){
        console.log(`${error}`);
    }
};
const getDataByParam = async(collectionName,Param,key)=>{
    try{
        const collectionRef = collection(firestoreDb,collectionName);
        const finalData = [];
        const q = query(collectionRef,
            where(key,"==",Param)
        );
        
        const docSnap = await getDocs(q);
        
        docSnap.forEach((doc)=>{
            finalData.push(doc.data());
            
        });

        return finalData;

    }catch(error){
        console.log(`${error}`);
    }
};
const uploadData = async()=>{
    try{
        for (const key in history) {
            if (history.hasOwnProperty(key)) {
              const document = doc(firestoreDb,"threshold",key);
              let dataUpload = await setDoc(document,history[key]);
            }
          }
    }catch(error){
        console.log(error);
    }
}
const getFirebaseApp = () => app;

export default {initializeFirebase,getFirebaseApp,getData,getDataByParam};

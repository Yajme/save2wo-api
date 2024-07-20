// Import the functions you need from the SDKs you need

import { initializeApp } from "firebase/app";
import { Firestore,doc,setDoc,collection,getDocs, getFirestore, query,where, orderBy, limitToLast, AggregateField,sum,getAggregateFromServer, count} from "firebase/firestore";
import dotenv from 'dotenv';

//import history from './contamination.json'  assert { type: 'json' };



dotenv.config();



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
const getDataByParam = async(collectionName,Param,key,Logic)=>{
    try{
        const collectionRef = collection(firestoreDb,collectionName);
        const finalData = [];
        const q = query(collectionRef,
            where(key,Logic,Param)
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

const getDataByRange = async(collectionName,key,param_1,param_2)=>{
    try{
        const collectionRef = collection(firestoreDb,collectionName);
        const finalData = [];
        const q = query(collectionRef,
            where(key,">=",new Date(param_1)),
            where(key,"<=",new Date(param_2))
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

const getFilteredData = async(collectionName,Param,key,Logic,Limit,order)=>{
    try{
        
        const collectionRef = collection(firestoreDb,collectionName);
        const finalData = [];
        let q;
        if(Limit != 0){
             q = query(collectionRef,
                where(key,Logic,Param),
                orderBy(key,order),
                limitToLast(Limit)
            );
            console.log(key,Logic,Param);
        }else{
             q = query(collectionRef,
                where(key,Logic,Param),
                orderBy(key,order)
            );
            console.log(key,Logic,Param);
        }
        
        
        const docSnap = await getDocs(q);
        
        docSnap.forEach((doc)=>{
            finalData.push(doc.data());
            
        });

        return finalData;

    }catch(error){
        console.log(`${error}`);
        throw error;
    }
}
const getSum = async(collectionName,Param,key)=>{
    try{
        const collectionRef = collection(firestoreDb,collectionName);
        let Where;
        if(typeof Param === "object"){
            Where = [];
            Param.forEach((query)=>{
                console.log(`${query.key} ${query.param}`)
                Where.push(
                    where(query.key,query.logic,query.param)
                );
            })
        }else{
            Where = [
                where(key,"==",Param)
            ]
        }
        const q = query(
            collectionRef,
            ...Where
        )
        const snapshot = await getAggregateFromServer(
            q,
            {
                total: sum(key),
                totalRecord : count(key)
            },
        );

        return snapshot.data();
    }catch(error){
        throw error;
    }
}
const uploadData = async()=>{
    try{
        /*
        for (const key in history) {
            if (history.hasOwnProperty(key)) {
              const document = doc(firestoreDb,"threshold",key);
              let dataUpload = await setDoc(document,history[key]);
            }
          }
            */

          for (const key in history) {
            if (history.hasOwnProperty(key)) {
              history[key].timestamp = new Date(history[key].timestamp);
              const document = doc(firestoreDb,"contamination",key);
              let dataUpload = await setDoc(document,history[key]);
            }
          }
    }catch(error){
        console.log(error);
    }
}
const getFirebaseApp = () => app;

export default {
    initializeFirebase,
    getFirebaseApp,
    getData,
    getDataByParam,
    getDataByRange,
    getFilteredData,
    getSum
};

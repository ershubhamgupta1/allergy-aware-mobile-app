import { initializeApp } from 'firebase/app';


import { initializeAuth, getReactNativePersistence, browserLocalPersistence } from 'firebase/auth';
import ReactNativeAsyncStorage from '@react-native-async-storage/async-storage';
import { Platform } from 'react-native';
import { getFirestore } from "firebase/firestore";


const firebaseConfig = {
  apiKey: 'AIzaSyBXLMLY4X7hJX_OCe6Zq5jpeDnBYIWfRH0',
  authDomain: 'your-auth-domain-b1234.firebaseapp.com',
  databaseURL: 'https://your-database-name.firebaseio.com',
  projectId: 'react-native-hotel-f182c',
  storageBucket: 'react-native-hotel-f182c.appspot.com',
  messagingSenderId: '12345-insert-yourse',
  appId: '1:1067383523268:ios:cef646c618457b28910691',
};

const app = initializeApp(firebaseConfig)
const auth = initializeAuth(app, {
    persistence: Platform.OS === 'web' ? browserLocalPersistence : getReactNativePersistence(ReactNativeAsyncStorage)
  });

const db = getFirestore(app);


// const uriToBlob = (uri) => {

//     return new Promise((resolve, reject) => {

//       const xhr = new XMLHttpRequest();

//       xhr.onload = function() {
//         // return the blob
//         resolve(xhr.response);
//       };
      
//       xhr.onerror = function() {
//         // something went wrong
//         reject(new Error('uriToBlob failed'));
//       };

//       // this helps us get a blob
//       xhr.responseType = 'blob';

//       xhr.open('GET', uri, true);
//       xhr.send(null);

//     });

// }

// const uploadToFirebase = (blob) => {

//     return new Promise((resolve, reject)=>{
//         console.log('firebase=========', firebase);

//       var storageRef = firebase.storage().ref();

//       storageRef.child('uploads/photo.jpg').put(blob, {
//         contentType: 'image/jpeg'
//       }).then((snapshot)=>{

//         blob.close();

//         resolve(snapshot);

//       }).catch((error)=>{

//         reject(error);

//       });

//     });


// }   

export { app, auth, db };

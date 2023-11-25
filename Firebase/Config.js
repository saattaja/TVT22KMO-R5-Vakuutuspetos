import {initializeApp} from 'firebase/app'
import { ReactNativeAsyncStorage } from '@react-native-async-storage/async-storage'
import {getAuth, initializeAuth, getReactNativePersistence} from 'firebase/auth'
import {getFirestore, collection, doc, onSnapshot, query, orderBy, where, serverTimestamp, getDocs, getDoc} from 'firebase/firestore'

const firebaseConfig = {
   apiKey: process.env.EXPO_PUBLIC_API_KEY,
    authDomain: process.env.EXPO_PUBLIC_AUTH,
    projectId: process.env.EXPO_PUBLIC_PROJECT_ID,
    storageBucket: process.env.EXPO_PUBLIC_STORAGE_BUCKET,
    messagingSenderId: process.env.EXPO_PUBLIC_MESSAGING_SENDER_ID,
    appId: process.env.EXPO_PUBLIC_APP_ID
  };
  
  // Initialize Firebase
 const app = initializeApp(firebaseConfig);

 const firestore = getFirestore();
 const USERS = "users";
 const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(ReactNativeAsyncStorage)
 })

 export{
    firestore,
    USERS,
    collection,
    doc,
    onSnapshot,
    query,
    orderBy,
    where,
    serverTimestamp,
    auth,
    getDocs,
    getDoc
 }
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyDyM64XgDCEVhDKxWE7Nuc8xG8om2WL67k",
  authDomain: "climates-48696-8553e.firebaseapp.com",
  projectId: "climates-48696-8553e",
  storageBucket: "climates-48696-8553e.appspot.com", // ✅ đúng
  messagingSenderId: "921958937260",
  appId: "1:921958937260:web:883d3c0841c99695b32509",
  measurementId: "G-VZ6CWQHMCD"
};// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const storage = getStorage(app);
export const auth = getAuth(app);

export default app;

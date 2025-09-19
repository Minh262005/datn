// src/firebase/index.js
import { initializeApp, getApps, getApp } from "firebase/app";
import { getStorage } from "firebase/storage";
import { getAuth } from "firebase/auth";

// ⚠️ Config Firebase project của bạn
const firebaseConfig = {
  apiKey: "AIzaSyCo4XNHZcVkRkw_UECu7YkPysCckfKf2xw",
  authDomain: "datn-1c5ef.firebaseapp.com",
  projectId: "datn-1c5ef",
  storageBucket: "datn-1c5ef.firebasestorage.app",
  messagingSenderId: "514815977913",
  appId: "1:514815977913:web:5b4115cd64120fcd862e68",
  measurementId: "G-9BJ76VWYNT",
};

// 🔹 Chỉ khởi tạo 1 lần duy nhất
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();

// Export các service
const storage = getStorage(app);
const auth = getAuth(app);

export { storage, auth };
export default app;

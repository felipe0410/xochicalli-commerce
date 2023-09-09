import { FirebaseApp, initializeApp } from "firebase/app";
import { Analytics, getAnalytics } from "firebase/analytics";
import { Auth, getAuth, User } from "firebase/auth";
import { Firestore, getFirestore } from "firebase/firestore";
import { FirebaseStorage, getStorage } from 'firebase/storage'

export const firebaseConfig = {
  apiKey: import.meta?.env?.VITE_FIREBASE_APIKEY ?? "AIzaSyBQxvYvalPyyVzzYu6ey9XrHllO1XHJU5I",
  authDomain: import.meta.env.VITE_FIREBASE_AUTHDOMAIN ?? "xochicalli-commerce.firebaseapp.com",
  projectId: import.meta.env.VITE_FIREBASE_PROJECTID ?? "xochicalli-commerce",
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGEBUCKET ?? "xochicalli-commerce.appspot.com",
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGINGSENDERID ?? "1065447557124",
  appId: import.meta.env.VITE_FIREBASE_APPID ?? "1:1065447557124:web:062473512037026f214d51",
  measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENTID ?? "G-0NCXM28373",
};

export const app: FirebaseApp = initializeApp(firebaseConfig);
export const analytics: Analytics = getAnalytics(app);
export const auth: Auth = getAuth(app);
export const currentUser: User | null = auth?.currentUser
export const db: Firestore = getFirestore(app);
export const storage: FirebaseStorage = getStorage(app);
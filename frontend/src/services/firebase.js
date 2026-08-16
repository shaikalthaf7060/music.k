import { initializeApp, getApps, getApp } from "firebase/app";
import { 
  getAuth, 
  GoogleAuthProvider, 
  signInWithPopup, 
  signInWithEmailAndPassword, 
  createUserWithEmailAndPassword, 
  signOut, 
  updateProfile, 
  onAuthStateChanged 
} from "firebase/auth";

// Live Firebase configuration for musick-a7927
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY || "AIzaSyDfk2hLoSBT3qo5hXggNA3aQTMeS0miv5Y",
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN || "musick-a7927.firebaseapp.com",
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID || "musick-a7927",
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET || "musick-a7927.firebasestorage.app",
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID || "774383502717",
  appId: import.meta.env.VITE_FIREBASE_APP_ID || "1:774383502717:web:ce4d8dc36383e9922ff814",
  measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID || "G-6SKKY9RJ60"
};

const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();

export const isFirebaseConfigured = () => true;

// 1-Click Google Sign-In
export const signInWithGoogle = async () => {
  const res = await signInWithPopup(auth, googleProvider);
  return res.user;
};

// Email & Password Registration
export const registerWithEmail = async (name, email, password) => {
  const userCredential = await createUserWithEmailAndPassword(auth, email, password);
  if (name) {
    await updateProfile(userCredential.user, {
      displayName: name,
      photoURL: `https://api.dicebear.com/7.x/bottts/svg?seed=${email}`
    });
  }
  return userCredential.user;
};

// Email & Password Login
export const loginWithEmail = async (email, password) => {
  const res = await signInWithEmailAndPassword(auth, email, password);
  return res.user;
};

// Sign Out
export const logoutFirebase = async () => {
  await signOut(auth);
};

export { onAuthStateChanged };

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

// Read from Vite environment variables (.env) or use defaults
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY || "AIzaSyDummyKeyForMusicKSpotifyApp",
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN || "music-k-red.firebaseapp.com",
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID || "music-k-red",
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET || "music-k-red.appspot.com",
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID || "1234567890",
  appId: import.meta.env.VITE_FIREBASE_APP_ID || "1:1234567890:web:abcdef123456"
};

const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();

export const isFirebaseConfigured = () => {
  return import.meta.env.VITE_FIREBASE_API_KEY && 
         import.meta.env.VITE_FIREBASE_API_KEY !== "AIzaSyDummyKeyForMusicKSpotifyApp";
};

// 1-Click Google Sign-In
export const signInWithGoogle = async () => {
  if (!isFirebaseConfigured()) {
    // If user hasn't added their custom Firebase keys yet, return demo VIP user
    return {
      uid: `google_user_${Date.now()}`,
      displayName: "Google Red Listener",
      email: "google.user@musick.stream",
      photoURL: "https://api.dicebear.com/7.x/bottts/svg?seed=googlered"
    };
  }
  const res = await signInWithPopup(auth, googleProvider);
  return res.user;
};

// Email & Password Registration
export const registerWithEmail = async (name, email, password) => {
  if (!isFirebaseConfigured()) {
    return {
      uid: `email_user_${Date.now()}`,
      displayName: name,
      email: email,
      photoURL: `https://api.dicebear.com/7.x/bottts/svg?seed=${email}`
    };
  }
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
  if (!isFirebaseConfigured()) {
    return {
      uid: `email_user_${Date.now()}`,
      displayName: email.split('@')[0],
      email: email,
      photoURL: `https://api.dicebear.com/7.x/bottts/svg?seed=${email}`
    };
  }
  const res = await signInWithEmailAndPassword(auth, email, password);
  return res.user;
};

// Sign Out
export const logoutFirebase = async () => {
  if (isFirebaseConfigured()) {
    await signOut(auth);
  }
};

export { onAuthStateChanged };

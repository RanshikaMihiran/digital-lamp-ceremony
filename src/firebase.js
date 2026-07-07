import { initializeApp } from "firebase/app";
import { getDatabase, ref, onValue, set, get } from "firebase/database";

// Your actual credentials from the screenshot:
const firebaseConfig = {
  apiKey: "AIzaSyBFdczb01JlIyUJFvXiT59whgN5aTUaRyY",
  authDomain: "digital-lamp-ceremony.firebaseapp.com",
  databaseURL: "https://digital-lamp-ceremony-default-rtdb.firebaseio.com",
  projectId: "digital-lamp-ceremony",
  storageBucket: "digital-lamp-ceremony.firebasestorage.app",
  messagingSenderId: "461651986430",
  appId: "1:461651986430:web:87f0b1bca164940bab2d2f"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getDatabase(app);

// Helper function to initialize lamps if they don't exist
export const initializeLamps = async () => {
  const lampsRef = ref(db, 'lamps');
  const snapshot = await get(lampsRef);
  if (!snapshot.exists()) {
    set(lampsRef, [true, false, false, false, false]); // Lamp 1 ON by default
  }
};
import { initializeApp } from "firebase/app";
import { getFirestore, doc, getDoc, onSnapshot } from "firebase/firestore";  // Firestore for storing user profiles
import { getAuth, onAuthStateChanged } from "firebase/auth";  // Firebase Auth for user profiles
import { getStorage } from "firebase/storage";  // Firebase Storage for file uploads

// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBVRT-uPOv5wqcCJXXGp4mrunyXqRggLS8",
  authDomain: "user-data-67ad3.firebaseapp.com",
  projectId: "user-data-67ad3",
  storageBucket: "user-data-67ad3.appspot.com",
  messagingSenderId: "180470213156",
  appId: "1:180470213156:web:5171829d3d323ef51d86b1",
  measurementId: "G-QTM1FQ2F17"
};

// Initialize Firebase app
const app = initializeApp(firebaseConfig);
const firestore = getFirestore(app);  // Firestore initialization
const auth = getAuth(app);  // Firebase Auth initialization
const storage = getStorage(app);  // Firebase Storage initialization

// Function to fetch user profile from Firestore (non-real-time)
export const fetchUserProfile = async (uid) => {
  const userDocRef = doc(firestore, "User", uid);  // Fetch document with uid as document ID
  const userDocSnap = await getDoc(userDocRef);

  if (userDocSnap.exists()) {
    return userDocSnap.data();  // Return Firestore data (e.g., username, email)
  } else {
    throw new Error("User not found in Firestore!");
  }
};

// Function to fetch user profile from Firestore in real-time
export const fetchUserProfileRealTime = (uid, callback) => {
  const userDocRef = doc(firestore, "User", uid);  // Fetch document with uid as document ID

  // Real-time listener using onSnapshot
  const unsubscribe = onSnapshot(userDocRef, (docSnap) => {
    if (docSnap.exists()) {
      callback(docSnap.data());  // Pass Firestore data (e.g., username, email) to the callback
    } else {
      console.error("User not found in Firestore!");
    }
  }, (error) => {
    console.error("Error fetching real-time updates:", error);
  });

  // Return the unsubscribe function to stop listening when not needed
  return unsubscribe;
};

export { firestore, auth, storage };  // Added storage export
export default app;

import { initializeApp } from "firebase/app";
import { getFirestore, doc, getDoc } from "firebase/firestore";  // Firestore for storing user profiles
import { getAuth, onAuthStateChanged } from "firebase/auth";  // Firebase Auth for user profiles

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

// Function to fetch user profile from Firebase Auth and Firestore
export const fetchUserProfile = (setUserData) => {
  onAuthStateChanged(auth, async (user) => {
    if (user) {
      const userDocRef = doc(firestore, "User", user.uid);  // Correct path to Firestore
      const userDocSnap = await getDoc(userDocRef);

      if (userDocSnap.exists()) {
        const userData = userDocSnap.data();  // Get Firestore data like username
        setUserData(userData.username);  // Set the username from Firestore
      }
    }
  });
};

export { firestore, auth };
export default app;

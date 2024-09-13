import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";  // Import Firebase Authentication
const firebaseConfig = {
  apiKey: "AIzaSyBVRT-uPOv5wqcCJXXGp4mrunyXqRggLS8",
  authDomain: "user-data-67ad3.firebaseapp.com",
  projectId: "user-data-67ad3",
  storageBucket: "user-data-67ad3.appspot.com",
  messagingSenderId: "180470213156",
  appId: "1:180470213156:web:5171829d3d323ef51d86b1",
  measurementId: "G-QTM1FQ2F17"
};
// Initialize Firebase
const app = initializeApp(firebaseConfig);
const firestore = getFirestore(app);  // Initialize Firestore
const auth = getAuth(app);  // Initialize Firebase Authentication
export { firestore, auth };  // Export Firestore and Auth for use in other parts of your app
export default app;  // Export the Firebase app if needed elsewhere
// Import the functions you need from the SDKs
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSYBVRTP-qpu5w0gcJXXgJ4umrynKqRgLSg8",
  authDomain: "user-data-67ad3.firebaseapp.com",
  projectId: "user-data-67ad3",
  storageBucket: "user-data-67ad3.appspot.com",
  messagingSenderId: "184027013156",
  appId: "1:184027013156:web:5171829d3d32f3e51d86b1",
  measurementId: "G-QTM1QF2T17"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db };

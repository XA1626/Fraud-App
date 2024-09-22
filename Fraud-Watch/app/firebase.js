  import { initializeApp } from "firebase/app";
  import { getFirestore, doc, getDoc, onSnapshot } from "firebase/firestore";  
  import { getAuth, onAuthStateChanged } from "firebase/auth"; 
  import { getStorage } from "firebase/storage";  


  const firebaseConfig = {
    apiKey: "AIzaSyBVRT-uPOv5wqcCJXXGp4mrunyXqRggLS8",
    authDomain: "user-data-67ad3.firebaseapp.com",
    projectId: "user-data-67ad3",
    storageBucket: "user-data-67ad3.appspot.com",
    messagingSenderId: "180470213156",
    appId: "1:180470213156:web:5171829d3d323ef51d86b1",
    measurementId: "G-QTM1FQ2F17"
  };


  const app = initializeApp(firebaseConfig);
  const firestore = getFirestore(app);  
  const auth = getAuth(app);  
  const storage = getStorage(app);  


  export const fetchUserProfile = async (uid) => {
    const userDocRef = doc(firestore, "User", uid);  
    const userDocSnap = await getDoc(userDocRef);

    if (userDocSnap.exists()) {
      return userDocSnap.data(); 
    } else {
      throw new Error("User not found in Firestore!");
    }
  };


  export const fetchUserProfileRealTime = (uid, callback) => {
    const userDocRef = doc(firestore, "User", uid); 

  
    const unsubscribe = onSnapshot(userDocRef, (docSnap) => {
      if (docSnap.exists()) {
        callback(docSnap.data());  
      } else {
        console.error("User not found in Firestore!");
      }
    }, (error) => {
      console.error("Error fetching real-time updates:", error);
    });

    
    return unsubscribe;
  };

  export { firestore, auth, storage }; 
  export default app;

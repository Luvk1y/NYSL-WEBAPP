import { useState, useEffect } from 'react';
import { getDatabase, onValue, ref, set } from 'firebase/database';
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyD48-X4Q8yARm9PhyF39VcKYYPQPoku7bk",
  authDomain: "nysl-ubiqum-f3359.firebaseapp.com",
  projectId: "nysl-ubiqum-f3359",
  storageBucket: "nysl-ubiqum-f3359.appspot.com",
  messagingSenderId: "235503377581",
  appId: "1:235503377581:web:896145754486f88cd5fa24",
  measurementId: "G-9260BTQS04"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const database  = getDatabase(app);
//const analytics = getAnalytics(app);
 

ref(database, '/')
ref(database, '/courses')

  export const useData = (path, transform) => {
    const [data, setData] = useState();
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState();
  
    useEffect(() => {
      const dbRef = ref(database, path);
      const devMode = !process.env.NODE_ENV || process.env.NODE_ENV === 'development';
      if (devMode) { console.log(`loading ${path}`); }
      return onValue(dbRef, (snapshot) => {
        const val = snapshot.val();
        if (devMode) { console.log(val); }
        setData(transform ? transform(val) : val);
        setLoading(false);
        setError(null);
      }, (error) => {
        setData(null);
        setLoading(false);
        setError(error);
      });
    }, [path, transform]);
  
    return [data, loading, error];
  };
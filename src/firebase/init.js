import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore'

const firebaseConfig = {
    apiKey: "AIzaSyBQa88gYraeodC3DBnaCLWaMQ9s8JEDmkU",
    authDomain: "interview-project-24719.firebaseapp.com",
    projectId: "interview-project-24719",
    storageBucket: "interview-project-24719.appspot.com",
    messagingSenderId: "612631102341",
    appId: "1:612631102341:web:afe142b263b074f747baec",
    measurementId: "G-02HZHVV8PW"
};


export default firebase.initializeApp(firebaseConfig)
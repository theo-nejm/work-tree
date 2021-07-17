import firebase from 'firebase';

export const firebaseConfig = {
  apiKey: "AIzaSyD3sLdRDu2j_3tBbi3Dp_DZjxVczjdKaHg",
  authDomain: "tasks-management-b0d24.firebaseapp.com",
  databaseURL: "https://tasks-management-b0d24-default-rtdb.firebaseio.com",
  projectId: "tasks-management-b0d24",
  storageBucket: "tasks-management-b0d24.appspot.com",
  messagingSenderId: "833474544852",
  appId: "1:833474544852:web:6436f7ab89ec899efce741",
  measurementId: "G-DB1RGGJ8KL"
};

export const firebaseImpl = firebase.initializeApp(firebaseConfig);
export const firebaseDatabase = firebase.database();

import { initializeApp } from "/firebase/app";
import { getAuth, onAuthStateChanged } from "/firebase/auth";

const firebaseApp = initializeApp({
  apiKey: "AIzaSyCd0oa2R8dttBx8RGONvFyZt4NrIuP-KeI",
  authDomain: "integration-project-a9aac.firebaseapp.com",
  projectId: "integration-project-a9aac",
  storageBucket: "integration-project-a9aac.appspot.com",
  messagingSenderId: "784647084220",
  appId: "1:784647084220:web:e8258968ede7dc191358b9",
});
const auth = getAuth(firebaseApp);

onAuthStateChanged(auth, (user) => {
  if (user != null) {
    console.log("Signed in");
  } else {
    console.log("no user");
  }
});

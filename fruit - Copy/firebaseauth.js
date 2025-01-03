
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.1.0/firebase-app.js";
import {getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword} from "https://www.gstatic.com/firebasejs/11.1.0/firebase-auth.js";
import{getFirestore, setDoc, doc} from "https://www.gstatic.com/firebasejs/11.1.0/firebase-firestore.js"
  
 
  const firebaseConfig = {
    apiKey: "AIzaSyDna3y3wBU4oPsv_MrzePcn_o6_7LuYDsc",
    authDomain: "mock-e2a85.firebaseapp.com",
    projectId: "mock-e2a85",
    storageBucket: "mock-e2a85.firebasestorage.app",
    messagingSenderId: "102733724600",
    appId: "1:102733724600:web:cb6ef9498c0d84c7b6ad4d"
  };

  // Initialize Firebase
  const app = initializeApp(firebaseConfig);
 
  function showMessage(message, elementId) {
    const messageDiv = document.getElementById(elementId);
    if (messageDiv) {
        messageDiv.style.display = 'block';
        messageDiv.textContent = message;
        messageDiv.style.opacity = '1';

        // Automatically hide the message after a few seconds
        setTimeout(() => {
            messageDiv.style.opacity = '0';
            setTimeout(() => {
                messageDiv.style.display = 'none';
            }, 500); // Add a short delay to allow opacity transition
        }, 5000); // Message will show for 5 seconds
    } else {
        console.error(`Element with ID ${elementId} not found`);
    }
}



  const signUp=document.getElementById('submitSignUp');
  signUp.addEventListener('click', (event)=>{
     event.preventDefault();
     const email=document.getElementById('rEmail').value;
     const password=document.getElementById('rPassword').value;
     const firstName=document.getElementById('fName').value;
     const lastName=document.getElementById('lName').value;
 
     const auth=getAuth();
     const db=getFirestore();
 
     createUserWithEmailAndPassword(auth, email, password)
     .then((userCredential)=>{
         const user=userCredential.user;
         const userData={
             email: email,
             firstName: firstName,
             lastName:lastName
         };
         showMessage('Account Created Successfully', 'signUpMessage');
         const docRef=doc(db, "users", user.uid);
         setDoc(docRef,userData)
         .then(()=>{
             window.location.href='index.html';
         })
         .catch((error)=>{
             console.error("error writing document", error);
 
         });
     })
     .catch((error)=>{
         const errorCode=error.code;
         if(errorCode=='auth/email-already-in-use'){
             showMessage('Email Address Already Exists !!!', 'signUpMessage');
         }
         else{
             showMessage('unable to create User', 'signUpMessage');
         }
     })
  });
 
  const signIn=document.getElementById('submitSignIn');
  signIn.addEventListener('click', (event)=>{
     event.preventDefault();
     const email=document.getElementById('email').value;
     const password=document.getElementById('password').value;
     const auth=getAuth();
 
     signInWithEmailAndPassword(auth, email,password)
     .then((userCredential)=>{
         showMessage('login is successful', 'signInMessage');
         const user=userCredential.user;
         localStorage.setItem('loggedInUserId', user.uid);
         window.location.href='index.html';
     })
     .catch((error)=>{
         const errorCode=error.code;
         if(errorCode==='auth/invalid-credential'){
             showMessage('Incorrect Email or Password', 'signInMessage');
         }
         else{
             showMessage('Account does not Exist', 'signInMessage');
         }
     })
  })
  console.log("Email: ", email);
console.log("Password: ", password);

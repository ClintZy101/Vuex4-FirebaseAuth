import { initializeApp } from 'firebase/app'
import { getAuth } from 'firebase/auth'

const firebaseConfig = {
    apiKey: "AIzaSyBSZS1QvdSJitd0UFdR3KELFvjccv-yDZg",
    authDomain: "vuex4-fb-auth-209c2.firebaseapp.com",
    projectId: "vuex4-fb-auth-209c2",
    storageBucket: "vuex4-fb-auth-209c2.appspot.com",
    messagingSenderId: "451462918126",
    appId: "1:451462918126:web:93c3748203adc8b5ee68ff"
  };

// init firebase
initializeApp(firebaseConfig)

// init firebase auth: return something store it in a const
const auth = getAuth()

export { auth }
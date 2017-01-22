// Initialize Firebase
import firebase from 'firebase'

const config = {
 apiKey: "AIzaSyDLoKVCsTpcVHcG7QwnX-3ksBuZQRyf9ro",
   authDomain: "feedemote.firebaseapp.com",
   databaseURL: "https://feedemote.firebaseio.com",
   storageBucket: "feedemote.appspot.com",
   messagingSenderId: "13469760655"
}

firebase.initializeApp(config)

export const database = firebase.database()
export const ref = firebase.database().ref()
export const firebaseAuth = firebase.auth


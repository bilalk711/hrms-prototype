importScripts('https://www.gstatic.com/firebasejs/4.8.1/firebase-app.js')
importScripts('https://www.gstatic.com/firebasejs/4.8.1/firebase-messaging.js')


firebase.initializeApp({
  apiKey: "AIzaSyBNzaUtLT0JSnqVKtAabUyKK7itSdJ_LaE",
  authDomain: "budget-management-ui.firebaseapp.com",
  databaseURL: "https://budget-management-ui.firebaseio.com",
  storageBucket: "gs://budget-management-ui.appspot.com",
  messagingSenderId: '597469023830'
})
const messaging = firebase.messaging()

import * as firebase from 'firebase/app';

let config = {
    apiKey: "AIzaSyB30LUlRoerxkR9q4IBZmr9qhX2VtuLR6o",
    authDomain: "jalanyuk77.firebaseapp.com",
    databaseURL: "https://jalanyuk77.firebaseio.com",
    projectId: "jalanyuk77",
    storageBucket: "jalanyuk77.appspot.com",
    messagingSenderId: "654553469299",
    appId: "1:654553469299:web:8a2b9f5c66c2ab75a0f506"
};

const firebaseApp = firebase.initializeApp(config);

export {firebaseApp, firebase}
import { firebase } from '@firebase/app'
import '@firebase/firestore'

const firebaseApp = firebase.initializeApp({
    apiKey: 'AIzaSyAUwpj1XqHMxmbBHn8y04jo95JIDZRVajo',
    authDomain: 'bep-nha-moc.firebaseapp.com',
    databaseURL: 'https://bep-nha-moc.firebaseio.com',
    projectId: 'bep-nha-moc',
    storageBucket: 'bep-nha-moc.appspot.com',
    messagingSenderId: '874438072549',
    appId: '1:874438072549:web:dc6cfda26ca6a81e155c0c',
    measurementId: 'G-XPGQV237T0'
})

export const db = firebaseApp.firestore()

import { initializeApp } from 'firebase/app'
import { getFirestore } from 'firebase/firestore'
import { getAuth} from 'firebase/auth'

const firebaseConfig = {
  apiKey: "AIzaSyDqKSIqSzQVOlIlwQVpJUGuZ9H9Ww_MKqA",
  authDomain: "app-treino-c7195.firebaseapp.com",
  projectId: "app-treino-c7195",
  storageBucket: "app-treino-c7195.appspot.com",
  messagingSenderId: "794902471127",
  appId: "1:794902471127:web:d45d393ae4888a4e392b92",
  measurementId: "G-52P2FKWNHB"
};

const firebaseApp = initializeApp(firebaseConfig)
const db = getFirestore(firebaseApp)
const auth = getAuth(firebaseApp)

export {db, auth}
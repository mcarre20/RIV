import { initializeApp } from 'firebase/app'
import { getAuth } from 'firebase/auth'
import { getFirestore } from 'firebase/firestore'

const firebaseConfig = {
  apiKey: 'AIzaSyDJGV7gDT2mcuHAHNHqHQ2fqB5EKzM4K1s',
  authDomain: 'theriv-fca49.firebaseapp.com',
  projectId: 'theriv-fca49',
  storageBucket: 'theriv-fca49.appspot.com',
  messagingSenderId: '350949159938',
  appId: '1:350949159938:web:fbb3bd58e75bc76eaf231b'
}

const app = initializeApp(firebaseConfig)
const auth = getAuth(app)
const db = getFirestore(app)

export { auth, db }

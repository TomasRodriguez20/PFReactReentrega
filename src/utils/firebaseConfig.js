import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: 'AIzaSyD7ZjGsmrYMkEGwLE8qbwEsydT6ToPOH4U',
  authDomain: 'pfreact-945a6.firebaseapp.com',
  projectId: 'pfreact-945a6',
  storageBucket: 'pfreact-945a6.appspot.com',
  messagingSenderId: '138915016643',
  appId: '1:138915016643:web:1e61d6e2a1ccb86416d776',
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);

import { initializeApp } from "firebase/app";

import { getFirestore } from '@firebase/firestore'

const firebaseConfig = {
  apiKey: "AIzaSyDBTdAs4wxsf65Lp2-JEeiB2PCyxAIE4o4",
  authDomain: "notas-5ca96.firebaseapp.com",
  projectId: "notas-5ca96",
  storageBucket: "notas-5ca96.appspot.com",
  messagingSenderId: "918048692771",
  appId: "1:918048692771:web:9a6c6bac96254cd79aaf96",
};

const app = initializeApp(firebaseConfig);

export const db = getFirestore(app)
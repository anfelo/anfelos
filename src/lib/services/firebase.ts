import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';

const firebaseConfig = {
	apiKey: 'AIzaSyBsIZeGCBJk1Rz3SkRrh3vz5wur1KQOXZk',
	authDomain: 'anfelos-a4b5e.firebaseapp.com',
	projectId: 'anfelos-a4b5e',
	storageBucket: 'anfelos-a4b5e.appspot.com',
	messagingSenderId: '747349521386',
	appId: '1:747349521386:web:729915c87830d25f2bf893',
	measurementId: 'G-KE5YHDQE85'
};

firebase.initializeApp(firebaseConfig);

export const db = firebase.firestore();

// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
	apiKey: 'AIzaSyCsXm3OLT4gy2GJrOQJxSIk5CjbkvG7ODo',
	authDomain: 'react-course-6468a.firebaseapp.com',
	projectId: 'react-course-6468a',
	storageBucket: 'react-course-6468a.appspot.com',
	messagingSenderId: '574097029062',
	appId: '1:574097029062:web:be1723acf41d35345d24c7',
};

// Initialize Firebaseget
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();
export const db = getFirestore(app);

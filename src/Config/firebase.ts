import firebase from 'firebase/app';
import 'firebase/auth';
import "firebase/storage"
import "firebase/firestore";
import config from './config';

export const app = firebase.initializeApp(config.firebase);

export const auth = firebase.auth();
export const db = firebase.firestore();
export const getCurrentTimestamp = firebase.firestore.FieldValue.serverTimestamp
export { firebase }
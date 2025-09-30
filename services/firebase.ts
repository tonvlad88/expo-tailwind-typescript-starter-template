// src/firebase.ts
import app from '@react-native-firebase/app';
import auth, { FirebaseAuthTypes } from '@react-native-firebase/auth';
import firestore, { FirebaseFirestoreTypes } from '@react-native-firebase/firestore';
import database, { FirebaseDatabaseTypes } from '@react-native-firebase/database';

// The default app instance (auto‑initialized from plist/json)
export const firebaseApp = app;

// Typed service instances
export const firebaseAuth: FirebaseAuthTypes.Module = auth();
export const firebaseFirestore: FirebaseFirestoreTypes.Module = firestore();
export const firebaseDatabase: FirebaseDatabaseTypes.Module = database();
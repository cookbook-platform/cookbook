import admin from 'firebase-admin';
import { config } from 'dotenv';
import fs from 'fs';

config();

let db;

export default function connect() {
    if (!db) {
        try {
            const serviceAccountPath = process.env.FIREBASE_SERVICE_ACCOUNT_PATH;

            if (!serviceAccountPath) {
                throw new Error("Firebase service account path is not defined in .env file");
            }

            console.log('Service Account Path:', serviceAccountPath);

            const serviceAccount = JSON.parse(fs.readFileSync(serviceAccountPath, 'utf-8'));

            admin.initializeApp({
                credential: admin.credential.cert(serviceAccount),
            });
            
            db = admin.firestore();
            console.log('Connected to Firestore');
        } catch (error) {
            console.error('Error connecting to Firebase:', error);
            throw new Error('Unable to connect to Firebase: ' + error.message);
        }
    }
    return db;
}
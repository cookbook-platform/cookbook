import UserRepo from "../repositories/userRepo.js";
import BaseService from "./BaseService.js";
import { getAuth } from 'firebase-admin/auth';

class UserService extends BaseService {
    constructor() {
        super(new UserRepo); 
    }

    // פונקציה לבדוק אם המשתמש קיים
    async checkIfUserExists(uid) {
        try {
            return await this.repo.getById(uid); 
        } catch (error) {
            console.error("Error in checkIfUserExists:", error);
            throw new Error('Error checking if user exists');
        }
    }

    // פונקציה ליצור משתמש חדש
    async createUser(userRecord) {
        try {
            const userData = {
                userUid: userRecord.uid,
                email: userRecord.email,
                name: userRecord.name || 'Unknown',
                imageUrl: userRecord.picture || '',
                favorites: [],
                recipes: [],
            };
            return await this.repo.add(userData);
        } catch (error) {
            console.error("Error in createUser:", error);
            throw new Error('Error creating user');
        }
    }

    // פונקציה של התחברות עם Google Sign-In
    async signInWithGoogle(idToken) {
        try {
            // אימות הטוקן של Google בצד השרת
            const decodedToken = await getAuth().verifyIdToken(idToken);
            
            // אם האימות הצליח, החזרת פרטי המשתמש
            const user = await this.checkIfUserExists(decodedToken.uid);  // חיפוש לפי ה-UID של המשתמש

            if (!user) {
                const error = new Error('User not found');
                error.statusCode = 404;
                throw error;
            }

            return {
                id: user.userUid,
                email: user.email,
                name: user.name,
                imageUrl: user.imageUrl,
            };
        } catch (error) {
            console.error("Error in signInWithGoogle:", error);
            throw new Error('Google authentication failed');
        }
    }

    // פונקציה של הרשמה עם Google Sign-Up
    async signUpWithGoogle(idToken) {
        try {
            // אימות ה-ID Token של גוגל
            const decodedToken = await getAuth().verifyIdToken(idToken);
            const userRecord = decodedToken;

            // בדוק אם המשתמש כבר קיים ב-Firebase Authentication
            let user = await this.checkIfUserExists(userRecord.uid);

            if (!user) {
                user = await this.createUser(userRecord);
            }

            // החזרת נתוני המשתמש
            return {
                id: user.userUid,
                email: user.email,
                name: user.name,
                imageUrl: user.imageUrl,
            };
        } catch (error) {
            console.error("Error in signUpWithGoogle:", error);
            throw new Error('Google Sign-Up Failed');
        }
    }
}

export default new UserService();

import BaseRepo from './BaseRepo.js';

class UserRepo extends BaseRepo {
    constructor() {
        super('users'); 
    }

    // לדוגמה, פונקציה לחיפוש משתמש לפי מייל
    async getByEmail(email) {
        try {
            const snapshot = await this.db
                .collection(this.collectionName)  
                .where('email', '==', email) 
                .get();

            if (snapshot.empty) {
                return null;  
            }

            let user = [];
            snapshot.forEach(doc => {
                user.push({ id: doc.id, ...doc.data() });
            });
            return user;
        } catch (error) {
            console.error('Error getting user by email:', error);
            throw new Error('Something went wrong while fetching user by email');
        }
    }
}
export default UserRepo;
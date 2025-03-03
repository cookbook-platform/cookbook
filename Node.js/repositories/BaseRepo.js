import connect from './db.js';

class BaseRepo {
    constructor(collection) {
        this.db = connect();
        this.collection = collection;
    }

    async getAll() {
        try {
            const snapshot = await this.db.collection(this.collection).get();
            return snapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data()
            }));
        } catch (error) {
            console.error(`Error getting documents from ${this.collection}:`, error);
            throw new Error(`Something went wrong while fetching documents from ${this.collection}`);
        }
    }

    async getById(id) {
        try {
            const doc = await this.db.collection(this.collection).doc(id).get();
            if (!doc.exists) {
                throw new Error(`Document with id ${id} not found in ${this.collection}`);
            }
            return {
                id: doc.id,
                ...doc.data()
            };
        } catch (error) {
            console.error(`Error getting document from ${this.collection}:`, error);
            throw new Error(`Something went wrong while fetching document from ${this.collection}`);
        }
    }

    async add(data) {
        try {
            const docRef = await this.db.collection(this.collection).add(data);
            console.log(`Document added with ID: ${docRef.id}`);
            return docRef.id;
        } catch (error) {
            console.error(`Error adding document to ${this.collection}:`, error);
            throw new Error(`Something went wrong while adding document`);
        }
    }


    // עדכון מסמך לפי ID
    async update(id, data) {
        try {
            const docRef = this.db.collection(this.collection).doc(id);
            
            // First check if the document exists
            const doc = await docRef.get();
            
            if (!doc.exists) {
                throw new Error(`Document with id ${id} not found in ${this.collection}`);
            }

            await docRef.update(data);
            
            const updatedDoc = await docRef.get();
            return {
                id,
                ...updatedDoc.data()
            };
        } catch (error) {
            console.error(`Error updating document in ${this.collection}:`, error);
            
            if (error.code === 5) {
                throw new Error(`Document with id ${id} not found in ${this.collection}`);
            }
            
            throw new Error(`Something went wrong while updating document: ${error.message}`);
        }
    }

    async delete(id) {
        try {
            const docRef = this.db.collection(this.collection).doc(id);
            
            // Check if document exists before deleting
            const doc = await docRef.get();
            if (!doc.exists) {
                throw new Error(`Document with id ${id} not found in ${this.collection}`);
            }
            
            await docRef.delete();
            return { id };
        } catch (error) {
            console.error(`Error deleting document from ${this.collection}:`, error);
            throw new Error('Something went wrong while deleting document');
        }
    }
}

export default BaseRepo;

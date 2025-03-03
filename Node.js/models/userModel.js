const { firestore } = require("firebase-admin");
const db = firestore();

class User {
    constructor(userUid, email, name, imageUrl, favorites, recipes) {
        this.userUid = userUid;
        this.email = email;
        this.name = name;
        this.imageUrl = imageUrl;
        this.favorites = favorites; // רשימה של ID מתכונים מועדפים
        this.recipes = recipes; // רשימה של ID מתכונים של המשתמש
    }
}
module.exports = User;
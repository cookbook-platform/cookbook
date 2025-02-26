import { configDotenv } from 'dotenv';
const express = require('express');
const admin = require('firebase-admin');

configDotenv()
const app = express();
const hostname = process.env.HOST_NAME;
const port = process.env.PORT;
const serviceAccount = process.env.SERVICE_ACCOUNT;

// אתחול Firebase Admin SDK
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
//   databaseURL: "https://cookbook.firebaseio.com"  real time if we need it...
});

app.use(express.json());


app.use('/users', userRouter);


app.listen(3000, () => {
    console.log(`Server running at http://${hostname}:${port}/`);
});
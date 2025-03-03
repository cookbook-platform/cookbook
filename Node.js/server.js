import express from 'express';
import { configDotenv } from 'dotenv';
import userRouter from './routes/userRouter.js';


configDotenv();
const app = express();
const hostname = process.env.HOST_NAME || 'localhost';
const port = process.env.PORT || 3000;


app.use(express.json());

app.use('/api/user', userRouter);

app.listen(port, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});


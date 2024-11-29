import express, { Request, Response } from "express";
import cors from 'cors';
import cookieParser from 'cookie-parser';
import dotenv from 'dotenv';

import connectDb from './config/db'
import authRouter from './routes/authRoutes'



dotenv.config();

// Define CORS options properly
const corsOptions = {
    origin: 'http://localhost:5173',
    methods: ["GET", "POST", "PUT", "DELETE"], 
    credentials: true,
};


const app = express();
connectDb();

// Route handler
app.use(cookieParser());
app.use(cors(corsOptions));
app.use(express.json());
app.use("/api/auth", authRouter)

  
  
app.get('/', (req: Request, res: Response) => {
    res.json({ message: 'Hello World!' });
});


export default app;
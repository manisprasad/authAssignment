import express, { Request, Response, NextFunction } from 'express';
import { registerUser, loginUser } from "../controllers/authController";

const router = express.Router();

router.post('/register', async (req: Request, res: Response, next: NextFunction) => {
  try {
    await registerUser(req, res);
  } catch (error) {
    next(error); // Forward any errors to the error handling middleware
  }
});

router.post('/login', async (req: Request, res: Response, next: NextFunction) => {
  try {
    await loginUser(req, res);
  } catch (error) {
    next(error); // Forward any errors to the error handling middleware
  }
});



export default router;

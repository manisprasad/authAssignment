// import jwt from 'jsonwebtoken';
// import { Request, Response, NextFunction } from 'express';

// export const authenticateUser = (req: Request, res: Response, next: NextFunction) => {
//   const token = req.cookies.token;

//   if (!token) {
//     return res.status(401).json({ success: false, message: 'No token, authorization denied' });
//   }

//   try {
//     const decoded = jwt.verify(token, process.env.JWT_SECRET!) as {id: string};
//     console.log(decoded);
//     req.user = decoded
//     next(); // Proceed to the next middleware or route handler
//   } catch (err) {
//     return res.status(401).json({ success: false, message: 'Token is not valid' });
//   }
// };

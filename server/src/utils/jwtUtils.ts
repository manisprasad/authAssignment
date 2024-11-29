import {Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

export const generateToken = (id: string): string => {
  const jwtSecret = process.env.JWT_SECRET;

  // Validate the existence of JWT_SECRET
  if (!jwtSecret) {
    throw new Error("JWT_SECRET is not defined in the environment variables");
  }

  return jwt.sign({ id }, jwtSecret, { expiresIn: '30d' });
};

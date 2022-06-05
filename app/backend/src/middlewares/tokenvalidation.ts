import { verify } from 'jsonwebtoken';
import { NextFunction, Request, Response } from 'express';
import fs = require('fs');

const secret = fs.readFileSync('./jwt.evaluation.key', { encoding: 'utf-8' });

const verifyToken = (req: Request, res: Response, next: NextFunction) => {
  const { authorization: token } = req.headers;

  if (!token || token === '') {
    return res.status(401).json({ message: 'Token not found' });
  }
  try {
    verify(token, secret);
    next();
  } catch (error) {
    return res.status(401).json({ message: 'Expired or invalid token' });
  }
};

export default verifyToken;

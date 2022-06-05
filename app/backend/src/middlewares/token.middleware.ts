import { Request, Response, NextFunction } from 'express';
import Users from '../database/models/users';
import { decoderToken } from '../util/Token';

type userData = {
  user: {
    id: number,
    username: string,
    role: string,
    email: string,
    password: string,
  }
};

class tokenValidation {
  public validateWithUserExists = async (req: Request, res: Response, next: NextFunction) => {
    const token = req.headers.authorization;
    const decodedToken = decoderToken(String(token));
    if (!decodedToken) return res.status(401).json({ message: 'Expired or invalid token' });

    const { email } = (decodedToken as userData).user;
    const findUser = await Users.findOne({ where: { email },
      attributes: { exclude: ['password'] } });
    if (!findUser) res.status(400).json({ message: 'User does not exists' });
    req.body.user = findUser;
    next();
  };
}

export default tokenValidation;

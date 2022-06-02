import { Request, Response, NextFunction } from 'express';
import Users from '../database/models/users';
import { decoderToken } from '../util/Token';

type userData = {
  data: {
    id: number,
    username: string,
    role: string,
    email: string,
    password: string,
  }
};

class tokenValidation {
  public validateWithUserExists = async (req: Request, res: Response, next: NextFunction) => {
    // this.validateTokenIsValide(req, res, next);
    const token = req.headers.authorization;
    const decodedToken = decoderToken(String(token));
    if (!decodedToken) return res.status(401).json({ message: 'Expired or invalid token' });

    const { email } = (decodedToken as userData).data;
    const findUser = await Users.findOne({ where: { email },
      attributes: { exclude: ['password'] } });
    if (!findUser) res.status(400).json({ message: 'User does not exists' });
    req.body = findUser;
    next();
  };
}

export default tokenValidation;

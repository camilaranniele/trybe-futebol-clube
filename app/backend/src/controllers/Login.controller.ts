import { Request, Response } from 'express';
// import { StatusCodes } from 'http-status-codes';
import LoginService from '../services/Login.service';

class LoginControler {
  private _loginService = new LoginService();

  public login = async (req: Request, res: Response) => {
    try {
      const { email, password } = req.body;
      const user = await this._loginService.login(email, password);
      res.status(200).json(user);
    } catch (error) {
      res.status(500).json({ message: 'Database problems' });
    }
  };
}

export default LoginControler;

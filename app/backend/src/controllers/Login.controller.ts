import { Request, Response } from 'express';
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

  public returnUserRole = async (req: Request, res: Response) => {
    try {
      const { role } = req.body.user;

      res.status(200).send(role as string);
    } catch (error) {
      res.status(500).json({ message: 'Database problems' });
    }
  };
}

export default LoginControler;

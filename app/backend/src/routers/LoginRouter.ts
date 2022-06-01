import { Application } from 'express';
import LoginControler from '../controllers/Login.controller';

class LoginRouter {
  public loginController = new LoginControler();

  public route = (app: Application) => {
    app.post('/login', (req, res) => this.loginController.login(req, res));
  };
}

export default LoginRouter;

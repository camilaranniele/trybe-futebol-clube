import { Application } from 'express';
import UserValidation from '../middlewares/user.middleware';
import LoginControler from '../controllers/Login.controller';
import LoginSchema from '../middlewares/schemas/login.schema';

class LoginRouter {
  public loginController = new LoginControler();
  public userValidation = new UserValidation();

  public route = (app: Application) => {
    app.post(
      '/login',
      (req, res, next) => this.userValidation.validate(req, res, next, LoginSchema),

      (req, res) => this.loginController.login(req, res),
    );
  };
}

export default LoginRouter;

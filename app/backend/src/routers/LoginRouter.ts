import { Application } from 'express';
import TokenValidation from '../middlewares/token.middleware';
import UserValidation from '../middlewares/user.middleware';
import LoginControler from '../controllers/Login.controller';
import LoginSchema from '../middlewares/schemas/login.schema';

class LoginRouter {
  public loginController = new LoginControler();
  public userValidation = new UserValidation();
  public tokenValidation = new TokenValidation();

  public route = (app: Application) => {
    app.post(
      '/login',
      (req, res, next) => this.userValidation.validation(req, res, next, LoginSchema),

      (req, res) => this.loginController.login(req, res),
    );
    app.get(
      '/login/validate',

      (req, res, next) => this.tokenValidation.validateWithUserExists(req, res, next),

      (req, res) => this.loginController.returnUserRole(req, res),
    );
  };
}

export default LoginRouter;

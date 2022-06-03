import * as express from 'express';
import LoginRouter from './routers/LoginRouter';
import TeamsRouter from './routers/TeamsRouter';

class App {
  public app: express.Express;
  public loginRouter = new LoginRouter();
  public teamsRouter = new TeamsRouter();

  constructor() {
    this.app = express();
    this.config();
  }

  private config():void {
    const accessControl: express.RequestHandler = (_req, res, next) => {
      res.header('Access-Control-Allow-Origin', '*');
      res.header('Access-Control-Allow-Methods', 'GET,POST,DELETE,OPTIONS,PUT,PATCH');
      res.header('Access-Control-Allow-Headers', '*');
      next();
    };

    this.app.use(express.json());
    this.app.use(accessControl);
    this.loginRouter.route(this.app);
    this.teamsRouter.route(this.app);
    // ... rotas
  }

  // ...
  public start(PORT: string | number):void {
    this.app.listen(PORT, () => console.warn('Listen on port ', PORT));
  }
}

export { App };

// A execução dos testes de cobertura depende dessa exportação
export const { app } = new App();

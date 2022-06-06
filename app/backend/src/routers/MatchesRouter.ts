import { Application } from 'express';
import MatchesController from '../controllers/Matches.controller';
import TokenValidation from '../middlewares/tokenvalidation';

class MatchesRouter {
  private _matchesController = new MatchesController();

  public route = (app: Application) => {
    app.get(
      '/matches',
      (req, res) => this._matchesController.getAllMatches(req, res),
    );
    app.post(
      '/matches',
      (req, res, next) => TokenValidation(req, res, next),
      (req, res) => this._matchesController.createMatch(req, res),
    );
    app.patch(
      '/matches/:id/finish',
      (req, res) => this._matchesController.finishMatch(req, res),
    );
  };
}

export default MatchesRouter;

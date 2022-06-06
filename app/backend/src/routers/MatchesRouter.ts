import { Application } from 'express';
import MatchesController from '../controllers/Matches.controller';
import TokenValidation from '../middlewares/tokenvalidation';
import MatchesValidation from '../middlewares/matches.middleware';
import matchesSchema from '../middlewares/schemas/matches.schema';

class MatchesRouter {
  private _matchesController = new MatchesController();
  private _matchesValidation = new MatchesValidation();

  public route = (app: Application) => {
    app.get(
      '/matches',
      (req, res) => this._matchesController.getAllMatches(req, res),
    );
    app.post(
      '/matches',
      (req, res, next) => TokenValidation(req, res, next),
      (req, res, next) => this._matchesValidation.validation(req, res, next, matchesSchema),
      (req, res) => this._matchesController.createMatch(req, res),
    );
    app.patch(
      '/matches/:id/finish',
      (req, res) => this._matchesController.finishMatch(req, res),
    );
    app.patch(
      '/matches/:id',
      (req, res) => this._matchesController.updateMatch(req, res),
    );
  };
}

export default MatchesRouter;

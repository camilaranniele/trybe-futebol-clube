import { Application } from 'express';
import MatchesController from '../controllers/Matches.controller';

class MatchesRouter {
  private _matchesController = new MatchesController();

  public route = (app: Application) => {
    app.get(
      '/matches',
      (req, res) => this._matchesController.getAllMatches(req, res),
    );
  };
}

export default MatchesRouter;

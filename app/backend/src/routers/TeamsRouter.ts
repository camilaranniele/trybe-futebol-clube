import { Application } from 'express';
import TeamsController from '../controllers/Teams.controller';

class TeamsRouter {
  private _teamsController = new TeamsController();

  public route = (app: Application) => {
    app.get(
      '/teams',
      (req, res) => this._teamsController.getAllTeams(req, res),
    );

    app.get(
      '/teams/:id',
      (req, res) => this._teamsController.getTeamById(req, res),
    );
  };
}

export default TeamsRouter;

import { Application } from 'express';
import LeaderBoardHomeController from '../controllers/Leaderboards.controller';

class LeaderboardRouter {
  public leaderBoardHomeController = new LeaderBoardHomeController();
  public route = (app: Application) => {
    app.get(
      '/leaderboard/home',
      (req, res) => this.leaderBoardHomeController.getAll(req, res),
    );
  };
}

export default LeaderboardRouter;

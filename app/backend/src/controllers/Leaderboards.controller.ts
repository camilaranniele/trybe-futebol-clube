import { Request, Response } from 'express';
import LeaderboardAwayService from '../services/LeaderBoardAway.service';
import LeaderboardHomeService from '../services/LeaderBoardHome.service';

class LeaderBoardController {
  private _leaderboardHomeService = new LeaderboardHomeService();
  private _leaderboardAwayService = new LeaderboardAwayService();

  async getHomeBoard(req: Request, res: Response) {
    const board = await this._leaderboardHomeService.getBoard();
    res.status(200).json(board);
  }

  async getAwayBoard(req: Request, res: Response) {
    const board = await this._leaderboardAwayService.getBoard();
    res.status(200).json(board);
  }
}

export default LeaderBoardController;

import { Request, Response } from 'express';
import LeaderboardHomeService from '../services/LeaderBoardHome.service';

class LeaderBoardController {
  private _leaderboardHomeService = new LeaderboardHomeService();
  async getAll(req: Request, res: Response) {
    const board = await this._leaderboardHomeService.getBoard();
    res.status(200).json(board);
  }
}

export default LeaderBoardController;

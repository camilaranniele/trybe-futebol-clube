import { Request, Response } from 'express';
import MatchesService from '../services/Matches.service';

class MatchesController {
  private _matchesService = new MatchesService();

  public getAllMatches = async (req: Request, res: Response) => {
    try {
      const matches = await this._matchesService.getAllMatches();
      res.status(200).json(matches);
    } catch (error) {
      res.status(500).json({ message: 'Database problems' });
    }
  };
}

export default MatchesController;

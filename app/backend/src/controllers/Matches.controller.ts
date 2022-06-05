import { Request, Response } from 'express';
import MatchesService from '../services/Matches.service';

class MatchesController {
  private _matchesService = new MatchesService();

  public getAllMatches = async (req: Request, res: Response) => {
    try {
      const { inProgress } = req.query;
      let matches;
      if (inProgress !== null && inProgress !== undefined) {
        const isInProgress = String(inProgress).toLowerCase() === 'true';

        matches = await this._matchesService.getAllMatches(isInProgress);
        return res.status(200).json(matches);
      }
      matches = await this._matchesService.getAllMatches(inProgress);

      res.status(200).json(matches);
    } catch (error) {
      res.status(500).json({ message: 'Database problems' });
    }
  };

  public createMatch = async (req: Request, res: Response) => {
    const newUser = await this._matchesService.createMatch(req.body);
    res.status(201).json(newUser);
  };
}

export default MatchesController;

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
      res.status(401).json({ message: 'Database problems' });
    }
  };

  public createMatch = async (req: Request, res: Response) => {
    try {
      const newUser = await this._matchesService.createMatch(req.body);
      res.status(201).json(newUser);
    } catch (error) {
      const { message } = error as Error;
      res.status(401).json({ message });
    }
  };

  public finishMatch = async (req: Request, res: Response) => {
    const { id } = req.params;
    await this._matchesService.finishMatch(Number(id));
    res.status(200).json({ message: 'Finished' });
  };
}

export default MatchesController;

import { Request, Response } from 'express';
import MatchesService from '../services/Matches.service';

class MatchesController {
  private _matchesService = new MatchesService();
  private _inProgress: boolean;

  public getAllMatches = async (req: Request, res: Response) => {
    const { inProgress } = req.query;
    this._inProgress = inProgress === 'true';
    const matches = await this._matchesService.getAllMatches(this._inProgress);
    res.status(200).json(matches);
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

  public updateMatch = async (req: Request, res: Response) => {
    const { id } = req.params;
    const { homeTeamGoals, awayTeamGoals } = req.body;
    await this._matchesService
      .updateMatch(Number(id), Number(homeTeamGoals), Number(awayTeamGoals));
    res.status(200).json({ message: 'Updated' });
  };
}

export default MatchesController;

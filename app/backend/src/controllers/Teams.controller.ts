import { Request, Response } from 'express';
import TeamsService from '../services/Teams.service';

class TeamsController {
  private _teamsService = new TeamsService();

  public getAllTeams = async (req: Request, res: Response) => {
    try {
      const teams = await this._teamsService.getAllTeams();
      res.status(200).json(teams);
    } catch (error) {
      res.status(500).json({ message: 'Database problems' });
    }
  };

  public async getTeamById(req: Request, res: Response) {
    const { id } = req.params;
    try {
      const team = await this._teamsService.getTeamById(Number(id));
      res.status(200).json(team);
    } catch (error) {
      res.status(500).json({ message: 'Database problems' });
    }
  }
}

export default TeamsController;

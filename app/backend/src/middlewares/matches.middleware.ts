import { Request, Response, NextFunction } from 'express';
import { Schema } from 'joi';
import TeamsService from '../services/Teams.service';

class matchesValidation {
  private _teamsService = new TeamsService();

  public validation = async (req: Request, res: Response, next: NextFunction, schema: Schema) => {
    const { error } = schema.validate(req.body.isProgress);
    if (error) {
      return res.status(401).json({ message: error.details[0].message });
    }
    const { homeTeam, awayTeam } = req.body;
    const teams = await this._teamsService.getAllTeams();
    const verifyWithExistsHomeTeam = teams.some((team) => team.id === Number(homeTeam));
    const verifyWithExistsAwayTeam = teams.some((team) => team.id === Number(awayTeam));
    if (!verifyWithExistsHomeTeam || !verifyWithExistsAwayTeam) {
      return res.status(404).json({ message: 'There is no team with such id!' });
    }
    if (homeTeam === awayTeam) {
      return res.status(401)
        .json({ message: 'It is not possible to create a match with two equal teams' });
    }
    next();
  };
}

export default matchesValidation;

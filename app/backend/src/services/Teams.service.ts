import Teams from '../database/models/teams';
import ITeam from '../interfaces/ITeams';

class TeamsService {
  public teams: Array<ITeam[] | ITeam>;

  public async getAllTeams() {
    this.teams = await Teams.findAll();

    return this.teams;
  }
}

export default TeamsService;

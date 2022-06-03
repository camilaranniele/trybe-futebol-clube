import Teams from '../database/models/teams';
import ITeam from '../interfaces/ITeams';

class TeamsService {
  public teams: Array<ITeam[] | ITeam>;
  public team: ITeam | null;

  public async getAllTeams() {
    this.teams = await Teams.findAll();

    return this.teams;
  }

  public async getTeamById(id: number) {
    this.team = await Teams.findOne({ where: { id } });
    return this.team;
  }
}

export default TeamsService;

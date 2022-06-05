import Teams from '../database/models/teams';
import Matches from '../database/models/matches';
import IMatches from '../interfaces/IMatches';

class MatcheService {
  public matches: Array<IMatches[] | IMatches>;
  private _query = {
    where: {},
    include: [
      {
        model: Teams,
        as: 'teamHome',
        attributes: { exclude: ['id'] },
      },
      {
        model: Teams,
        as: 'teamAway',
        attributes: { exclude: ['id'] },
      },
    ],
  };

  public getAllMatches = async (inProgress: boolean | null | undefined) => {
    if (inProgress !== null && inProgress !== undefined) {
      this._query.where = { inProgress };
    }
    const matches = await Matches.findAll(this._query);
    return matches;
  };

  public createMatch = async (payload: IMatches) => {
    const { homeTeam, awayTeam, homeTeamGoals, awayTeamGoals, inProgress } = payload;
    const newMatch = await Matches.create({ homeTeam,
      awayTeam,
      homeTeamGoals,
      awayTeamGoals,
      inProgress });
    console.log(newMatch);
    return newMatch;
  };
}

export default MatcheService;

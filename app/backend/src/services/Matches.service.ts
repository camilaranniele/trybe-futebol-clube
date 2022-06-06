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

  public getAllMatches = async (inProgress: boolean) => {
    this._query.where = inProgress ? { inProgress } : {};
    const matches = await Matches.findAll(this._query);
    return matches;
  };

  public createMatch = async (payload: IMatches) => {
    const { homeTeam, awayTeam, homeTeamGoals, awayTeamGoals, inProgress } = payload;
    if (inProgress === false) throw new Error('In Progress cannot be false');

    const newMatch = await Matches.create({ homeTeam,
      awayTeam,
      homeTeamGoals,
      awayTeamGoals,
      inProgress });
    return newMatch;
  };

  public finishMatch = async (id: number) => {
    await Matches.update(
      { inProgress: false },
      { where: { id } },
    );
  };

  public updateMatch = async (id: number, homeGoals: number, awayGoals: number) => {
    await Matches.update(
      { homeTeamGoals: homeGoals, awayTeamGoals: awayGoals },
      { where: { id } },
    );
  };
}

export default MatcheService;

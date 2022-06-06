import Teams from '../database/models/teams';
import Matches from '../database/models/matches';
import IMatches from '../interfaces/IMatches';

class MatcheService {
  public matches: Array<IMatches[] | IMatches>;
  private _inProgress: boolean;
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
    this._inProgress = true;
    const { homeTeam, awayTeam, homeTeamGoals, awayTeamGoals } = payload;
    // if (typeof inProgress === 'string') throw new Error('In Progress is a boolean');
    // if (inProgress === false) throw new Error('In Progress cannot be false');

    const newMatch = await Matches.create({ homeTeam,
      awayTeam,
      homeTeamGoals,
      awayTeamGoals,
      inProgress: this._inProgress });
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

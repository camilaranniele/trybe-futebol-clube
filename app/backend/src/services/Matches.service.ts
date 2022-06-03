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

  // public async getAllMatches() {
  //   this.matches = await Matches.findAll({
  //     include: [
  //       {
  //         model: Teams,
  //         as: 'teamHome',
  //         attributes: { exclude: ['id'] },
  //       },
  //       {
  //         model: Teams,
  //         as: 'teamAway',
  //         attributes: { exclude: ['id'] },
  //       },
  //     ],
  //   });
  //   return this.matches;
  // }
}

export default MatcheService;

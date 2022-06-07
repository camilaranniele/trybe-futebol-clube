import Teams from '../database/models/teams';
import ITeam from '../interfaces/ITeams';
import Matches from '../database/models/matches';
import IMatches from '../interfaces/IMatches';
import IBoard from '../interfaces/IBoard';
/*
 {
    "name": "Palmeiras",
    "totalPoints": 13,
    "totalGames": 5,
    "totalVictories": 4,
    "totalDraws": 1,
    "totalLosses": 0,
    "goalsFavor": 17,
    "goalsOwn": 5,
    "goalsBalance": 12,
    "efficiency": 86.67
  },
*/

/*
  - Pegar todos os times
    - Pegar nome

  - Pegar todos os jogos
    - em cada jogo calcular quantidade de pontos dos 2 times
    - Calcular quantas vezes cada time ja jogos
    - Calcular quantas vitorias cada time tem
    - Calcular quantidade de empates cada time tem
    - Calcular quantidade de derrotas cada time tem
    - Calular quantos gols fizeram
    - Calcular quantos gols sofridos
    - Saldo total de gols (fez - recebeu)
    - Aproveitamento de time
*/
class LeaderboardService {
  private _finishedMatches: IMatches[];
  private _teams: ITeam[];
  private _dataTeam: IBoard;
  private _board: IBoard[]; // tipar
  private _orderedBoard: IBoard[];

  private manyTimesTeamWon = (matches: IMatches[]): number => matches.reduce((acc, matche) => {
    if (matche.homeTeamGoals > matche.awayTeamGoals) return acc + 1;
    return acc;
  }, 0);

  private manyTimesTeamDraw = (matches: IMatches[]): number => matches.reduce((acc, matche) => {
    if (matche.homeTeamGoals === matche.awayTeamGoals) return acc + 1;
    return acc;
  }, 0);

  private manyTimesTeamLose = (matches: IMatches[]): number => matches.reduce((acc, matche) => {
    if (matche.homeTeamGoals < matche.awayTeamGoals) return acc + 1;
    return acc;
  }, 0);

  private getGoalsFavor = (matches: IMatches[]): number => matches.reduce((acc, matche) => {
    const totalGoals = acc + matche.homeTeamGoals;
    return totalGoals;
  }, 0);

  private getGoalsOwn = (matches: IMatches[]): number => matches.reduce((acc, matche) => {
    const totalGoals = acc + matche.awayTeamGoals;
    return totalGoals;
  }, 0);

  private createTeamData = (teamName: string, matches: IMatches[]) => {
    const totalPoints = (this.manyTimesTeamWon(matches) * 3) + this.manyTimesTeamDraw(matches);

    const efficiency = Number(((totalPoints / (matches.length * 3)) * 100).toFixed(2));

    const goalsBalance = this.getGoalsFavor(matches) - this.getGoalsOwn(matches);

    this._dataTeam = {
      name: teamName,
      totalPoints,
      totalGames: matches.length,
      totalVictories: this.manyTimesTeamWon(matches),
      totalDraws: this.manyTimesTeamDraw(matches),
      totalLosses: this.manyTimesTeamLose(matches),
      goalsFavor: this.getGoalsFavor(matches),
      goalsOwn: this.getGoalsOwn(matches),
      goalsBalance,
      efficiency,
    };
    return this._dataTeam;
  };

  createTeamsBoard(teams: ITeam[], matches: IMatches[]) {
    return teams.map((team) => {
      this._finishedMatches = matches.filter((matche) => (
        team.id === matche.homeTeam
      ));
      return this.createTeamData(team.teamName, this._finishedMatches);
    });
  }

  private createRanking(board: IBoard[]) {
    this._orderedBoard = board.sort((teamA, teamB) => (
      teamB.totalPoints - teamA.totalPoints
      || teamB.totalVictories - teamA.totalVictories
      || teamB.goalsBalance - teamA.goalsBalance
      || teamB.goalsFavor - teamA.goalsFavor
      || teamB.goalsOwn - teamA.goalsOwn
    ));
    return this._orderedBoard;
  }

  async getBoard() {
    this._finishedMatches = await Matches.findAll({ where: { inProgress: false } });
    this._teams = await Teams.findAll();
    this._board = this.createTeamsBoard(this._teams, this._finishedMatches);
    return this.createRanking(this._board);
  }
}

export default LeaderboardService;

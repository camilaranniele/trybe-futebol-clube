import { Model, INTEGER, BOOLEAN } from 'sequelize';
import db from '.';

import Teams from './teams';

class Matches extends Model {
  id!: number;
  homeTeam!: number;
  homeTeamGoals!: number;
  awayTeam!: number;
  awayTeamGoals!: number;
  inProgress!: boolean;
}

Matches.init({
  id: {
    type: INTEGER,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true,
  },
  homeTeam: {
    type: INTEGER,
    allowNull: false,
  },
  homeTeamGoals: {
    type: INTEGER,
    allowNull: false,
  },
  awayTeam: {
    type: INTEGER,
    allowNull: false,
  },
  awayTeamGoals: {
    type: INTEGER,
    allowNull: false,
  },
  inProgress: {
    type: BOOLEAN,
    allowNull: false,
  },
}, {
  sequelize: db,
  modelName: 'matches',
  timestamps: false,
  underscored: true,
  tableName: 'matches',
});

Matches.belongsTo(Teams, { foreignKey: 'homeTeam', as: 'teamHome' });

Matches.belongsTo(Teams, { foreignKey: 'awayTeam', as: 'teamAway' });

Teams.hasMany(Matches, { foreignKey: 'id', as: 'teamId' });

// Teams.belongsTo(Matches, { foreignKey: 'homeTeam', as: 'home_team' });
// Teams.belongsTo(Matches, { foreignKey: 'awayTeam', as: 'away_team' });

// Matches.hasMany(Teams, { foreignKey: 'homeTeam', as: 'home_team' });
// Matches.hasMany(Teams, { foreignKey: 'awayTeam', as: 'away_team' });

export default Matches;

import { Model, DataTypes } from 'sequelize';
import sequelize from '../config/dbConfig';
import Movie from './movieModel';
import Theater from './theaterModel';

class Showtime extends Model {
  public id!: number;
  public startTime!: Date;
  public movieId!: number;
  public theaterId!: number;
}

Showtime.init({
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  startTime: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  movieId: {
    type: DataTypes.INTEGER,
    references: {
      model: Movie,
      key: 'id',
    },
  },
  theaterId: {
    type: DataTypes.INTEGER,
    references: {
      model: Theater,
      key: 'id',
    },
  },
}, {
  sequelize,
  modelName: 'Showtime',
});

export default Showtime;
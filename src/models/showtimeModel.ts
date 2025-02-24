import { Model, DataTypes } from 'sequelize';
import sequelize from '../config/dbConfig';

class Showtime extends Model {
  public id!: number;
  public movieId!: number;
  public theaterId!: number;
  public startTime!: Date;
}

Showtime.init({
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  movieId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  theaterId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  startTime: {
    type: DataTypes.DATE,
    allowNull: false,
  },
}, {
  sequelize,
  modelName: 'Showtime',
});

export default Showtime;
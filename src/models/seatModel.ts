import { Model, DataTypes } from 'sequelize';
import sequelize from '../config/dbConfig';
import Theater from './theaterModel';

class Seat extends Model {
  public id!: number;
  public number!: string;
  public isAvailable!: boolean;
  public theaterId!: number;
}

Seat.init({
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  number: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  isAvailable: {
    type: DataTypes.BOOLEAN,
    defaultValue: true,
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
  modelName: 'Seat',
});

export default Seat;
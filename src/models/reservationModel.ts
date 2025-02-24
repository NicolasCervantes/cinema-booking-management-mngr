import { Model, DataTypes } from 'sequelize';
import sequelize from '../config/dbConfig';
import Showtime from './showtimeModel';
import Seat from './seatModel';

class Reservation extends Model {
  public id!: number;
  public name!: string;
  public email!: string;
  public showtimeId!: number;
  public seatId!: number;
}

Reservation.init({
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  showtimeId: {
    type: DataTypes.INTEGER,
    references: {
      model: Showtime,
      key: 'id',
    },
  },
  seatId: {
    type: DataTypes.INTEGER,
    references: {
      model: Seat,
      key: 'id',
    },
  },
}, {
  sequelize,
  modelName: 'Reservation',
});

export default Reservation;
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
  public createdAt!: Date; // Asegúrate de que el campo createdAt esté definido
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
  createdAt: {
    type: DataTypes.DATE,
    allowNull: false,
  },
}, {
  sequelize,
  modelName: 'Reservation',
  timestamps: true, // Asegúrate de que los timestamps estén habilitados
});

export default Reservation;
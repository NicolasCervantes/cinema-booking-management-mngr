import { Model, DataTypes } from 'sequelize';
import sequelize from '../config/dbConfig';
import Seat from './seatModel';

class Reservation extends Model {
  public id!: number;
  public name!: string;
  public email!: string;
  public showtimeId!: number;
  public seatId!: number;
  public createdAt!: Date;
  public Seat?: { id: number; number: string }; // Incluir la propiedad Seat
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
    allowNull: false,
  },
  seatId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  createdAt: {
    type: DataTypes.DATE,
    allowNull: false,
  },
}, {
  sequelize,
  modelName: 'Reservation',
  timestamps: true,
});

export default Reservation;
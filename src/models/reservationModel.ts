import { DataTypes } from 'sequelize';
import sequelize from '../config/dbConfig';

const Reservation = sequelize.define('Reservation', {
    movieId: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    roomId: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    schedule: {
        type: DataTypes.DATE,
        allowNull: false
    },
    seats: {
        type: DataTypes.JSON,
        allowNull: false
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false
    }
});

export default Reservation;
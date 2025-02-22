import { DataTypes } from 'sequelize';
import sequelize from '../config/dbConfig';

const Movie = sequelize.define('Movie', {
    title: {
        type: DataTypes.STRING,
        allowNull: false
    },
    genre: {
        type: DataTypes.STRING,
        allowNull: false
    },
    duration: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    rating: {
        type: DataTypes.STRING,
        allowNull: false
    }
});

export default Movie;
import { DataTypes, Model } from 'sequelize';
import sequelize from '../config/dbConfig';

class Movie extends Model {}

Movie.init({
  title: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  description: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  duration: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
}, {
  sequelize,
  modelName: 'Movie',
});

export default Movie;
import { Model, DataTypes } from 'sequelize';
import sequelize from '../config/dbConfig';

class Movie extends Model {
  public id!: number;
  public title!: string;
  public description!: string;
  public duration!: number;
}

Movie.init({
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
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
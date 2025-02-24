import { Model, DataTypes } from 'sequelize';
import sequelize from '../config/dbConfig';

class Theater extends Model {
  public id!: number;
  public name!: string;
  public location!: string;
}

Theater.init({
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  location: {
    type: DataTypes.STRING,
    allowNull: false,
  },
}, {
  sequelize,
  modelName: 'Theater',
});

export default Theater;
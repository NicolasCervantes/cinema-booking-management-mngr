import { DataTypes, Model } from 'sequelize';
import sequelize from '../config/dbConfig';

class Theater extends Model {}

Theater.init({
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  location: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  seats: {
    type: DataTypes.ARRAY(DataTypes.STRING),
    allowNull: false,
  },
}, {
  sequelize,
  modelName: 'Theater',
});

export default Theater;
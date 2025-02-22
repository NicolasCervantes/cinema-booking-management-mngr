import { DataTypes } from 'sequelize';
import sequelize from '../config/dbConfig';

const Theater = sequelize.define('Theater', {
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    capacity: {
        type: DataTypes.INTEGER,
        allowNull: false
    }
});

export default Theater;
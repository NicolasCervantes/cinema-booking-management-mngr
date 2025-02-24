"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const dbConfig_1 = __importDefault(require("../config/dbConfig"));
const showtimeModel_1 = __importDefault(require("./showtimeModel"));
class Movie extends sequelize_1.Model {
}
Movie.init({
    id: {
        type: sequelize_1.DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    title: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    description: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    duration: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
    },
}, {
    sequelize: dbConfig_1.default,
    modelName: 'Movie',
});
Movie.hasMany(showtimeModel_1.default, { foreignKey: 'movieId' });
showtimeModel_1.default.belongsTo(Movie, { foreignKey: 'movieId' });
exports.default = Movie;

"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const dbConfig_1 = __importDefault(require("../config/dbConfig"));
const movieModel_1 = __importDefault(require("./movieModel"));
const theaterModel_1 = __importDefault(require("./theaterModel"));
class Showtime extends sequelize_1.Model {
}
Showtime.init({
    id: {
        type: sequelize_1.DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    startTime: {
        type: sequelize_1.DataTypes.DATE,
        allowNull: false,
    },
    movieId: {
        type: sequelize_1.DataTypes.INTEGER,
        references: {
            model: movieModel_1.default,
            key: 'id',
        },
    },
    theaterId: {
        type: sequelize_1.DataTypes.INTEGER,
        references: {
            model: theaterModel_1.default,
            key: 'id',
        },
    },
}, {
    sequelize: dbConfig_1.default,
    modelName: 'Showtime',
});
exports.default = Showtime;

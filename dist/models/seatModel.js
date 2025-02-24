"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const dbConfig_1 = __importDefault(require("../config/dbConfig"));
const theaterModel_1 = __importDefault(require("./theaterModel"));
class Seat extends sequelize_1.Model {
}
Seat.init({
    id: {
        type: sequelize_1.DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    number: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    isAvailable: {
        type: sequelize_1.DataTypes.BOOLEAN,
        defaultValue: true,
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
    modelName: 'Seat',
});
exports.default = Seat;

"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const dbConfig_1 = __importDefault(require("../config/dbConfig"));
const Reservation = dbConfig_1.default.define('Reservation', {
    movieId: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false
    },
    roomId: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false
    },
    schedule: {
        type: sequelize_1.DataTypes.DATE,
        allowNull: false
    },
    seats: {
        type: sequelize_1.DataTypes.JSON,
        allowNull: false
    },
    email: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false
    }
});
exports.default = Reservation;

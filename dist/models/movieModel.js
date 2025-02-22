"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const dbConfig_1 = __importDefault(require("../config/dbConfig"));
const Movie = dbConfig_1.default.define('Movie', {
    title: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false
    },
    genre: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false
    },
    duration: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false
    },
    rating: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false
    }
});
exports.default = Movie;

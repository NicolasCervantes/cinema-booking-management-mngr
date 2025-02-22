"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const dbConfig_1 = __importDefault(require("../config/dbConfig"));
const Theater = dbConfig_1.default.define('Theater', {
    name: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false
    },
    capacity: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false
    }
});
exports.default = Theater;

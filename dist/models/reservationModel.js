"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const dbConfig_1 = __importDefault(require("../config/dbConfig"));
const showtimeModel_1 = __importDefault(require("./showtimeModel"));
const seatModel_1 = __importDefault(require("./seatModel"));
class Reservation extends sequelize_1.Model {
}
Reservation.init({
    id: {
        type: sequelize_1.DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    name: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    email: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    showtimeId: {
        type: sequelize_1.DataTypes.INTEGER,
        references: {
            model: showtimeModel_1.default,
            key: 'id',
        },
    },
    seatId: {
        type: sequelize_1.DataTypes.INTEGER,
        references: {
            model: seatModel_1.default,
            key: 'id',
        },
    },
    createdAt: {
        type: sequelize_1.DataTypes.DATE,
        allowNull: false,
    },
}, {
    sequelize: dbConfig_1.default,
    modelName: 'Reservation',
    timestamps: true, // Asegúrate de que los timestamps estén habilitados
});
exports.default = Reservation;

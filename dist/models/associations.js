"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const movieModel_1 = __importDefault(require("./movieModel"));
const theaterModel_1 = __importDefault(require("./theaterModel"));
const seatModel_1 = __importDefault(require("./seatModel"));
const showtimeModel_1 = __importDefault(require("./showtimeModel"));
const reservationModel_1 = __importDefault(require("./reservationModel"));
// Configurar las asociaciones
movieModel_1.default.hasMany(showtimeModel_1.default, { foreignKey: 'movieId' });
showtimeModel_1.default.belongsTo(movieModel_1.default, { foreignKey: 'movieId' });
theaterModel_1.default.hasMany(showtimeModel_1.default, { foreignKey: 'theaterId' });
showtimeModel_1.default.belongsTo(theaterModel_1.default, { foreignKey: 'theaterId' });
theaterModel_1.default.hasMany(seatModel_1.default, { foreignKey: 'theaterId' });
seatModel_1.default.belongsTo(theaterModel_1.default, { foreignKey: 'theaterId' });
showtimeModel_1.default.hasMany(reservationModel_1.default, { foreignKey: 'showtimeId' });
reservationModel_1.default.belongsTo(showtimeModel_1.default, { foreignKey: 'showtimeId' });
seatModel_1.default.hasMany(reservationModel_1.default, { foreignKey: 'seatId' });
reservationModel_1.default.belongsTo(seatModel_1.default, { foreignKey: 'seatId' });

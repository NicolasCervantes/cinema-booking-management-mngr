"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const theaterModel_1 = __importDefault(require("./theaterModel"));
const seatModel_1 = __importDefault(require("./seatModel"));
const showtimeModel_1 = __importDefault(require("./showtimeModel"));
const movieModel_1 = __importDefault(require("./movieModel"));
theaterModel_1.default.hasMany(seatModel_1.default, { foreignKey: 'theaterId' });
seatModel_1.default.belongsTo(theaterModel_1.default, { foreignKey: 'theaterId' });
theaterModel_1.default.hasMany(showtimeModel_1.default, { foreignKey: 'theaterId' });
showtimeModel_1.default.belongsTo(theaterModel_1.default, { foreignKey: 'theaterId' });
movieModel_1.default.hasMany(showtimeModel_1.default, { foreignKey: 'movieId' });
showtimeModel_1.default.belongsTo(movieModel_1.default, { foreignKey: 'movieId' });

"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dbConfig_1 = __importDefault(require("../config/dbConfig"));
const movieModel_1 = __importDefault(require("../models/movieModel"));
const theaterModel_1 = __importDefault(require("../models/theaterModel"));
const seatModel_1 = __importDefault(require("../models/seatModel"));
const showtimeModel_1 = __importDefault(require("../models/showtimeModel"));
const seedMovies = [
    { title: 'Inception', description: 'A mind-bending thriller', duration: 148 },
    { title: 'The Dark Knight', description: 'A superhero film', duration: 152 },
];
const seedTheaters = [
    { name: 'Theater 1', location: 'Downtown' },
    { name: 'Theater 2', location: 'Uptown' },
];
const seedSeats = (theaterId) => Array.from({ length: 50 }, (_, i) => ({
    number: `Seat ${i + 1}`,
    theaterId,
    isAvailable: true,
}));
const seedShowtimes = [
    { movieId: 1, theaterId: 1, startTime: new Date() },
    { movieId: 1, theaterId: 2, startTime: new Date() },
    { movieId: 2, theaterId: 1, startTime: new Date() },
    { movieId: 2, theaterId: 2, startTime: new Date() },
];
const seedDatabase = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield dbConfig_1.default.sync({ force: true });
        const movies = yield movieModel_1.default.bulkCreate(seedMovies);
        const theaters = yield theaterModel_1.default.bulkCreate(seedTheaters);
        for (const theater of theaters) {
            yield seatModel_1.default.bulkCreate(seedSeats(theater.id));
        }
        yield showtimeModel_1.default.bulkCreate(seedShowtimes);
        console.log('Database seeded!');
    }
    catch (err) {
        console.error('Failed to seed database', err);
    }
    finally {
        yield dbConfig_1.default.close();
    }
});
seedDatabase().catch(err => console.error(err));

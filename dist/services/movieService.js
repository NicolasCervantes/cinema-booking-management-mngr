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
const movieRepository_1 = __importDefault(require("../repositories/movieRepository"));
const registerMovie = (data) => __awaiter(void 0, void 0, void 0, function* () {
    return yield movieRepository_1.default.saveMovie(data);
});
const listMovies = () => __awaiter(void 0, void 0, void 0, function* () {
    return yield movieRepository_1.default.getAllMovies();
});
exports.default = {
    registerMovie,
    listMovies
};

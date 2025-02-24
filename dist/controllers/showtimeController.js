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
const express_1 = require("express");
const showtimeModel_1 = __importDefault(require("../models/showtimeModel"));
const router = (0, express_1.Router)();
router.get('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const showtimes = yield showtimeModel_1.default.findAll();
        res.json(showtimes);
    }
    catch (error) {
        console.error('Error fetching showtimes:', error);
        res.status(500).json({ error: 'Failed to fetch showtimes' });
    }
}));
// Nuevo endpoint para obtener los showtimes por teatro y película
router.get('/by-theater-and-movie/:theaterId/:movieId', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { theaterId, movieId } = req.params;
        const showtimes = yield showtimeModel_1.default.findAll({
            where: { theaterId, movieId },
        });
        res.json(showtimes);
    }
    catch (error) {
        console.error('Error fetching showtimes by theater and movie:', error);
        res.status(500).json({ error: 'Failed to fetch showtimes by theater and movie' });
    }
}));
exports.default = router;

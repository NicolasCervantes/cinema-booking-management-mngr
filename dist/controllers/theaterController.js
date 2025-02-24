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
const theaterModel_1 = __importDefault(require("../models/theaterModel"));
const showtimeModel_1 = __importDefault(require("../models/showtimeModel"));
const router = (0, express_1.Router)();
router.get('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const theaters = yield theaterModel_1.default.findAll();
        res.json(theaters);
    }
    catch (error) {
        console.error('Error fetching theaters:', error);
        res.status(500).json({ error: 'Failed to fetch theaters' });
    }
}));
// Nuevo endpoint para obtener los teatros por película
router.get('/by-movie/:movieId', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { movieId } = req.params;
        const theaters = yield theaterModel_1.default.findAll({
            include: [
                {
                    model: showtimeModel_1.default,
                    where: { movieId },
                    attributes: [],
                },
            ],
        });
        res.json(theaters);
    }
    catch (error) {
        console.error('Error fetching theaters by movie:', error);
        res.status(500).json({ error: 'Failed to fetch theaters by movie' });
    }
}));
exports.default = router;

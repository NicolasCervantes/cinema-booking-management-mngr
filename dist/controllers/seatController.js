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
const seatModel_1 = __importDefault(require("../models/seatModel"));
const showtimeModel_1 = __importDefault(require("../models/showtimeModel"));
const router = (0, express_1.Router)();
router.get('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { showtimeId } = req.query;
        if (!showtimeId) {
            return res.status(400).json({ error: 'showtimeId is required' });
        }
        // Convertir showtimeId a número
        const showtimeIdNumber = parseInt(showtimeId, 10);
        if (isNaN(showtimeIdNumber)) {
            return res.status(400).json({ error: 'Invalid showtimeId' });
        }
        // Obtener el showtime para obtener el theaterId
        const showtime = yield showtimeModel_1.default.findByPk(showtimeIdNumber);
        if (!showtime) {
            return res.status(404).json({ error: 'Showtime not found' });
        }
        // Obtener las sillas del teatro asociado al showtime
        const seats = yield seatModel_1.default.findAll({
            where: { theaterId: showtime.theaterId }
        });
        res.json(seats);
    }
    catch (error) {
        console.error('Error fetching seats:', error);
        res.status(500).json({ error: 'Failed to fetch seats' });
    }
}));
exports.default = router;

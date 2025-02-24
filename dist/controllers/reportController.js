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
const reservationModel_1 = __importDefault(require("../models/reservationModel"));
const seatModel_1 = __importDefault(require("../models/seatModel"));
const router = (0, express_1.Router)();
// Endpoint para obtener el reporte de reservas por showtime
router.get('/by-showtime/:showtimeId', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { showtimeId } = req.params;
        const report = yield reservationModel_1.default.findAll({
            where: { showtimeId },
            include: [
                {
                    model: seatModel_1.default,
                    attributes: ['id', 'number'], // Incluir id y number
                },
            ],
            attributes: ['id', 'name', 'email', 'createdAt', 'seatId'],
        });
        const reportData = report.map(reservation => ({
            reservationId: reservation.id,
            name: reservation.name,
            email: reservation.email,
            createdAt: reservation.createdAt,
            seatNumber: reservation.Seat ? reservation.Seat.number : 'N/A', // Incluir el número de asiento
        }));
        res.json(reportData);
    }
    catch (error) {
        console.error('Error generating report:', error);
        res.status(500).json({ error: 'Failed to generate report' });
    }
}));
exports.default = router;

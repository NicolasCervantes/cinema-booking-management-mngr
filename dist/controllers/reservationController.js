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
const awsConfig_1 = require("../config/awsConfig");
const router = (0, express_1.Router)();
router.post('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { name, email, showtimeId, seatIds } = req.body;
        if (!name || !email || !showtimeId || !seatIds || !seatIds.length) {
            return res.status(400).json({ error: 'Name, email, showtimeId, and seatIds are required' });
        }
        const reservations = [];
        for (const seatId of seatIds) {
            const reservation = yield reservationModel_1.default.create({ name, email, showtimeId, seatId });
            reservations.push(reservation);
        }
        // Actualizar el estado de las sillas a no disponibles
        yield seatModel_1.default.update({ isAvailable: false }, {
            where: {
                id: seatIds
            }
        });
        // Enviar correo electrónico de confirmación
        const params = {
            Destination: {
                ToAddresses: [email],
            },
            Message: {
                Body: {
                    Text: { Data: `Dear ${name},\n\nYour reservation is complete. Your seats are: ${seatIds.join(', ')}.\n\nThank you for choosing our service!` },
                },
                Subject: { Data: 'Reservation Confirmed' },
            },
            Source: 'nicocervantes_6@hotmail.com', // Cambia esto a tu dirección de correo electrónico verificada en SES
        };
        awsConfig_1.ses.sendEmail(params, (err, data) => {
            if (err) {
                console.error('Error sending email:', err);
            }
            else {
                console.log('Email sent:', data);
            }
        });
        res.status(201).json(reservations);
    }
    catch (error) {
        console.error('Error creating reservation:', error);
        res.status(500).json({ error: 'Failed to create reservation' });
    }
}));
router.get('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const reservations = yield reservationModel_1.default.findAll();
        res.json(reservations);
    }
    catch (error) {
        console.error('Error fetching reservations:', error);
        res.status(500).json({ error: 'Failed to fetch reservations' });
    }
}));
exports.default = router;

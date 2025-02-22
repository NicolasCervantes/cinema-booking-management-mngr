import express from 'express';
import reservationService from '../services/reservationService';

const router = express.Router();

router.post('/reservations', async (req, res) => {
    const data = req.body;
    const result = await reservationService.reserveSeats(data);
    res.status(201).json(result);
});

router.get('/reservations', async (req, res) => {
    const result = await reservationService.listReservations();
    res.status(200).json(result);
});

export default router;
import express from 'express';
import theaterService from '../services/theaterService';

const router = express.Router();

router.post('/theaters', async (req, res) => {
    const data = req.body;
    const result = await theaterService.registerTheater(data);
    res.status(201).json(result);
});

router.get('/theaters', async (req, res) => {
    const result = await theaterService.listTheaters();
    res.status(200).json(result);
});

export default router;
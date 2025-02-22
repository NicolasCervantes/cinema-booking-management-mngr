import express from 'express';
import movieService from '../services/movieService';

const router = express.Router();

router.post('/movies', async (req, res) => {
    const data = req.body;
    const result = await movieService.registerMovie(data);
    res.status(201).json(result);
});

router.get('/movies', async (req, res) => {
    const result = await movieService.listMovies();
    res.status(200).json(result);
});

export default router;
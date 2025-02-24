import { Router } from 'express';
import Movie from '../models/movieModel';

const router = Router();

router.get('/', async (req, res) => {
  try {
    const movies = await Movie.findAll();
    res.json(movies);
  } catch (error) {
    console.error('Error fetching movies:', error);
    res.status(500).json({ error: 'Failed to fetch movies' });
  }
});

export default router;
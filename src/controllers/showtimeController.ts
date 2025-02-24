import { Router } from 'express';
import Showtime from '../models/showtimeModel';

const router = Router();

router.get('/', async (req, res) => {
  try {
    const showtimes = await Showtime.findAll();
    res.json(showtimes);
  } catch (error) {
    console.error('Error fetching showtimes:', error);
    res.status(500).json({ error: 'Failed to fetch showtimes' });
  }
});

// Nuevo endpoint para obtener los showtimes por teatro y película
router.get('/by-theater-and-movie/:theaterId/:movieId', async (req, res) => {
  try {
    const { theaterId, movieId } = req.params;
    const showtimes = await Showtime.findAll({
      where: { theaterId, movieId },
    });
    res.json(showtimes);
  } catch (error) {
    console.error('Error fetching showtimes by theater and movie:', error);
    res.status(500).json({ error: 'Failed to fetch showtimes by theater and movie' });
  }
});

export default router;
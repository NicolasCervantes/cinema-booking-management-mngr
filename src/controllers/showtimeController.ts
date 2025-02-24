import { Router } from 'express';
import Showtime from '../models/showtimeModel'; // Importar showtimeModel

const router = Router();

router.get('/', async (req, res) => {
  try {
    const { movieId, theaterId } = req.query;
    const showtimes = await Showtime.findAll({
      where: {
        movieId,
        theaterId
      }
    });
    res.json(showtimes);
  } catch (error) {
    console.error('Error fetching showtimes:', error);
    res.status(500).json({ error: 'Failed to fetch showtimes' });
  }
});

export default router;
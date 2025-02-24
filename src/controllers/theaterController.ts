import { Router } from 'express';
import Theater from '../models/theaterModel';
import Showtime from '../models/showtimeModel';

const router = Router();

router.get('/', async (req, res) => {
  try {
    const theaters = await Theater.findAll();
    res.json(theaters);
  } catch (error) {
    console.error('Error fetching theaters:', error);
    res.status(500).json({ error: 'Failed to fetch theaters' });
  }
});

// Nuevo endpoint para obtener los teatros por película
router.get('/by-movie/:movieId', async (req, res) => {
  try {
    const { movieId } = req.params;
    const theaters = await Theater.findAll({
      include: [
        {
          model: Showtime,
          where: { movieId },
          attributes: [],
        },
      ],
    });
    res.json(theaters);
  } catch (error) {
    console.error('Error fetching theaters by movie:', error);
    res.status(500).json({ error: 'Failed to fetch theaters by movie' });
  }
});

export default router;
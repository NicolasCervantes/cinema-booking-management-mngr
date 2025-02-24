import { Router } from 'express';
import Theater from '../models/theaterModel';

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

export default router;
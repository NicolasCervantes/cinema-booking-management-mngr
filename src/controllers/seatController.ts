import { Router } from 'express';
import Seat from '../models/seatModel';
import Showtime from '../models/showtimeModel';

const router = Router();

router.get('/', async (req, res) => {
  try {
    const { showtimeId } = req.query;
    if (!showtimeId) {
      return res.status(400).json({ error: 'showtimeId is required' });
    }

    // Convertir showtimeId a número
    const showtimeIdNumber = parseInt(showtimeId as string, 10);
    if (isNaN(showtimeIdNumber)) {
      return res.status(400).json({ error: 'Invalid showtimeId' });
    }

    // Obtener el showtime para obtener el theaterId
    const showtime = await Showtime.findByPk(showtimeIdNumber);
    if (!showtime) {
      return res.status(404).json({ error: 'Showtime not found' });
    }

    // Obtener las sillas del teatro asociado al showtime
    const seats = await Seat.findAll({
      where: { theaterId: showtime.theaterId }
    });

    res.json(seats);
  } catch (error) {
    console.error('Error fetching seats:', error);
    res.status(500).json({ error: 'Failed to fetch seats' });
  }
});

export default router;
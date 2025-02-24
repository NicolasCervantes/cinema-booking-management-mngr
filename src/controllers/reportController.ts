import { Router } from 'express';
import Reservation from '../models/reservationModel';
import Seat from '../models/seatModel';

const router = Router();

// Endpoint para obtener el reporte de reservas por showtime
router.get('/by-showtime/:showtimeId', async (req, res) => {
  try {
    const { showtimeId } = req.params;

    const report = await Reservation.findAll({
      where: { showtimeId },
      include: [
        {
          model: Seat,
          attributes: ['id', 'number'], // Incluir id y number
        },
      ],
      attributes: ['id', 'name', 'email', 'createdAt', 'seatId'],
    });

    const reportData = report.map(reservation => ({
      reservationId: reservation.id,
      name: reservation.name,
      email: reservation.email,
      createdAt: reservation.createdAt,
      seatNumber: reservation.Seat ? reservation.Seat.number : 'N/A', // Incluir el número de asiento
    }));

    res.json(reportData);
  } catch (error) {
    console.error('Error generating report:', error);
    res.status(500).json({ error: 'Failed to generate report' });
  }
});

export default router;
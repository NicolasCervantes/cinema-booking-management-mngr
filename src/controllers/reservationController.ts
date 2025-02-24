import { Router } from 'express';
import Reservation from '../models/reservationModel';
import Seat from '../models/seatModel';
import Showtime from '../models/showtimeModel';
import { ses } from '../config/awsConfig';

const router = Router();

router.post('/', async (req, res) => {
  try {
    const { name, email, showtimeId, seatIds } = req.body;
    if (!name || !email || !showtimeId || !seatIds || !seatIds.length) {
      return res.status(400).json({ error: 'Name, email, showtimeId, and seatIds are required' });
    }

    const reservations = [];
    for (const seatId of seatIds) {
      const reservation = await Reservation.create({ name, email, showtimeId, seatId });
      reservations.push(reservation);
    }

    // Actualizar el estado de las sillas a no disponibles
    await Seat.update({ isAvailable: false }, {
      where: {
        id: seatIds
      }
    });

    // Enviar correo electrónico de confirmación
    const params = {
      Destination: {
        ToAddresses: [email],
      },
      Message: {
        Body: {
          Text: { Data: `Dear ${name},\n\nYour reservation is complete. Your seats are: ${seatIds.join(', ')}.\n\nThank you for choosing our service!` },
        },
        Subject: { Data: 'Reservation Confirmed' },
      },
      Source: 'nicocervantes_6@hotmail.com', // Cambia esto a tu dirección de correo electrónico verificada en SES
    };

    ses.sendEmail(params, (err: any, data: any) => {
      if (err) {
        console.error('Error sending email:', err);
      } else {
        console.log('Email sent:', data);
      }
    });

    res.status(201).json(reservations);
  } catch (error) {
    console.error('Error creating reservation:', error);
    res.status(500).json({ error: 'Failed to create reservation' });
  }
});

router.get('/', async (req, res) => {
  try {
    const reservations = await Reservation.findAll();
    res.json(reservations);
  } catch (error) {
    console.error('Error fetching reservations:', error);
    res.status(500).json({ error: 'Failed to fetch reservations' });
  }
});

export default router;
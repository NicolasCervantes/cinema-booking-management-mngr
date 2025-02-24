import { Router } from 'express';
import Reservation from '../models/reservationModel';
import Seat from '../models/seatModel';
import { ses } from '../config/awsConfig';

const router = Router();

router.post('/', async (req, res) => {
  try {
    const { name, email, seats } = req.body;
    if (!name || !email || !seats || !seats.length) {
      return res.status(400).json({ error: 'Name, email, and seats are required' });
    }

    // Crear la reservación
    const reservation = await Reservation.create({ name, email });

    // Actualizar el estado de las sillas a no disponibles
    await Seat.update({ isAvailable: false }, {
      where: {
        id: seats
      }
    });

    // Enviar correo electrónico de confirmación
    const params = {
      Destination: {
        ToAddresses: [email],
      },
      Message: {
        Body: {
          Text: { Data: `Dear ${name},\n\nYour reservation is complete. Your seats are: ${seats.join(', ')}.\n\nThank you for choosing our service!` },
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

    res.status(201).json(reservation);
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
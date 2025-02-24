import { expect } from 'chai';
import { before, after } from 'mocha';
import request from 'supertest';
import app from '../../src/index';
import sequelize from '../../src/config/dbConfig';
import Movie from '../../src/models/movieModel';
import Theater from '../../src/models/theaterModel';
import Seat from '../../src/models/seatModel';
import Showtime from '../../src/models/showtimeModel';
import Reservation from '../../src/models/reservationModel';

before(async () => {
  await sequelize.sync({ force: true });

  const movie = await Movie.create({ title: 'Inception', description: 'A mind-bending thriller', duration: 148 });
  const theater = await Theater.create({ name: 'Theater 1', location: 'Downtown' });
  const seat = await Seat.create({ number: 'Seat 1', theaterId: theater.id, isAvailable: true });
  const showtime = await Showtime.create({ startTime: new Date(), movieId: movie.id, theaterId: theater.id });
  await Reservation.create({ name: 'John Doe', email: 'john.doe@example.com', showtimeId: showtime.id, seatId: seat.id });
});

after(async () => {
  await sequelize.close();
});

describe('GET /api/report/by-showtime/:showtimeId', () => {
  it('should return a report of reservations for a given showtime', async () => {
    const response = await request(app).get('/api/report/by-showtime/1');
    expect(response.status).to.equal(200);
    expect(response.body).to.deep.equal([
      {
        reservationId: 1,
        name: 'John Doe',
        email: 'john.doe@example.com',
        createdAt: response.body[0].createdAt, // Ignorar la validación de la fecha exacta
        seatNumber: 'Seat 1',
      },
    ]);
  });

  it('should return an empty array if no reservations are found for the given showtime', async () => {
    const response = await request(app).get('/api/report/by-showtime/999');
    expect(response.status).to.equal(200);
    expect(response.body).to.deep.equal([]);
  });
});

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

describe('GET /api/reservations', () => {
  it('should return the created reservation', async () => {
    const response = await request(app).get('/api/reservations');
    expect(response.status).to.equal(200);
    expect(response.body).to.have.lengthOf(1);
    expect(response.body[0]).to.include({ name: 'John Doe', email: 'john.doe@example.com' });
  });
});
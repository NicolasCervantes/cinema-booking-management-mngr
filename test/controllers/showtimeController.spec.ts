import { expect } from 'chai';
import { before, after } from 'mocha';
import request from 'supertest';
import app from '../../src/index';
import sequelize from '../../src/config/dbConfig';
import Movie from '../../src/models/movieModel';
import Theater from '../../src/models/theaterModel';
import Showtime from '../../src/models/showtimeModel';

before(async () => {
  await sequelize.sync({ force: true });

  const movie = await Movie.create({ title: 'Inception', description: 'A mind-bending thriller', duration: 148 });
  const theater = await Theater.create({ name: 'Theater 1', location: 'Downtown' });
  await Showtime.create({ startTime: new Date(), movieId: movie.id, theaterId: theater.id });
});

after(async () => {
  await sequelize.close();
});

describe('GET /api/showtimes', () => {
  it('should return the created showtime', async () => {
    const response = await request(app).get('/api/showtimes');
    expect(response.status).to.equal(200);
    expect(response.body).to.have.lengthOf(1);
    expect(response.body[0]).to.include({ movieId: 1, theaterId: 1 });
  });
});
import { expect } from 'chai';
import { before, after } from 'mocha';
import request from 'supertest';
import app from '../../src/index';
import sequelize from '../../src/config/dbConfig';
import Movie from '../../src/models/movieModel';

before(async () => {
  await sequelize.sync({ force: true });
});

after(async () => {
  await sequelize.close();
});

describe('GET /api/movies', () => {
  it('should return an empty array initially', async () => {
    const response = await request(app).get('/api/movies');
    expect(response.status).to.equal(200);
    expect(response.body).to.deep.equal([]);
  });

  it('should create a new movie and return it', async () => {
    const newMovie = { title: 'Inception', description: 'A mind-bending thriller', duration: 148 };
    const response = await request(app).post('/api/movies').send(newMovie);
    expect(response.status).to.equal(201);
    expect(response.body).to.include(newMovie);
  });

  it('should return the created movie', async () => {
    const response = await request(app).get('/api/movies');
    expect(response.status).to.equal(200);
    expect(response.body).to.have.lengthOf(1);
    expect(response.body[0]).to.include({ title: 'Inception', description: 'A mind-bending thriller', duration: 148 });
  });
});
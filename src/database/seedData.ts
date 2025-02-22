import sequelize from '../config/dbConfig';
import Movie from '../models/movieModel';
import Theater from '../models/theaterModel';

const seedMovies = [
  { title: 'Inception', description: 'A mind-bending thriller', duration: 148 },
  { title: 'The Dark Knight', description: 'A superhero film', duration: 152 },
];

const seedTheaters = [
  { name: 'Theater 1', location: 'Downtown', seats: Array.from({ length: 50 }, (_, i) => `Seat ${i + 1}`) },
  { name: 'Theater 2', location: 'Uptown', seats: Array.from({ length: 50 }, (_, i) => `Seat ${i + 1}`) },
];

const seedDatabase = async () => {
  try {
    await sequelize.sync({ force: true });

    await Movie.bulkCreate(seedMovies);
    await Theater.bulkCreate(seedTheaters);

    console.log('Database seeded!');
  } catch (err) {
    console.error('Failed to seed database', err);
  } finally {
    await sequelize.close();
  }
};

seedDatabase().catch(err => console.error(err));
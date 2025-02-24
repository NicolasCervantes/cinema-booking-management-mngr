import sequelize from '../config/dbConfig';
import Movie from '../models/movieModel';
import Theater from '../models/theaterModel';
import Seat from '../models/seatModel';
import Showtime from '../models/showtimeModel';
import Reservation from '../models/reservationModel';

const seedMovies = [
  { title: 'Inception', description: 'A mind-bending thriller', duration: 148 },
  { title: 'The Dark Knight', description: 'A superhero film', duration: 152 },
];

const seedTheaters = [
  { name: 'Theater 1', location: 'Downtown' },
  { name: 'Theater 2', location: 'Uptown' },
];

const seedSeats = (theaterId: number) => Array.from({ length: 50 }, (_, i) => ({
  number: `Seat ${i + 1}`,
  theaterId,
  isAvailable: true,
}));

const seedShowtimes = [
  { movieId: 1, theaterId: 1, startTime: new Date() },
  { movieId: 1, theaterId: 2, startTime: new Date() },
  { movieId: 2, theaterId: 1, startTime: new Date() },
  { movieId: 2, theaterId: 2, startTime: new Date() },
];

const seedReservations = [
  { name: 'John Doe', email: 'john.doe@example.com', showtimeId: 1, seatId: 1 },
  { name: 'Jane Smith', email: 'jane.smith@example.com', showtimeId: 1, seatId: 2 },
  { name: 'Alice Johnson', email: 'alice.johnson@example.com', showtimeId: 2, seatId: 3 },
];

const seedDatabase = async () => {
  try {
    await sequelize.sync({ force: true });

    const movies = await Movie.bulkCreate(seedMovies);
    const theaters = await Theater.bulkCreate(seedTheaters);

    for (const theater of theaters) {
      await Seat.bulkCreate(seedSeats(theater.id));
    }

    const showtimes = await Showtime.bulkCreate(seedShowtimes);

    await Reservation.bulkCreate(seedReservations);

    console.log('Database seeded!');
  } catch (err) {
    console.error('Failed to seed database', err);
  } finally {
    await sequelize.close();
  }
};

seedDatabase().catch(err => console.error(err));
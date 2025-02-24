import Movie from './movieModel';
import Theater from './theaterModel';
import Seat from './seatModel';
import Showtime from './showtimeModel';
import Reservation from './reservationModel';

// Configurar las asociaciones
Movie.hasMany(Showtime, { foreignKey: 'movieId' });
Showtime.belongsTo(Movie, { foreignKey: 'movieId' });

Theater.hasMany(Showtime, { foreignKey: 'theaterId' });
Showtime.belongsTo(Theater, { foreignKey: 'theaterId' });

Theater.hasMany(Seat, { foreignKey: 'theaterId' });
Seat.belongsTo(Theater, { foreignKey: 'theaterId' });

Showtime.hasMany(Reservation, { foreignKey: 'showtimeId' });
Reservation.belongsTo(Showtime, { foreignKey: 'showtimeId' });

Seat.hasMany(Reservation, { foreignKey: 'seatId' });
Reservation.belongsTo(Seat, { foreignKey: 'seatId' });
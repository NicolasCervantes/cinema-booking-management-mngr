import Theater from './theaterModel';
import Seat from './seatModel';
import Showtime from './showtimeModel';
import Movie from './movieModel';

Theater.hasMany(Seat, { foreignKey: 'theaterId' });
Seat.belongsTo(Theater, { foreignKey: 'theaterId' });

Theater.hasMany(Showtime, { foreignKey: 'theaterId' });
Showtime.belongsTo(Theater, { foreignKey: 'theaterId' });

Movie.hasMany(Showtime, { foreignKey: 'movieId' });
Showtime.belongsTo(Movie, { foreignKey: 'movieId' });
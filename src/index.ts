import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors'; // Importar cors
import movieController from './controllers/movieController';
import theaterController from './controllers/theaterController';
import reservationController from './controllers/reservationController';
import showtimeController from './controllers/showtimeController'; // Importar showtimeController
import seatController from './controllers/seatController'; // Importar seatController
import reportController from './controllers/reportController'; // Importar reportController
import sequelize from './config/dbConfig';
import './models/associations'; // Importar las asociaciones

const app = express();
app.use(bodyParser.json());

app.disable('x-powered-by');
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Configurar cabeceras y cors
app.use((_, res, next) => {
  res.header('Access-Control-Allow-Origin', '*'); // NOSONAR
  res.header('Access-Control-Allow-Headers', '*'); // NOSONAR
  res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE'); // NOSONAR
  res.header('Allow', 'GET, POST, OPTIONS, PUT, DELETE');
  next();
});

sequelize.authenticate()
  .then(() => {
    console.log('Database connected');
    // Iniciar el servidor solo si la conexión a la base de datos es exitosa
    app.listen(3000, () => {
      console.log('Server is running on port 3000');
    });
  })
  .catch(err => {
    console.error('Failed to connect to database', err);
    process.exit(1); // Salir del proceso si la conexión a la base de datos falla
  });

app.use('/api/movies', movieController);
app.use('/api/theaters', theaterController);
app.use('/api/reservations', reservationController);
app.use('/api/showtimes', showtimeController); // Agregar la ruta para showtimes
app.use('/api/seats', seatController); // Agregar la ruta para seats
app.use('/api/report', reportController); // Agregar la ruta para report

app.get('/', (req, res) => {
  res.send('Welcome to the Movie Reservation API');
});

export default app;
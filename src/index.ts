import express from 'express';
import bodyParser from 'body-parser';
import movieController from './controllers/movieController';
import theaterController from './controllers/theaterController';
import reservationController from './controllers/reservationController';

const app = express();
app.use(bodyParser.json());

app.use('/api', movieController);
app.use('/api', theaterController);
app.use('/api', reservationController);

app.listen(3000, () => {
    console.log('Server is running on port 3000');
});

export default app;
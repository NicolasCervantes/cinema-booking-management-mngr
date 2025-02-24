"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
const movieController_1 = __importDefault(require("./controllers/movieController"));
const theaterController_1 = __importDefault(require("./controllers/theaterController"));
const reservationController_1 = __importDefault(require("./controllers/reservationController"));
const showtimeController_1 = __importDefault(require("./controllers/showtimeController")); // Importar showtimeController
const seatController_1 = __importDefault(require("./controllers/seatController")); // Importar seatController
const reportController_1 = __importDefault(require("./controllers/reportController")); // Importar reportController
const dbConfig_1 = __importDefault(require("./config/dbConfig"));
require("./models/associations"); // Importar las asociaciones
const app = (0, express_1.default)();
app.use(body_parser_1.default.json());
app.disable('x-powered-by');
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: false }));
// Configurar cabeceras y cors
app.use((_, res, next) => {
    res.header('Access-Control-Allow-Origin', '*'); // NOSONAR
    res.header('Access-Control-Allow-Headers', '*'); // NOSONAR
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE'); // NOSONAR
    res.header('Allow', 'GET, POST, OPTIONS, PUT, DELETE');
    next();
});
dbConfig_1.default.authenticate()
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
app.use('/api/movies', movieController_1.default);
app.use('/api/theaters', theaterController_1.default);
app.use('/api/reservations', reservationController_1.default);
app.use('/api/showtimes', showtimeController_1.default); // Agregar la ruta para showtimes
app.use('/api/seats', seatController_1.default); // Agregar la ruta para seats
app.use('/api/report', reportController_1.default); // Agregar la ruta para report
app.get('/', (req, res) => {
    res.send('Welcome to the Movie Reservation API');
});
exports.default = app;

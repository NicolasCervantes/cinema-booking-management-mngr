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
const app = (0, express_1.default)();
app.use(body_parser_1.default.json());
app.use('/api', movieController_1.default);
app.use('/api', theaterController_1.default);
app.use('/api', reservationController_1.default);
app.listen(3000, () => {
    console.log('Server is running on port 3000');
});
exports.default = app;

"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const reservationRepository_1 = __importDefault(require("../repositories/reservationRepository"));
const awsConfig_1 = require("../config/awsConfig");
const reserveSeats = (data) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield reservationRepository_1.default.saveReservation(data);
    yield sendEmailNotification(data.email, result);
    return result;
});
const listReservations = () => __awaiter(void 0, void 0, void 0, function* () {
    return yield reservationRepository_1.default.getAllReservations();
});
const sendEmailNotification = (email, reservation) => __awaiter(void 0, void 0, void 0, function* () {
    const params = {
        Destination: {
            ToAddresses: [email]
        },
        Message: {
            Body: {
                Text: { Data: `Your reservation is confirmed: ${JSON.stringify(reservation)}` }
            },
            Subject: { Data: 'Reservation Confirmation' }
        },
        Source: 'your-email@example.com'
    };
    yield awsConfig_1.ses.sendEmail(params).promise();
});
exports.default = {
    reserveSeats,
    listReservations
};

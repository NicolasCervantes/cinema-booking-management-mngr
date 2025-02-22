import Reservation from '../models/reservationModel';

const saveReservation = async (data: any) => {
    return await Reservation.create(data);
};

const getAllReservations = async () => {
    return await Reservation.findAll();
};

export default {
    saveReservation,
    getAllReservations
};
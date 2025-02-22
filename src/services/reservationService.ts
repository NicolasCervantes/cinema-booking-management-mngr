import reservationRepository from '../repositories/reservationRepository';
import { ses } from '../config/awsConfig';

const reserveSeats = async (data: any) => {
    const result = await reservationRepository.saveReservation(data);
    await sendEmailNotification(data.email, result);
    return result;
};

const listReservations = async () => {
    return await reservationRepository.getAllReservations();
};

const sendEmailNotification = async (email: string, reservation: any) => {
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

    await ses.sendEmail(params).promise();
};

export default {
    reserveSeats,
    listReservations
};
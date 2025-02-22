import theaterRepository from '../repositories/theaterRepository';

const registerTheater = async (data: any) => {
    return await theaterRepository.saveTheater(data);
};

const listTheaters = async () => {
    return await theaterRepository.getAllTheaters();
};

export default {
    registerTheater,
    listTheaters
};
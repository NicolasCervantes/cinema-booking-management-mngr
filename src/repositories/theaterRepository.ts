import Theater from '../models/theaterModel';

const saveTheater = async (data: any) => {
    return await Theater.create(data);
};

const getAllTheaters = async () => {
    return await Theater.findAll();
};

export default {
    saveTheater,
    getAllTheaters
};
import Movie from '../models/movieModel';

const saveMovie = async (data: any) => {
    return await Movie.create(data);
};

const getAllMovies = async () => {
    return await Movie.findAll();
};

export default {
    saveMovie,
    getAllMovies
};
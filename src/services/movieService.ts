import movieRepository from '../repositories/movieRepository';

const registerMovie = async (data: any) => {
    return await movieRepository.saveMovie(data);
};

const listMovies = async () => {
    return await movieRepository.getAllMovies();
};

export default {
    registerMovie,
    listMovies
};
import http from './httpService';
import { apiUrl } from "../config.json";

const apiEndPoint = `${apiUrl}/movies`; 

function movieUrl(id) {
    return `${apiEndPoint}/${id}`;
}

export function getMovies() { 
    return http.get(apiEndPoint);
}

export async function getMovie(movieId) {
    return await http.get(movieUrl(movieId));
}

export async function saveMovie(movie) {
    if (movie._id) {
        const body = { ...movie };
        delete body._id;
        return await http.put({
            url: movieUrl(movie._id),
            data: body,
           type:'PUT'
    });
    }

    return http.post(`${apiEndPoint}`,movie)
}
export function deleteMovie(movieId) {
    return http.delete({
        url: movieUrl(movieId),
        type:'DELETE'
    });
}
import {comment} from './comment.js';
import {PostingCmt} from './comment.js';
import {genresApi} from './movie_posting.js';
import {respondApi} from './search.js';

const url = new URL(location.href);
const idParams = +url.searchParams.get('id');
const titleParams = url.searchParams.get('title');
const $div = document.querySelector('#div');
const $h1 = document.querySelector('#h1');

document.addEventListener('DOMContentLoaded', () => {
    movieInfo();
    PostingCmt();
    comment();
});

$h1.addEventListener('click', () => {
    history.go(-1);
});

$div.addEventListener('click', e => {
    if (e.target.id === 'img') {
        alert(`영화 ID: ${idParams}`);
    }
});

async function movieInfo() {
    const moviesInfo = await respondApi(titleParams);
    const genreInfo = await genresApi();
    const genreList = genreInfo['genres'];

    const selectMovie = moviesInfo.find(movie => movie['id'] === idParams);
    const selectMovieGenre = selectMovie['genre_ids'];

    const movieGenres = selectMovieGenre.map(genre => {
        return genreList.filter(genreNum => {
            return genreNum['id'] === genre;
        })[0]['name'];
    });

    $div.innerHTML = `<img src="https://image.tmdb.org/t/p/w200/${selectMovie['poster_path']}" id="img">
                    <div id="movie-info">
                        <p id="title">${selectMovie['title']}</p>
                        <p id="vote-avg">평점 : ${selectMovie['vote_average']}</p>
                        <p>장르 : ${movieGenres}</p>
                    </div>
                    <p id="overview">${selectMovie['overview']}</p> `;
}

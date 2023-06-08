export const postingMovie = async () => {
    const moviesInfo = await respondApi('ko-KR');
    const $cardList = document.querySelector('#card-list');

    $cardList.innerHTML = moviesInfo
        .map(
            movie =>
                `<li class="movie-card" id="${movie['id']}">
                    <img class="movie-img" src="https://image.tmdb.org/t/p/w200/${movie['poster_path']}">
                    <p class="movie-title">${movie['title']}</p>
                </li>`
        )
        .join('');
};

export async function respondApi(language) {
    const options = {
        method: 'GET',
        headers: {
            accept: 'application/json',
            Authorization:
                'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI1ZGRkOWQyYWVhMzc4ZTA4NTVhZjM3YzQzMDBiMTcxYiIsInN1YiI6IjY0NzM0NDkwYTE5OWE2MDBkYzRjYjk3YiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ._SbUcrThmlbJYXmIZfzbzJZmIUVqhuFVIoXK5mJmMHw'
        }
    };

    const response = await fetch(`https://api.themoviedb.org/3/movie/top_rated?language=${language}&page=1`, options).then(response => response.json());
    const moviesinfo = response['results'];

    return moviesinfo;
}

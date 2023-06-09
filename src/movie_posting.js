export const postingMovie = async () => {
    const $movieCombo = document.querySelector('#movie-combo');
    let moviesInfo;

    switch ($movieCombo.value) {
        case '현재 상영중':
            moviesInfo = await NowPlayingApi();
            break;
        case '개봉 예정':
            moviesInfo = await UpcomingApi();
            break;
        case '인기순':
            moviesInfo = await PopularApi();
            break;
        case '평점 높은순':
            moviesInfo = await TopRatedApi();
            break;
    }
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

export async function NowPlayingApi() {
    const options = {
        method: 'GET',
        headers: {
            accept: 'application/json',
            Authorization:
                'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI1ZGRkOWQyYWVhMzc4ZTA4NTVhZjM3YzQzMDBiMTcxYiIsInN1YiI6IjY0NzM0NDkwYTE5OWE2MDBkYzRjYjk3YiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ._SbUcrThmlbJYXmIZfzbzJZmIUVqhuFVIoXK5mJmMHw'
        }
    };

    const response = await fetch('https://api.themoviedb.org/3/movie/now_playing?language=ko-KR&page=1', options).then(response => response.json());

    return response['results'];
}

export async function PopularApi() {
    const options = {
        method: 'GET',
        headers: {
            accept: 'application/json',
            Authorization:
                'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI1ZGRkOWQyYWVhMzc4ZTA4NTVhZjM3YzQzMDBiMTcxYiIsInN1YiI6IjY0NzM0NDkwYTE5OWE2MDBkYzRjYjk3YiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ._SbUcrThmlbJYXmIZfzbzJZmIUVqhuFVIoXK5mJmMHw'
        }
    };

    const response = await fetch('https://api.themoviedb.org/3/movie/popular?language=ko-KR&page=1', options).then(response => response.json());

    return response['results'];
}

export async function TopRatedApi() {
    const options = {
        method: 'GET',
        headers: {
            accept: 'application/json',
            Authorization:
                'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI1ZGRkOWQyYWVhMzc4ZTA4NTVhZjM3YzQzMDBiMTcxYiIsInN1YiI6IjY0NzM0NDkwYTE5OWE2MDBkYzRjYjk3YiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ._SbUcrThmlbJYXmIZfzbzJZmIUVqhuFVIoXK5mJmMHw'
        }
    };

    const response = await fetch(`https://api.themoviedb.org/3/movie/top_rated?language=ko-KR&page=1`, options).then(response => response.json());
    const moviesinfo = response['results'];

    return moviesinfo;
}

export async function UpcomingApi() {
    const options = {
        method: 'GET',
        headers: {
            accept: 'application/json',
            Authorization:
                'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI1ZGRkOWQyYWVhMzc4ZTA4NTVhZjM3YzQzMDBiMTcxYiIsInN1YiI6IjY0NzM0NDkwYTE5OWE2MDBkYzRjYjk3YiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ._SbUcrThmlbJYXmIZfzbzJZmIUVqhuFVIoXK5mJmMHw'
        }
    };

    const response = await fetch('https://api.themoviedb.org/3/movie/upcoming?language=ko-KR&page=1', options).then(response => response.json());

    return response['results'];
}

export async function genresApi() {
    const options = {
        method: 'GET',
        headers: {
            accept: 'application/json',
            Authorization:
                'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI1ZGRkOWQyYWVhMzc4ZTA4NTVhZjM3YzQzMDBiMTcxYiIsInN1YiI6IjY0NzM0NDkwYTE5OWE2MDBkYzRjYjk3YiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ._SbUcrThmlbJYXmIZfzbzJZmIUVqhuFVIoXK5mJmMHw'
        }
    };

    const response = await fetch('https://api.themoviedb.org/3/genre/movie/list?language=ko', options).then(response => response.json());

    return response;
}

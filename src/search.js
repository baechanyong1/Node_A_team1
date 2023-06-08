export const searchinghMovie = async $searchInput => {
    const searchValue = $searchInput.value;
    const searchInfo = await respondApi(searchValue);
    const $searchCard = document.querySelector('#card-list');

    $searchCard.innerHTML = searchInfo
        .map(
            movie =>
                `<li class="movie-card" id="${movie['id']}">
                    <img src="https://image.tmdb.org/t/p/w200/${movie['poster_path']}">
                    <p class="movie-title">${movie['title']}</p>
                </li>`
        )
        .join('');
};

async function respondApi(searchValue) {
    const options = {
        method: 'GET',
        headers: {
            accept: 'application/json',
            Authorization:
                'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI3NGVkZTIyNzIwZmRjYTFjMTgzZWU1OTIwOWMzNGZmYyIsInN1YiI6IjY0NzgzNDA3MGUyOWEyMDBmOTgwM2M3NSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.HQEkE95PvJxlsB7tV6CqCGQZ1G146f-amX20DO6NSeg'
        }
    };

    const response = await fetch(`https://api.themoviedb.org/3/search/movie?query=${searchValue}&include_adult=false&language=ko-KR&page=1`, options).then(response => response.json());
    const searchInfo = response['results'];

    return searchInfo;
}

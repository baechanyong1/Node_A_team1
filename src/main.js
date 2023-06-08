import {postingMovie} from './movie_posting.js';
import {searchinghMovie} from './search.js';

postingMovie();

const $searchForm = document.querySelector('#search-form');
const $searchInput = document.querySelector('#search-input');
const $h1 = document.querySelector('#h1');

$h1.addEventListener('click', () => {
    window.location.reload();
});

$searchForm.addEventListener('submit', event => {
    event.preventDefault();
    console.log($searchInput);

    if (!$searchInput.value) {
        alert('영화 제목을 입력해주세요.');
        $searchInput.focus();
    } else {
        searchinghMovie($searchInput);
    }
});

const $cardList = document.querySelector('#card-list');

$cardList.addEventListener('click', event => {
    if (event.target === $cardList) {
        return;
    }
    if (event.target.matches('.movie-card')) {
        location.href = `newPage.html?id=${event.target.id}`;
    } else {
        location.href = `newPage.html?id=${event.target.parentNode.id}`;
    }
});

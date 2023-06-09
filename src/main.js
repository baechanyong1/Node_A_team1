import {postingMovie} from './movie_posting.js';
import {searchingMovie} from './search.js';

const $searchForm = document.querySelector('#search-form');
const $searchInput = document.querySelector('#search-input');
const $h1 = document.querySelector('#h1');
const $movieCombo = document.querySelector('#movie-combo');

const url = new URL(location.href);
const titleParams = url.searchParams.get('search');

document.addEventListener('DOMContentLoaded', () => {
    if (!titleParams) {
        postingMovie();
    } else {
        searchingMovie(titleParams);
    }
});

$movieCombo.addEventListener('change', () => {
    $movieCombo[$movieCombo.selectedIndex].setAttribute('selected', '');

    postingMovie();
});

$h1.addEventListener('click', () => {
    location.href = '/';
});

$searchForm.addEventListener('submit', event => {
    event.preventDefault();

    if (!$searchInput.value) {
        alert('영화 제목을 입력해주세요.');
        $searchInput.focus();
    } else {
        location.href = `index.html?search=${$searchInput.value}`;
    }
});

const $cardList = document.querySelector('#card-list');

$cardList.addEventListener('click', e => {
    if (e.target === $cardList) {
        return;
    }
    if (e.target.matches('.movie-card')) {
        location.href = `newPage.html?id=${e.target.id}&title=${e.target.querySelector('.movie-title').textContent}`;
    } else {
        location.href = `newPage.html?id=${e.target.parentNode.id}&title=${e.target.parentNode.querySelector('.movie-title').textContent}`;
    }
});

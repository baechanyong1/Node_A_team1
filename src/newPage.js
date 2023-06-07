import { respondApi } from "./movie_posting.js";
import { comment } from "./comment.js";
import { PostingCmt } from "./comment.js";

const url = new URL(location.href);
const idParams = +url.searchParams.get('id');
const $div = document.querySelector('#div');



document.addEventListener('DOMContentLoaded', () => {
    movieInfo();
    PostingCmt(); // 영화 상세 페이지에서 댓글 달면 로컬 스토리지에 저장되는 부분
    comment(); // 코멘트 입력과 등록 이벤트 관련된 내용은 이 함수에 다 있음
})

async function movieInfo() {
    const moviesInfo = await respondApi('ko-KR');

    const selectMovie = moviesInfo.find(movie => movie['id'] === idParams);

    $div.innerHTML = `<img src="https://image.tmdb.org/t/p/w200/${selectMovie['poster_path']}" id="img">
                    <p id="title">${selectMovie['title']}</p>
                    <p id="overview">${selectMovie['overview']}</p>
                    <p id="vote-avg">${selectMovie['vote_average']}</p>`;


};

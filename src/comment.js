const $txt = document.querySelector('#txt');
const $form = document.querySelector('#form');
const $reset = document.querySelector('#reset');
const $id = document.querySelector('#id');
const $pwd = document.querySelector('#pwd');
const $allReset = document.querySelector('#all-reset'); // 전체 초기화 버튼
const $form2 = document.querySelector('#form2');
const $cmt = document.querySelector('#cmt');

const url = new URL(location.href);
const idParams = +url.searchParams.get('id');

const $cmtCrtBtn = document.querySelector('#cmtCrtBtn'); // 코멘트 수정 버튼
const $cmtDltBtn = document.querySelector('#cmtDltBtn'); // 코멘트 삭제 버튼
const crtTxtArea = document.querySelector('#crtTxtArea'); // 코멘트 수정 텍스트 에어리어
const crtBtn = document.querySelector('#crtBtn'); // 수정된 코멘트 등록 버튼

export const comment = async () => {
    $reset.addEventListener('click', () => {
        localStorage.removeItem('id');
        localStorage.removeItem('pwd');

        window.location.reload();
    });

    $allReset.addEventListener('click', () => {
        localStorage.clear();
        window.location.reload();
    });

    $form.addEventListener('submit', e => {
        e.preventDefault();

        localStorage.setItem('id', $id.value);
        localStorage.setItem('pwd', $pwd.value);

        $id.value = '';
        $pwd.value = '';
        $form.style.display = 'none';
    });

    $txt.addEventListener('click', () => {
        if (!localStorage.getItem('id')) {
            $form.style.display = 'block';
        } else {
            $txt.removeAttribute('readonly');
        }
    });

    /**등록 눌러서 댓글이 등록되게 하는 기능 */
    $form2.addEventListener('submit', e => {
        e.preventDefault();

        const cmtSto = Object.keys(localStorage)
            .filter(item => !isNaN(item))
            .sort((a, b) => b - a);
        let priKey = 0;

        if (!cmtSto.includes('1')) {
            priKey = 1;
        } else {
            priKey = +cmtSto[0] + 1;
        }

        const obj = {
            id: localStorage.getItem('id'),
            cmt: $txt.value,
            movieId: idParams
        };

        localStorage.setItem(priKey, JSON.stringify(obj));

        window.location.reload();
    });

    // $cmtCrtBtn.addEventListener('click', () => {
    //     console.log('수정 버튼');
    // document.getElementById("crtTxtArea").style.display="inline"; // 수정 버튼을 클릭하면 수정을 위한 텍스트 에어리어와
    // document.getElementById("crtBtn").style.display="inline"; // 수정된 댓글을 등록하는 버튼이 나옴
    // });
    // 코멘트가 여러개이니까 querySelectorAll로 가야했을까?

    // $cmtDltBtn.addEventListener('click', () => {
    //     console.log('삭제 버튼');
    //  localStorage.removeItem();

    // });
}; // comment 함수 닫는 괄호

/**
 * 영화 상세 페이지에서 댓글 달면 로컬 스토리지에 저장되는 부분
 */
export function PostingCmt() {
    const cmtSto = Object.keys(localStorage)
        .filter(item => !isNaN(item))
        .sort((a, b) => b - a);

    if (!localStorage['id']) {
        $reset.style.display = 'none';
    } else {
        $reset.style.display = 'block';
    }

    $cmt.innerHTML = cmtSto
        .map(item => {
            const id = JSON.parse(localStorage.getItem(item))['id'];
            const cmt = JSON.parse(localStorage.getItem(item))['cmt'];
            const movieId = JSON.parse(localStorage.getItem(item))['movieId'];

            if (movieId === idParams) {
                return `<li class="cmt-li">
                        <p id="cmt-id">${id}</p>
                        <p id="cmt-review">${cmt}</p>

                        <button id="cmtCrtBtn" style="margin-left: 5px;
                        margin-bottom: 5px;">수정</button>
                        
                        <button id="cmtDltBtn">삭제</button><br>
                        
                        <textarea id="crtTxtArea" style="margin-left:5px; display:inline;" cols="70" rows="4" placeholder="수정할 댓글을 입력하세요."></textarea>

                        <button id="crtBtn" style="margin-bottom:5px; display:inline;">등록</button> // 수정 텍스트 에어이러와 수정 코멘트 버튼은 display:none으로 바꿀 예정
                        
                        </li>`;
            }
        })
        .join('');
}

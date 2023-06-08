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

const $cmtCrtBtn = document.querySelector('#cmtCrtBtn'); // 코멘트 수정 버튼, 미사용, 삭제 가능
const $cmtDltBtn = document.querySelector('#cmtDltBtn'); // 코멘트 삭제 버튼, 미사용, 삭제 가능
const crtTxtArea = document.querySelector('#crtTxtArea'); // 코멘트 수정 텍스트 에어리어, 미사용, 삭제 가능
const crtBtn = document.querySelector('#crtBtn'); // 수정된 코멘트 등록 버튼, 미사용, 삭제 가능

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
            movieId: idParams,
            cmtKey: priKey
        };

        localStorage.setItem(priKey, JSON.stringify(obj)); // JSON.stringify: 객체를 string 타입으로 저장함

        window.location.reload();
    });

    $cmt.addEventListener('click', event => {
        // console.log(event.target.id);
        if (event.target.className === 'cmtDltBtn') {
            // 댓글 삭제
            localStorage.removeItem(event.target.closest('li').id);
            window.location.reload();
        }
        if (event.target.className === 'cmtCrtBtn') {
            // 댓글 수정용 텍스트 에어리어 등장

            event.target.parentNode.querySelector('.crtTxtArea').style.display = 'inline';

            event.target.parentNode.querySelector('.crtBtn').style.display = 'inline';
        }
        //
        // console.log(event.target.className); // 현재 클릭한 노드의 클래스 네임이 무엇인지
        // console.log(event.target.closest('li').id); // 현재 클릭한 댓글의 ID가 몇인지
        if (event.target.className === 'crtBtn') {
            // 댓글 수정 기능 작성 중

            const obj = {
                id: event.target.closest('li').id,
                cmt: event.target.parentNode.querySelector('.crtTxtArea').value, // 수정용 textarea에 입력한 내용을 가져오는 코드
                movieId: idParams,
                cmtKey: event.target.closest('li').id
            };
            localStorage.setItem(`${event.target.closest('li').id}`, JSON.stringify(obj));

            window.location.reload();
        }
    }); // cmt.addEventListener 닫는 괄호
}; // comment 함수 닫는 괄호

/**
 * 영화 상세 페이지에서 댓글 달면 로컬 스토리지에 저장되는 부분
 */
export function PostingCmt() {
    const cmtSto = Object.keys(localStorage)
        .filter(item => !isNaN(item))
        .sort((a, b) => b - a);
    console.log(cmtSto);

    if (!localStorage['id']) {
        $reset.style.display = 'none';
    } else {
        $reset.style.display = 'block';
    }

    $cmt.innerHTML = cmtSto
        .map(item => {
            const id = JSON.parse(localStorage.getItem(item))['id']; //JSON.parse: string 타입으로 로컬스토리지에 저장했던 데이터를 객체 타입으로 변환함
            const cmt = JSON.parse(localStorage.getItem(item))['cmt'];
            const movieId = JSON.parse(localStorage.getItem(item))['movieId'];
            const cmtKey = JSON.parse(localStorage.getItem(item))['cmtKey'];

            if (movieId === idParams) {
                return `<li class="cmt-li" id="${cmtKey}">
                        <p class="cmt-id">${id}</p>
                        <p class="cmt-review">${cmt}</p>

                        <button class="cmtCrtBtn" style="margin-left: 5px;
                        margin-bottom: 5px;">수정</button>
                        
                        <button class="cmtDltBtn">삭제</button><br>
                        
                        <textarea class="crtTxtArea" style="margin-left:5px; display:none;" cols="70" rows="4" placeholder="수정할 내용을 입력해주세요. 현재 입력 내용은 ${cmt} 입니다."></textarea>

                        <button class="crtBtn" style="margin-bottom:5px; display:none;">등록</button>
                        
                        </li>`;
                // 유저 ID를 기준으로 수정삭제를 진행할 경우 유저 ID가 같다면 여러 댓글이 동시 수정, 삭제될 위험이 존재하여
                // 댓글을 감싸는 <li>에 ID를 추가하여 댓글을 특정할수있도록 하였고
                // 수정, 삭제 버튼을 누르면 그 버튼의 코멘트 ID(변수 cmtKey)와 일치하는 댓글만 수정 삭제 되도록 하였음

                // 추가, 수정 버튼을 눌러서 나오는 텍스트 에어리어의 placeholder는
                // 기존에 등록되었던 댓글이어야 함
            }
        })
        .join('');
}

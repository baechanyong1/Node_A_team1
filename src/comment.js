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

        if (!$id.value && !$pwd.value) {
            // 비어있다면 alert창 출력
            alert('ID와 PW를 입력해주세요.');
        } else if (!$id.value) {
            alert('ID를 입력해주세요.');
        } else if (!$pwd.value) {
            alert('PW를 입력해주세요.');
        } else {
            // ID와 PW값이 '' 비어있지않다면 setItem
            localStorage.setItem('id', $id.value);
            localStorage.setItem('pwd', $pwd.value);

            $id.value = '';
            $pwd.value = '';
            $form.style.display = 'none';
        }
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

        if (!$txt.value) {
            // 비어있다면 alert창 출력
            alert('댓글을 입력해주세요');
        } else {
            const cmtSto = Object.keys(localStorage)
                .filter(item => !isNaN(item))
                .sort((a, b) => b - a);
            let cmtKey = 0;

            if (!cmtSto.includes('1')) {
                cmtKey = 1;
            } else {
                cmtKey = +cmtSto[0] + 1;
            }

            const obj = {
                cmtKey: cmtKey,
                userId: localStorage.getItem('id'),
                cmt: $txt.value,
                movieId: idParams
            };
            // 코멘트 입력 칸이 비어있지 않다면 setItem
            localStorage.setItem(cmtKey, JSON.stringify(obj));

            window.location.reload();
        }
    });

    let duplicationCheck = true;
    $cmt.addEventListener('click', e => {
        if (e.target.className === 'cmtDltBtn') {
            if (e.target.closest('li').querySelector('.user-id').id !== localStorage.getItem('id')) {
                alert('아이디가 일치하지 않습니다.');
            } else {
                if (confirm('댓글을 정말로 삭제하시겠습니까?')) {
                    // 댓글 삭제
                    localStorage.removeItem(e.target.closest('li').id);

                    window.location.reload();
                }
            }
        } else if (e.target.className === 'cmtCrtBtn' && duplicationCheck) {
            if (e.target.closest('li').querySelector('.user-id').id !== localStorage.getItem('id')) {
                alert('아이디가 일치하지 않습니다.');
            } else {
                const cmtReview = e.target.closest('li').querySelector('.cmt-review');

                // 댓글 수정용 텍스트 에어리어 등장
                cmtReview.removeAttribute('readonly');
                cmtReview.style.border = '1px solid';
                cmtReview.select();
                e.target.innerText = '등록';

                duplicationCheck = false;
            }
        } else if (e.target.className === 'cmtCrtBtn' && !duplicationCheck) {
            if (confirm('댓글을 정말로 수정하시겠습니까?')) {
                const key = e.target.closest('li').id;
                // 댓글 수정 기능 작성 중
                const mdfSto = {
                    cmtKey: JSON.parse(localStorage.getItem(key))['cmtKey'],
                    userId: JSON.parse(localStorage.getItem(key))['userId'],
                    cmt: e.target.closest('li').querySelector('.cmt-review').value, // 수정용 textarea에 입력한 내용을 가져오는 코드
                    movieId: JSON.parse(localStorage.getItem(key))['movieId']
                };

                localStorage.setItem(key, JSON.stringify(mdfSto));

                window.location.reload();
            } else {
                window.location.reload();
            }
        }
    });
};

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
            const userId = JSON.parse(localStorage.getItem(item))['userId']; //JSON.parse: string 타입으로 로컬스토리지에 저장했던 데이터를 객체 타입으로 변환함
            const cmt = JSON.parse(localStorage.getItem(item))['cmt'];
            const movieId = JSON.parse(localStorage.getItem(item))['movieId'];
            const cmtKey = JSON.parse(localStorage.getItem(item))['cmtKey'];

            if (movieId === idParams) {
                return `<li class="cmt-li" id="${cmtKey}">
                        <p class="user-id" id="${userId}">사용자 아이디 : ${userId}</p>
                        <textarea class="cmt-review" cols="50" rows="5" readonly>${cmt}</textarea><br>
                        <div class="btn-div">
                            <button class="cmtCrtBtn">수정</button>
                            <button class="cmtDltBtn">삭제</button>
                        </div>
                        </li>`;
                // 유저 ID를 기준으로 수정삭제를 진행할 경우 유저 ID가 같다면 여러 댓글이 동시 수정, 삭제될 위험이 존재하여
                // 댓글을 감싸는 <li>에 ID를 추가하여 댓글을 특정할수있도록 하였고
                // 수정, 삭제 버튼을 누르면 그 버튼의 코멘트 ID(변수 cmtKey)와 일치하는 댓글만 수정 삭제 되도록 하였음
            }
        })
        .join('');
}

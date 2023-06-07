const $txt = document.querySelector('#txt');
const $form = document.querySelector('#form');
const $reset = document.querySelector('#reset');
const $id = document.querySelector('#id');
const $pwd = document.querySelector('#pwd');
const $allReset = document.querySelector('#all-reset');
const $form2 = document.querySelector('#form2');
const $cmt = document.querySelector('#cmt');

const url = new URL(location.href);
const idParams = +url.searchParams.get('id');

export const comment = async () => {
    $reset.addEventListener('click', () => {
        localStorage.removeItem('id');
        localStorage.removeItem('pwd');

        window.location.reload();
    });;

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

    $form2.addEventListener('submit', e => {
        e.preventDefault();

        const cmtSto = Object.keys(localStorage).filter(item => !isNaN(item)).sort((a, b) => b - a);
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
}

export function PostingCmt() {
    const cmtSto = Object.keys(localStorage).filter(item => !isNaN(item)).sort((a, b) => b - a);
    
    if (!localStorage['id']) {
        $reset.style.display = 'none';
    } else {
        $reset.style.display = 'blaock';
    }

    $cmt.innerHTML = cmtSto.map(item => {
        const id = JSON.parse(localStorage.getItem(item))['id'];
        const cmt = JSON.parse(localStorage.getItem(item))['cmt'];
        const movieId = JSON.parse(localStorage.getItem(item))['movieId'];

        if (movieId === idParams) {
            return `<li class="cmt-li">
                        <p id="cmt-id">${id}</p>
                        <p id="cmt-review">${cmt}</p>
                    </li>`
        }
    }).join('');
}

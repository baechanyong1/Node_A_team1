// <index.html>의 드롭다운 버튼과 연결
const $sort = document.querySelector('#dropdownMenuButton1');
const $sort1 = document.querySelector('#dropdown-item1');
const $sort2 = document.querySelector('#dropdown-item2');

console.log($sort1);

// consol.log(<p class = "movie-title"> "제목")
$sort.addEventListener('click', () => {
    const $movie_title = document.querySelectorAll('.movie-title');
    const sortedTitles = Array.from($movie_title);

    sortedTitles.forEach(title => {
        console.log(title);
    });
});

// 카드 오름차순 정렬 (a - b)
// <index.html> id="dropdown-item" href="#" onclick="sort1" 드롭다운 하위버튼과 연결
// 숫자(number) > 한글(kr => 가나다) > 영어(en => ABC)
$sort1.addEventListener('click', () => {
    const $cardList = document.getElementById('card-list');
    const $cards = Array.from($cardList.children);

    $cards.sort((a, b) => {
        const titleA = a.querySelector('.movie-title').textContent;
        const titleB = b.querySelector('.movie-title').textContent;
        return titleA.localeCompare(titleB);
    });

    $cards.forEach(card => {
        $cardList.appendChild(card);
    });
});

// 카드 내림차순 정렬 (b - a)
// <index.html> id="dropdown-item2" href="#" onclick="sort2" 드롭다운 하위버튼과 연결
// 영어(en => ABC) > 한글(kr => 가나다) >  숫자(number)
$sort2.addEventListener('click', () => {
    const $cardList = document.getElementById('card-list');
    const $cards = Array.from($cardList.children);

    $cards.sort((a, b) => {
        const titleA = a.querySelector('.movie-title').textContent;
        const titleB = b.querySelector('.movie-title').textContent;
        return titleB.localeCompare(titleA);
    });

    $cards.forEach(card => {
        $cardList.appendChild(card);
    });
});

// <index.html> 드롭다운 버튼 작용 함수
// 함수 분리 시 js 파일이 복잡해지는 것을 방지하기 위해 같이 작성합니다.
// 양해 부탁드립니다.

// 드롭다운 버튼 클릭 시 이벤트 핸들러
const dropdownMenu = document.querySelector('.dropdown-menu');
const dropdownButton = document.getElementById('dropdownMenuButton1');

dropdownButton.addEventListener('click', function () {
    if (dropdownMenu.style.display === 'none') {
        dropdownMenu.style.display = 'block';
    } else {
        dropdownMenu.style.display = 'none';
    }
});

// 드롭다운 항목 클릭 시 이벤트 핸들러
const dropdownItems = document.querySelectorAll('.dropdown-item1, .dropdown-item2');

dropdownItems.forEach(item => {
    item.addEventListener('click', function (event) {
        event.stopPropagation(); // 이벤트 전파 중지
        const text = this.textContent;
        console.log(`Item ${text} clicked`);
    });
});

// 클릭 이벤트가 발생한 곳 이외의 영역을 클릭하면 메뉴를 닫음
document.addEventListener('click', function (event) {
    const dropdownMenu = document.querySelector('.dropdown-menu');
    const dropdownToggle = document.querySelector('.dropdown-toggle');

    if (!dropdownToggle.contains(event.target) && !dropdownMenu.contains(event.target)) {
        dropdownMenu.style.display = 'none';
    }
});

// 페이지 로드 시 메뉴 상태를 복원
window.addEventListener('load', function () {
    const menuState = localStorage.getItem('menuState');
    if (menuState === 'on') {
        dropdownMenu.style.display = 'block';
    } else {
        dropdownMenu.style.display = 'none';
    }
});

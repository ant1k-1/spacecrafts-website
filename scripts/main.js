'use strict'

//кнопка добавить в избранное
var favorBtns = document.querySelectorAll('.add-to-favourites-btn');
favorBtns?.forEach((button) => {
    button.addEventListener('click', function() {
        button.classList.toggle('favor');
        button.classList.toggle('not-favor');
    });
});

//строка поиска
var search = document.querySelector('.search__line input');
var articales = document.querySelectorAll('.article-wrapper');

function toggleEmpySearch(count) {
    let emptyList = document.querySelector('.empty-list');
    if (count == articales.length) {
        emptyList.classList.remove('invisible');
        emptyList.classList.add('flex');
    } else {
        emptyList.classList.add('invisible');
        emptyList.classList.remove('flex');
    }
}

function searchScroll() {
    let offset = document.querySelector('.articles-list').getBoundingClientRect().top;
    window.scrollTo({
        top: offset + window.scrollY - 200,
        behavior: "smooth"
    });
}

const start = document.querySelector(".start-btn");
start?.addEventListener('click', () => {
    showSearchResults();
})

function showSearchResults() {
    let searchValue = search.value.toLowerCase();
    let invisCount = 0;
    articales.forEach(articale => {
        if (articale.dataset.name.includes(searchValue)) {
            articale.classList.remove('invisible');
            return;
        }
        articale.classList.add('invisible');
        invisCount++;
    });
    toggleEmpySearch(invisCount);
    searchScroll();
}


search?.addEventListener('keyup', () => {
    showSearchResults();
})

//якорь наверх
var anchor = document.querySelector(".anchor");
function initAnchor() {
    var scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    if (scrollTop > 200) {
        anchor.classList.add('flex');
    } else {
        anchor.classList.add('invisible');
    }
}

window.addEventListener('scroll', function() {
    var scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    initAnchor();
    if (scrollTop > 200) {
        anchor.classList.remove('invisible');
        anchor.classList.add('flex');
    } else {
        anchor.classList.add('invisible');
        anchor.classList.remove('flex');
    }
});

anchor.addEventListener("click", event => {
    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });
})



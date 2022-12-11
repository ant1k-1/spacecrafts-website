'use strict'
//скрипт добавления кнопки на статью в избранное
var list, favorButton;
const listBurger = document?.querySelector(".text__basket.burger");
const favorButtonBurger = document?.querySelector(".basket.burger");

const listNotBurger = document?.querySelector(".text__basket.not-burger");
const favorButtonNotBurger = document?.querySelector(".basket.not-burger");


function checkWidth(){
    if (window.innerWidth < 870){
        list = listBurger;
        favorButton = favorButtonBurger;
        refreshFavor();
    }
    else{
        list = listNotBurger;
        favorButton = favorButtonNotBurger;
        refreshFavor();
    }
    favorButton?.click();
}

favorButtonBurger?.addEventListener("click", event => {
    list = listBurger;
    favorButton = favorButtonBurger;
    refreshFavor();
});

favorButtonNotBurger?.addEventListener("click", event => {
    list = listNotBurger;
    favorButton = favorButtonNotBurger;
    refreshFavor();
});

const favors = document?.querySelectorAll(".add-to-favourites-btn, not-favor");
const position = document?.querySelectorAll(".article-title");
var counterBurger =document?.querySelector(".favourites-number.burger");
var counterNotBurger =document?.querySelector(".favourites-number.not-burger");

var btnNames = [];

function refreshCounter(){
    if (btnNames.length == 0) {
        counterBurger.innerHTML ='';
        counterNotBurger.innerHTML ='';
    }
    else {
        counterBurger.innerHTML = Number(btnNames.length);
        counterNotBurger.innerHTML = Number(btnNames.length);
    }
}

//обновление избранного
function refreshFavor(){
    refreshCounter();
    if (favorButton.classList.contains("active")){
        favorButton.classList.remove("active");
        while (list.lastElementChild) {
            list.removeChild(list.lastElementChild);
        }
    }else{
        favorButton.classList.add("active");
        if (btnNames.length == 0){
            let text = document.createElement("li");
            text.innerHTML = "Пока ничего нет";
            list.append(text);
        }
        for(let btn of btnNames){
            let text = document.createElement("li");
            text.append(btn)
            list.append(text);
        }
    }
}

function save(){
    localStorage.namesLS = JSON.stringify(names);
    console.log(JSON.parse(localStorage.namesLS));
    for(let favor of favors){
        favorsSave.push(favor.contains(favor));
    }
    localStorage.favorsLS = JSON.stringify(favorsSave);
}

function load(){
    favorsLoaded = JSON.parse(localStorage.favorsLS);
    let i = 0;
    for(let favor of favors){
        favor.classList.toggle(favorsLoaded[i]);
        i++;
    }
    btnLoaded = JSON.parse(localStorage.namesLS);
    for(let btn of btnLoaded){
        var doc = new DOMParser().parseFromString(btn, "text/xml");
        console.log(doc);
        btnNames.push(doc);
    }

    refreshCounter();
    if (favorButton.classList.contains("active")){
        favorButton.classList.remove("active");
        while (list.lastElementChild) {
            list.removeChild(list.lastElementChild);
        }
    }else{
        favorButton.classList.add("active");
        if (btnNames.length == 0){
            let text = document.createElement("li");
            text.innerHTML = "Пока ничего нет";
            list.append(text);
        }
        for(let btn of btnLoaded){
            let text = document.createElement("li");
            text.innerHTML = btn;
            //text.append(btn)
            list.append(text);
        }
    }

}

var names = [];
var favorsSave = [];
for(let favor of favors){
    favor.addEventListener("click", event => {
        console.log("favor clicked");
        //вычленяю кнопку "Далее" из статьи в которой вызвался event, 
        //ставлю ей текст названия статьи и добавляю в лист избранного
        let name = event.target.parentElement;
        let temp = event.target.previousElementSibling;
        name = name.parentElement.firstElementChild;

        let btn = document.createElement("button");
        btn.classList.add("read-article-btn-favor");
        btn.innerHTML = name.innerHTML;
        btn.setAttribute("onclick", temp.getAttribute("onclick"));

        let text = document.createElement("li");
        text.innerHTML = name.innerHTML;
        if(!event.target.classList.contains("not-favor")){
            btnNames.push(btn);
            console.log(btn);
            names.push(btn.outerHTML.toString());
        }
        else {//если убираем из избранного
            for (let i = btnNames.length - 1; i >= 0; --i) {
                if (btnNames[i].innerHTML == name.innerHTML) {
                    btnNames.splice(i,1);
                    names.splice(i, 1);
                }
            }
        }
        //обновление избранного
        checkWidth();
        favorButton?.click();
        favorButton?.click();
        save();
    });
}

checkWidth();
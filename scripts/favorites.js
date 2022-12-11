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


var favors = document.querySelectorAll('.add-to-favourites-btn');
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
    var favorsSave = [];
    let namesSave = [];
    
    for(let favor of favors){
        favorsSave.push(favor.classList.contains("favor"));
    }
    localStorage.favorsLS = JSON.stringify(favorsSave);

    for(let btn of btnNames){
        namesSave.push(btn.outerHTML.toString());
    }
    localStorage.namesLS = JSON.stringify(namesSave);
}

function load(){
    
    let favorsLoaded =  JSON.parse(localStorage.favorsLS);
    let btnLoaded = JSON.parse(localStorage.namesLS);

    for(let btn of btnLoaded){
        let tempDiv = document.createElement('div');
        tempDiv.innerHTML = btn;
        btnNames.push(tempDiv);
    }
    let i = 0;
    for(let favor of favors){
        if (!favorsLoaded[i]){
            favor.classList.add('not-favor');
        } 
        else{
            favor.classList.remove('not-favor');
            favor.classList.add('favor');
        }
        i++;
    }
    refreshCounter();
}

for(let favor of favors){
    favor.addEventListener("click", event => {
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
        }
        else {//если убираем из избранного
            for (let i = btnNames.length - 1; i >= 0; --i) {
                if (btnNames[i].innerHTML.toString().includes(name.innerHTML)) {
                    btnNames.splice(i,1);
                }
            }
        }
        save();
        //обновление избранного
        checkWidth();
        favorButton?.click();
        favorButton?.click();
    });
}
checkWidth();
load();
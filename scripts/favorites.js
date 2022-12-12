'use strict'
//скрипт добавления кнопки на статью в избранное
var list, favorButton;
const listBurger = document?.querySelector(".text__basket.burger");
const favorButtonBurger = document?.querySelector(".basket.burger");

const listNotBurger = document?.querySelector(".text__basket.not-burger");
const favorButtonNotBurger = document?.querySelector(".basket.not-burger");

//проверка ширины экрана
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

//обновление счетчика избранного
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
        if (btnNames.length != 0){
            let text = document.createElement("li");
            var link = document.createElement('a');
            link.appendChild(document.createTextNode("Очистить"));
            link.setAttribute('href', "#");
            if(link.addEventListener){
                link.addEventListener('click', function(){
                    clearLocalStorage();
                });
             }else if(link.attachEvent){
                link.attachEvent('onclick', function(){
                    clearLocalStorage();
                });
         }
            text.append(link);
            list.append(text);
        }
    }
}

//функция загрузки данных в localstorage
function save(){
    let favorsSave = [];
    let namesSave = [];
    let namesSaveAbsLinks = [];

    for(let favor of favors){
        favorsSave.push(favor.classList.contains("favor"));
    }
    localStorage.favorsLS = JSON.stringify(favorsSave);

    for(let btn of btnNames){
        namesSave.push(btn.outerHTML.toString());
    }
    for(let btn of btnsForSave){
        namesSaveAbsLinks.push(btn.outerHTML.toString());
    }
    localStorage.namesLS = JSON.stringify(namesSave);
    localStorage.namesAbsLS = JSON.stringify(namesSaveAbsLinks);
}

//функция выгрузки данных из localstorage
function load(){
    
    let favorsLoaded =  JSON.parse(localStorage.favorsLS);
    let btnLoaded = JSON.parse(localStorage.namesLS);
    let btnAbsLoaded = JSON.parse( localStorage.namesAbsLS);

    if (window.location.pathname.includes("index")){
        for(let btn of btnLoaded){
            let tempDiv = document.createElement('div');
            if (btn.includes("div")){
                btn = btn.replaceAll("<div>", '');
                btn = btn.replaceAll("</div>", '');
            }
            tempDiv.innerHTML = btn;
            btnNames.push(tempDiv);
        }
    }
    else{
        for(let btn of btnAbsLoaded){
            let tempDiv = document.createElement('div');
            if (btn.includes("div")){
                btn = btn.replaceAll("<div>", '');
                btn = btn.replaceAll("</div>", '');
            }
            tempDiv.innerHTML = btn;
            tempDiv.innerHTML = btn;
            btnNames.push(tempDiv);
        }
    }

    for(let btn of btnAbsLoaded){
        let tempDiv = document.createElement('div');
        tempDiv.innerHTML = btn;
        btnsForSave.push(tempDiv);
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

//очистка localstorage
function clearLocalStorage(){
    localStorage.favorsLS = [];
    localStorage.namesLS = [];
    localStorage.namesAbsLS = [];
    location.reload();
}

var btnsForSave = [];
for(let favor of favors){
    favor.addEventListener("click", event => {
        //вычленяю кнопку "Далее" из статьи в которой вызвался event, 
        //ставлю ей текст названия статьи и добавляю в лист избранного
        let name = event.target.parentElement;
        let temp = event.target.previousElementSibling;
        name = name.parentElement.firstElementChild;

        let btn = document.createElement("button");
        let tempBtn = document.createElement("button");
        btn.classList.add("read-article-btn-favor");
        tempBtn.classList.add("read-article-btn-favor");
        btn.innerHTML = name.innerHTML;
        tempBtn.innerHTML = name.innerHTML;

        let text = document.createElement("li");
        text.innerHTML = name.innerHTML;

        let onclickText = temp.getAttribute("onclick");
        onclickText = onclickText.substring(0, onclickText.indexOf("'")) + "'../" + onclickText.substring(onclickText.indexOf("'")+1);

        if(!event.target.classList.contains("not-favor")){
            btn.setAttribute("onclick", temp.getAttribute("onclick"));
            btnNames.push(btn);
            tempBtn.setAttribute("onclick", onclickText);
            btnsForSave.push(tempBtn);
        }
        else {//если убираем из избранного
            for (let i = btnNames.length - 1; i >= 0; --i) {
                if (btnNames[i].innerHTML.toString().includes(name.innerHTML)) {
                    btnNames.splice(i,1);
                    btnsForSave.splice(i,1);
                }
            }
        }
        //загрузка данных в localstorage
        save();
        //обновление избранного
        checkWidth();
        favorButton?.click();
        favorButton?.click();
    });
}
checkWidth();
load();
//localStorage.clear();
'use strict'

const list = document?.querySelector(".text__basket");
const favors = document?.querySelectorAll(".add-to-favourites-btn, not-favor");
const position = document?.querySelectorAll(".article-title");
var counter = document?.querySelector(".favourites-number");
const basketButton = document?.querySelector(".basket");
var btnNames = [];

basketButton.addEventListener("click", event => {
    refreshBasket();
});

function refreshCounter(){
    if (btnNames.length == 0) counter.innerHTML ='';
    else counter.innerHTML = Number(btnNames.length);
}

function refreshBasket(){
    refreshCounter();
    if (basketButton.classList.contains("active")){
        basketButton.classList.remove("active");
        while (list.lastElementChild) {
            list.removeChild(list.lastElementChild);
        }
    }else{
        console.log("test");
        basketButton.classList.add("active");
        if (btnNames.length == 0){
            let text = document.createElement("li");
            text.innerHTML = "Пока ничего нет";
            list.append(text);
        }
        for(let btn of btnNames){
            let text = document.createElement("li");
            text.append(btn)
            console.log(btn);
            list.append(text);
        }
    }
}

for(let favor of favors){
    favor.addEventListener("click", event => {
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
        else {
            for (let i = btnNames.length - 1; i >= 0; --i) {
                if (btnNames[i].innerHTML == name.innerHTML) {
                    btnNames.splice(i,1);
                }
            }
        }
        basketButton.click();
        basketButton.click();
    });
}

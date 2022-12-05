'use strict'

//кнопка лайка
const like_btn = document.querySelector(".like-btn, not-liked");
const share_btn = document.querySelector(".share-btn")
like_btn.addEventListener("click", (e)=>{
    like_btn.classList.toggle('liked');
    like_btn.classList.toggle('not-liked');
})

//кнопка поделиться
share_btn.addEventListener("click", (e)=>{
    urlCopyButton();
})

//копирование текущего url в буфер обмена
function urlCopyButton(){
    var record_url = document.URL; //Узнаю текущий url
    navigator.clipboard.writeText(record_url); //Копирую в буфер обмена
    share_btn.innerHTML = "Скопировано!";
    setTimeout(function setDefault(){
        share_btn.innerHTML = "Поделиться";
    }, 3000)
}


//Модальная галерея для картинок в статье
const images = document.querySelectorAll(".article-container img");
let imgIndex = 0;
let imgSrc;

// получаем по клику на картинку их src
images.forEach((images, i) =>{
    images.addEventListener("click", event=>{
        imgSrc = event.target.src;
        imgModal(imgSrc);
        //индекс следующей картинки
        imgIndex = i;
    })
});
//создание модальной галереи
let imgModal = (src) => {
    
    const modal = document.createElement("div");
    modal.setAttribute("class", "modal");
    
    //добавляем модальную галерею в мейн
    document.querySelector("main").append(modal);
    //добавление картинки в галерею
    const newImage = document.createElement("img");
    newImage.setAttribute("src", src);
    newImage.setAttribute("class", "modal-img")
    //cсоздаем кнопку выхода
    const closeBtn = document.createElement("i");
    closeBtn.setAttribute("class", "fas fa-times closeBtn");
    //закрытие галереи
    closeBtn.onclick = () => {
        modal.remove();
    };
    //создаем кнопки вперед назад
    const nextBtn = document.createElement("i");
    nextBtn.setAttribute("class", "fas fa-angle-right nextBtn");
    // изменение src текущего изображения на src следующего изображения
    nextBtn.onclick = () => {
        newImage.setAttribute("src", nextImg())
    };
    const prevBtn = document.createElement("i");
    prevBtn.setAttribute("class", "fas fa-angle-left prevBtn");
    // изменение src текущего изображения на src предыдущего изображения
    prevBtn.onclick = () => {
        newImage.setAttribute("src", prevImg())
    }
    //собираем модальную галерею
    modal.append(newImage, closeBtn, nextBtn, prevBtn);
};
//получаем src на следующую картинку
let nextImg = () => {
    imgIndex++;
    //если текущая картинка - последняя 
    if (imgIndex >= images.length) {
        imgIndex = 0
    }
    return images[imgIndex].src;
};

//получаем src на предыдущую картинку
let prevImg = () => {
    imgIndex--;
    //если текущая картинка - первая 
    if (imgIndex < 0) {
        imgIndex = images.length - 1
    }
    return images[imgIndex].src
}
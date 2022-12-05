'use strict'

const like_btn = document.querySelector(".like-btn, not-liked");
const share_btn = document.querySelector(".share-btn")

like_btn.addEventListener("click", (e)=>{
    like_btn.classList.toggle('liked');
    like_btn.classList.toggle('not-liked');
})

share_btn.addEventListener("click", (e)=>{
    urlCopyButton();
})

function Copy() {
    var Url = document.getElementById("url");
    Url.innerHTML = window.location.href;
    console.log(Url.innerHTML)
    Url.select();
    document.execCommand("copy");
}

function urlCopyButton(){
    var record_url = document.URL; //Узнаю текущий url
    navigator.clipboard.writeText(record_url); //Копирую в буфер обмена
    share_btn.innerHTML = "Скопировано!";
    setTimeout(function setDefault(){
        share_btn.innerHTML = "Поделиться";
    }, 3000)
}


const images = document.querySelectorAll(".article-container img");

let imgIndex = 0;
let imgSrc;

// get images src onclick
images.forEach((images, i) =>{
    images.addEventListener("click", event=>{
        imgSrc = event.target.src;
        //run modal function
        imgModal(imgSrc);
        //index of the next image
        imgIndex = i;
    })
});
//creating the modal
let imgModal = (src) => {
    
    const modal = document.createElement("div");
    modal.setAttribute("class", "modal");
    
    //add modal to the parent element 
    document.querySelector("main").append(modal);
    //adding image to modal
    const newImage = document.createElement("img");
    newImage.setAttribute("src", src);
    newImage.setAttribute("class", "modal-img")
    //creating the close button
    const closeBtn = document.createElement("i");
    closeBtn.setAttribute("class", "fas fa-times closeBtn");
    //close function
    closeBtn.onclick = () => {
        modal.remove();
    };
    //next and previous buttons
    const nextBtn = document.createElement("i");
    nextBtn.setAttribute("class", "fas fa-angle-right nextBtn");
    // change the src of current image to the src of next image
    nextBtn.onclick = () => {
        newImage.setAttribute("src", nextImg())
    };
    const prevBtn = document.createElement("i");
    prevBtn.setAttribute("class", "fas fa-angle-left prevBtn");
    // change the src of current image to the src of pevious image
    prevBtn.onclick = () => {
        newImage.setAttribute("src", prevImg())
    }
    modal.append(newImage, closeBtn, nextBtn, prevBtn);
};
//next image function
let nextImg = () => {
    console.log(imgIndex);
    imgIndex++;
    //check if it is the the last image
    if (imgIndex >= images.length) {
        imgIndex = 0
    }
    //return src of the new image
    return images[imgIndex].src;
};
//previous image function
let prevImg = () => {
    imgIndex--;
    console.log(imgIndex);
    //check if it is the first image
    if (imgIndex < 0) {
        imgIndex = images.length - 1
    }
    //return src of previous image
    return images[imgIndex].src
}
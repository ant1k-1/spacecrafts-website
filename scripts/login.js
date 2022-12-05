'use strict'
const sign_in_btn = document.querySelector(".sign-in-btn");
const sign_up_btn = document.querySelector(".sign-up-btn");
const forms = document.querySelectorAll(".login_form");
const welcome_form = forms[0];
const sign_in_form = forms[1];
const sign_up_form = forms[2];

sign_in_btn.addEventListener("click", e =>{
    welcome_form.classList.add("invisible_form");
    if (sign_in_form.classList.contains("invisible_form")){
        sign_in_form.classList.remove("invisible_form");
    }
});


sign_up_btn.addEventListener("click", e =>{
    welcome_form.classList.add("invisible_form");
    if (sign_up_form.classList.contains("invisible_form")){
        sign_up_form.classList.remove("invisible_form");
    }
});
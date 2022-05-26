"use strict";
let mobileMenu = document.querySelector('.header__mobile-menu');

function openClick() {
    console.log(5);
    mobileMenu.style.display = 'block';
}

function closeClick() {
    mobileMenu.style.display = 'none';
}
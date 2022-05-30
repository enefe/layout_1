"use strict";
const mobileMenu = document.querySelector('.header__mobile-menu');

function openClick() {
    mobileMenu.style.display = 'block';
}

function closeClick() {
    mobileMenu.style.display = 'none';
}

const slider = document.querySelector('.productions__containers');
const sliders = document.querySelectorAll('.productions_container');

sliders.forEach((item) => {
    const imageSlider = item.querySelector('.productions__image');
    imageSlider.addEventListener('dragstart', (e) => {
        e.preventDefault();
    })
})

let isDragging = false,
    startPos = 0,
    currentTranslate = 0,
    prevTranslate = 0,
    animationID;

slider.addEventListener('touchstart', touchStart());
slider.addEventListener('touchend', touchEnd);
slider.addEventListener('touchmove', touchMove);
slider.addEventListener('touchmove', function(event) { event.preventDefault(); }, false);
slider.addEventListener('mousedown', touchStart());
slider.addEventListener('mouseup', touchEnd);
slider.addEventListener('mousemove', touchMove);
slider.addEventListener('mouseleave', touchEnd);

function getPositionX(event) {
    return event.type.includes('mouse') ? event.pageX : event.touches[0].clientX
}


function touchStart() {
    return function(event) {
        startPos = getPositionX(event);
        isDragging = true;
        animationID = requestAnimationFrame(animation);
        slider.classList.add('grabbing');
    }
}

function touchMove(event) {
    if (isDragging) {
        const currentPosition = getPositionX(event)
        currentTranslate = prevTranslate + currentPosition - startPos;
        /* console.log(window.innerWidth - slider.offsetWidth)
        console.log(currentTranslate + 300) */
        if (currentTranslate > 0) {
            currentTranslate = 0;
        }
        /* if (window.innerWidth - slider.offsetWidth > currentTranslate + 300) {
            currentTranslate = window.innerWidth - slider.offsetWidth;
        } */
    }
}

function touchEnd() {

    cancelAnimationFrame(animationID);
    isDragging = false;
    setPositionByIndex();
    slider.classList.remove('grabbing');

    setPositionByIndex()
}

function animation() {
    setSliderPosition();
    if (isDragging) requestAnimationFrame(animation);
}

function setPositionByIndex() {
    prevTranslate = currentTranslate;
    setSliderPosition();
}

function setSliderPosition() {
    slider.style.transform = `translateX(${currentTranslate}px)`
}
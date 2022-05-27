"use strict";
const mobileMenu = document.querySelector('.header__mobile-menu');

function openClick() {
    mobileMenu.style.display = 'block';
}

function closeClick() {
    mobileMenu.style.display = 'none';
}

const slider = document.querySelector('.productions__containers');

let isDragging = false,
    startPos = 0,
    currentTranslate = 0,
    prevTranslate = 0,
    animationID;

slider.addEventListener('touchstart', touchStart());
slider.addEventListener('touchend', touchEnd);
slider.addEventListener('touchmove', touchMove);
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

/* let limits = {
    top: big.offsetTop,
    right: big.offsetWidth + big.offsetLeft - slider.offsetWidth,
    bottom: big.offsetHeight + big.offsetTop - slider.offsetHeight,
    left: big.offsetLeft
}; */

function touchMove(event) {
    if (isDragging) {
        const currentPosition = getPositionX(event)
            /* console.log(currentPosition); */
        currentTranslate = prevTranslate + currentPosition - startPos;
        if (currentTranslate > 0) {
            currentTranslate = 0;
        }
        /* let newLocation = {
            x: limits.left,
            y: limits.top
        };
        if (event.pageX > limits.right) {
            newLocation.x = limits.right;
        } else if (event.pageX > limits.left) {
            newLocation.x = event.pageX;
        }
        if (event.pageY > limits.bottom) {
            newLocation.y = limits.bottom;
        } else if (event.pageY > limits.top) {
            newLocation.y = event.pageY;
        } */
    }
}

function touchEnd() {
    cancelAnimationFrame(animationID);
    isDragging = false;
    setPositionByIndex();
    slider.classList.remove('grabbing');

    const movedBy = currentTranslate - prevTranslate

    // if moved enough negative then snap to next slide if there is one
    if (movedBy < -100 && currentIndex < slides.length - 1) currentIndex += 1

    // if moved enough positive then snap to previous slide if there is one
    if (movedBy > 100 && currentIndex > 0) currentIndex -= 1

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
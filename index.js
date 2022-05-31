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

let countSlider = slider.childElementCount;

if (countSlider == 2 && window.innerWidth < 2050 && window.innerWidth >= 1184) {
    countSlider = 1;
}
if (countSlider == 3 && window.innerWidth < 2050 && window.innerWidth >= 1626) {
    countSlider = 1;
}

if (window.innerWidth < 2050 && countSlider != 1) {

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
            if (window.innerWidth < 768 && window.innerWidth - slider.offsetWidth > currentTranslate) {
                currentTranslate = window.innerWidth - slider.offsetWidth - 78;
            }
            if (window.innerWidth >= 768 && window.innerWidth < 1002 && window.innerWidth - slider.offsetWidth > currentTranslate + 320) {
                currentTranslate = window.innerWidth - slider.offsetWidth - 320;
            }
            if (countSlider > 4 && window.innerWidth >= 1002 && window.innerWidth - slider.offsetWidth > currentTranslate + 300) {
                currentTranslate = window.innerWidth - slider.offsetWidth - 300;
            }
            if (countSlider == 4 && window.innerWidth >= 1002 && window.innerWidth < 2050 && window.innerWidth - slider.offsetWidth > currentTranslate + 282) {
                currentTranslate = window.innerWidth - slider.offsetWidth - 282;
            }
            if (countSlider == 3 && window.innerWidth >= 1002 && window.innerWidth < 2050 && window.innerWidth - slider.offsetWidth > currentTranslate + 282) {
                currentTranslate = window.innerWidth - slider.offsetWidth - 282;
            }
            if (countSlider == 2 && window.innerWidth >= 1002 && window.innerWidth < 1184 && window.innerWidth - slider.offsetWidth > currentTranslate + 282) {
                currentTranslate = window.innerWidth - slider.offsetWidth - 282;
            }
        }
    }

    function touchEnd() {

        cancelAnimationFrame(animationID);
        isDragging = false;
        setPositionByIndex();
        slider.classList.remove('grabbing');

        setPositionByIndex();
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
}
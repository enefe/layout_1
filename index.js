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

$(document).ready(function() {
    $(".owl-carousel").owlCarousel({
        loop: true,
        items: 1,
        autoplay: true,
        autoplayTimeout: 4000,
        autoplayHoverPause: true,
        autoplaySpeed: 2000,
        pagination: false,
        dots: false,
        nav: true,
        navText: [
            '<div class="header__slider_nav"><svg width="41" height="16" viewBox="0 0 41 16" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M0.292892 7.2929C-0.0976296 7.68342 -0.0976295 8.31659 0.292893 8.70711L6.65685 15.0711C7.04738 15.4616 7.68054 15.4616 8.07107 15.0711C8.46159 14.6805 8.46159 14.0474 8.07107 13.6569L2.41422 8L8.07107 2.34315C8.46159 1.95262 8.46159 1.31946 8.07107 0.928935C7.68054 0.538411 7.04738 0.538411 6.65685 0.928935L0.292892 7.2929ZM41 7L1 7L1 9L41 9L41 7Z" fill="white"/></svg><p class="header__slider_text prev">пред</p></div>',
            '<div class="header__slider_nav next__nav"><svg width="41" height="16" viewBox="0 0 41 16" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M40.7071 8.70711C41.0976 8.31659 41.0976 7.68342 40.7071 7.2929L34.3431 0.928938C33.9526 0.538414 33.3195 0.538414 32.9289 0.928938C32.5384 1.31946 32.5384 1.95263 32.9289 2.34315L38.5858 8.00001L32.9289 13.6569C32.5384 14.0474 32.5384 14.6805 32.9289 15.0711C33.3195 15.4616 33.9526 15.4616 34.3431 15.0711L40.7071 8.70711ZM-1.74846e-07 9L40 9.00001L40 7.00001L1.74846e-07 7L-1.74846e-07 9Z" fill="white"/></svg><p class="header__slider_text next">след</p></div>'
        ],
        margin: 40
    });
});
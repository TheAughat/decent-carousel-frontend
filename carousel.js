const track = document.querySelector('.carousel__track');
const slides = Array.from(track.children);
const nextButton = document.querySelector('.carousel__button--right');
const prevButton = document.querySelector('.carousel__button--left');
const dotsNav = document.querySelector('.carousel__nav');
const dots = Array.from(dotsNav.children);

const slideWidth = slides[0].getBoundingClientRect().width;

var i = 0;  // autoplay start point
var images = [];
var time = 5000;
var pauseTime = 7000;
var movementCheck = true;

const setSlidePosition = (slide, index) => {
    slide.style.left = slideWidth * index + 'px';
};
slides.forEach(setSlidePosition);


const moveToSlide = (track, currentSlide, targetSlide) => {
    track.style.transform = 'translateX(-' + targetSlide.style.left + ')';
    currentSlide.classList.remove('current-slide');
    targetSlide.classList.add('current-slide');
}


const updateDots = (currentDot, targetDot) => {
    currentDot.classList.remove('current-slide');
    targetDot.classList.add('current-slide');
}


function changeImg() {
    if (document.querySelector('.carousel__track').classList[1] === 'moving') {
        moveNext();

        if (i < slides.length - 1) {
            i++;
        }
        else {
            i = 0;
        }

        setTimeout("changeImg()", time);
    }
}

window.onload = setTimeout("changeImg()", time);


function stopMovement() {
    movementCheck = true;
    document.querySelector('.carousel__track').classList.add('not-moving');
    document.querySelector('.carousel__track').classList.remove('moving');

    setTimeout("startMovement()", pauseTime);
}


function startMovement() {
    if (movementCheck) {
        document.querySelector('.carousel__track').classList.add('moving');
        document.querySelector('.carousel__track').classList.remove('not-moving');
        movementCheck = false;
        changeImg()
    }
}


//on click left, move slides to the left
prevButton.addEventListener('click', e => {
    const currentSlide = track.querySelector('.current-slide');
    const prevSlide = currentSlide.previousElementSibling;
    stopMovement();
    if (prevSlide !== null) {

        const currentDot = dotsNav.querySelector('.current-slide');
        const prevDot = currentDot.previousElementSibling;

        moveToSlide(track, currentSlide, prevSlide);

        updateDots(currentDot, prevDot);
    }
    else {
        moveToEnds(document.getElementsByClassName('carousel__indicator')[slides.length - 1]);
    }
})


//on click right, move slides to the right
nextButton.addEventListener('click', btnMoveNext)

function btnMoveNext() {
    stopMovement();
    moveNext();
}

function moveNext() {
    const currentSlide = track.querySelector('.current-slide');
    const nextSlide = currentSlide.nextElementSibling;
    
    if (nextSlide !== null) {

        const currentDot = dotsNav.querySelector('.current-slide');
        const nextDot = currentDot.nextElementSibling;

        moveToSlide(track, currentSlide, nextSlide);

        updateDots(currentDot, nextDot);
    }
    else {
        moveToEnds(document.getElementsByClassName('carousel__indicator')[0]);
    }
}


//on click the nav indicators, move to that slide
dotsNav.addEventListener('click', e => {
    // which indicator was clicked on?
    const targetDot = e.target.closest('button');

    if (!targetDot) return;
    stopMovement();

    const currentSlide = track.querySelector('.current-slide');
    const currentDot = dotsNav.querySelector('.current-slide');
    const targetIndex = dots.findIndex(dot => dot === targetDot);
    const targetSlide = slides[targetIndex];

    moveToSlide(track, currentSlide, targetSlide);
    updateDots(currentDot, targetDot);
})


function moveToEnds(targetDot) {
    if (!targetDot) return;

    const currentSlide = track.querySelector('.current-slide');
    const currentDot = dotsNav.querySelector('.current-slide');
    const targetIndex = dots.findIndex(dot => dot === targetDot);
    const targetSlide = slides[targetIndex];

    moveToSlide(track, currentSlide, targetSlide);
    updateDots(currentDot, targetDot);
}
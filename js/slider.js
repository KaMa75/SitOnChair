var slidesParent = document.querySelector('.slider .slides');
var prevBtn = document.querySelector('.navigation.prev-btn');
var nextBtn = document.querySelector('.navigation.next-btn');
var dots = document.querySelectorAll('.slider .dot');
var cnt = 0;
var maxCnt = 2;
var autoSlide = setTimeout(nextSlide, 2000);
var slideTime = 6000;

function findSlides() {
    return document.querySelectorAll('.slides .slide');
}

function removeCenter2left(event) {
    event.target.classList.remove('center2left');
    event.target.removeEventListener('animationend', removeCenter2left);
}

function addListeners() {
    nextBtn.addEventListener('click', nextSlide);
    prevBtn.addEventListener('click', previousSlide);
    autoSlide = setTimeout(nextSlide, slideTime);
}

function removeListeners() {
    prevBtn.removeEventListener('click', previousSlide);
    nextBtn.removeEventListener('click', nextSlide);
    clearTimeout(autoSlide);
}

function removeRight2center(event) {
    event.target.classList.remove('right2center');
    event.target.removeEventListener('animationend', removeRight2center);
}

function removeCenter2right(event) {
    event.target.classList.remove('center2right');
    event.target.removeEventListener('animationend', removeCenter2left);
}

function removeLeftt2center(event) {
    event.target.classList.remove('left2center');
    event.target.removeEventListener('animationend', removeRight2center);
}

function removeListenerFromBtn(btn, functionName) {
    btn.removeEventListener('click', functionName);
}

function removeClass(index){
    dots[index].classList.remove('active');
}

function addClass(index){
    dots[index].classList.add('active');
}

function removeAnimations(slides){
    slides.forEach(function(slide){
        slide.classList.remove('center2left');
        slide.classList.remove('right2center');
        slide.classList.remove('left2center');
        slide.classList.remove('center2right');
    });
}

function nextSlide(event) {
    removeListeners();
    var slides = findSlides();
    removeAnimations(slides);
    slides[1].classList.add('center2left');
    slides[2].classList.add('right2center');
    slides[1].addEventListener('animationend', removeCenter2left);
    slides[2].addEventListener('animationend', removeRight2center);
    slidesParent.appendChild(slides[0]);
    removeClass(cnt);
    if(cnt<maxCnt){
        cnt++;
    } else {
        cnt=0;
    }
    addClass(cnt);
    addListeners();
}

function previousSlide(event) {
    removeListeners();
    var slides = findSlides();
    removeAnimations(slides);
    slides[0].classList.add('left2center');
    slides[1].classList.add('center2right');
    slides[0].addEventListener('animationend', removeLeftt2center);
    slides[1].addEventListener('animationend', removeCenter2right);
    slidesParent.insertBefore(slides[2], slides[0]);
    removeClass(cnt);
    if(cnt>0){
        cnt--;
    } else {
        cnt=maxCnt;
    }
    addClass(cnt);
    addListeners();
}

addListeners ();
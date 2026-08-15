let slideIndex = 1;

const slides = document.querySelectorAll(".slide");
const dots = document.querySelectorAll(".dot");

if (slides.length > 0) {

    showSlides(slideIndex);

    document.querySelector(".prev").addEventListener("click", () => {
        showSlides(slideIndex -= 1);
    });

    document.querySelector(".next").addEventListener("click", () => {
        showSlides(slideIndex += 1);
    });

    dots.forEach((dot, index) => {
        dot.addEventListener("click", () => {
            showSlides(slideIndex = index + 1);
        });
    });

    setInterval(() => {
        slideIndex++;
        showSlides(slideIndex);
    }, 5000);

}

function showSlides(n) {

    if (n > slides.length) slideIndex = 1;
    if (n < 1) slideIndex = slides.length;

    slides.forEach(slide => slide.style.display = "none");
    dots.forEach(dot => dot.classList.remove("active"));

    slides[slideIndex - 1].style.display = "block";
    dots[slideIndex - 1].classList.add("active");
}



/* ===========================
   Reviews Carousel
=========================== */

const reviewSlides = document.querySelectorAll(".review-slide");
const reviewDots = document.querySelectorAll(".review-dot");
const reviewPrev = document.querySelector(".review-prev");
const reviewNext = document.querySelector(".review-next");

let reviewIndex = 0;

function showReview(index){

    if(index >= reviewSlides.length) reviewIndex = 0;
    if(index < 0) reviewIndex = reviewSlides.length - 1;

    reviewSlides.forEach(slide => slide.classList.remove("active"));
    reviewDots.forEach(dot => dot.classList.remove("active"));

    reviewSlides[reviewIndex].classList.add("active");
    reviewDots[reviewIndex].classList.add("active");
}

if(reviewSlides.length){

    reviewPrev.addEventListener("click", () => {
        reviewIndex--;
        showReview(reviewIndex);
    });

    reviewNext.addEventListener("click", () => {
        reviewIndex++;
        showReview(reviewIndex);
    });

    reviewDots.forEach((dot, i) => {
        dot.addEventListener("click", () => {
            reviewIndex = i;
            showReview(reviewIndex);
        });
    });

    setInterval(() => {
        reviewIndex++;
        showReview(reviewIndex);
    }, 5000);

    showReview(reviewIndex);
}

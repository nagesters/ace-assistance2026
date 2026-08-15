/* Facebook Reviews Carousel */

const fbReviews = document.querySelectorAll(".fb-review");
const fbDots = document.querySelectorAll(".fb-dot");

let fbIndex = 0;

function showFBReview(index){

    if(index >= fbReviews.length) fbIndex = 0;
    if(index < 0) fbIndex = fbReviews.length-1;

    fbReviews.forEach(card=>card.classList.remove("active"));
    fbDots.forEach(dot=>dot.classList.remove("active"));

    fbReviews[fbIndex].classList.add("active");
    fbDots[fbIndex].classList.add("active");
}

document.querySelector(".fb-next").onclick=()=>{
    fbIndex++;
    showFBReview(fbIndex);
}

document.querySelector(".fb-prev").onclick=()=>{
    fbIndex--;
    showFBReview(fbIndex);
}

fbDots.forEach((dot,i)=>{
    dot.onclick=()=>{
        fbIndex=i;
        showFBReview(fbIndex);
    }
});

setInterval(()=>{
    fbIndex++;
    showFBReview(fbIndex);
},5000);

showFBReview(0);

document.addEventListener("DOMContentLoaded", () => {
    const newsModal = document.getElementById("news-modal");
    const closeBtn = document.getElementById("close-news-modal");

    // Automatically trigger modal display when visitor loads page
    if (newsModal) {
        setTimeout(() => {
            newsModal.classList.add("active");
        }, 300); // 300ms smooth entrance delay
    }

    // Close when clicking close button
    if (closeBtn) {
        closeBtn.addEventListener("click", () => {
            newsModal.classList.remove("active");
        });
    }

    // Close when clicking outside the modal box
    window.addEventListener("click", (e) => {
        if (e.target === newsModal) {
            newsModal.classList.remove("active");
        }
    });
});
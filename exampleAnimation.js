const images = document.querySelectorAll(".image");  // pobieranie obrazkow
const startButton = document.getElementById("playButton");
images[0].classList.add("active");
let currentIndex = 0;
let isRunning = null;
let timeoutIds = [];
let animationEnded = false;

function changeImage() {
    setTimeout(function() {
        images[currentIndex].classList.remove("active");
    }, 500);
    
    currentIndex = (currentIndex + 1) % images.length;

    setTimeout(function() {
        images[currentIndex].classList.add("active");
    }, 500);

    if(currentIndex === (images.length - 1)) {
        setTimeout(function() {
        animationEnded = true;
        startButton.innerHTML = '<i class="fa-solid fa-rotate-right"></i>';
        }, 1000);
    }
}

function startAnimation() {
    timeoutIds.forEach(clearTimeout);
    timeoutIds = [];

    images.forEach((img) => img.classList.remove("active"));
    currentIndex = 0;
    images[currentIndex].classList.add("active");

    for(let i = 0; i < images.length; i++) {
        if(animationEnded === true) {
            setTimeout(() => {
                const timeoutId = setTimeout(changeImage, i * 1000);
                timeoutIds.push(timeoutId);
            }, 500);
        } else {
            const timeoutId = setTimeout(changeImage, i * 1000);
            timeoutIds.push(timeoutId);
        }
    }
}

startButton.addEventListener("click", startAnimation);
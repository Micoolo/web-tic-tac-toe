const images = document.querySelectorAll(".image");

images[0].classList.add("active");
let currentIndex = 0;
let isRunning = false;
let timeoutIds = [];
let animationEnded = false;

function animation() {
    const previousIndex = currentIndex;

    if (currentIndex < images.length - 1) {
        currentIndex ++;
        images[currentIndex].classList.add("active");
    }

    if(currentIndex === (images.length - 1)) {
        setTimeout(function() {
        animationEnded = true;
        isRunning = false;
        updateButtonState();
        startButton.innerHTML = '<i class="fa-solid fa-rotate-right"></i>';
        timeoutIds.forEach(clearTimeout);
        timeoutIds = [];
        }, 1000);
    }
}

function startAnimation() {
    timeoutIds.forEach(clearTimeout);
    timeoutIds = [];
    startButton.innerHTML = '<i class="fa-solid fa-pause"></i>';
    isRunning = true;
    updateButtonState();
    
    for(let i = 0; i < images.length; i++) {
        const timeoutId = setTimeout(animation, i * 2000);
        timeoutIds.push(timeoutId);
    }
}

function resetAnimation() {
    stopAnimation();
    animationEnded = false;
    images.forEach((img) => img.classList.remove("active"));
    currentIndex = 0;
    images[currentIndex].classList.add("active"); 
    startButton.innerHTML = '<i class="fa-solid fa-play"></i>';
}

function stopAnimation() {
    isRunning = false;
    updateButtonState();
    timeoutIds.forEach(clearTimeout);
    timeoutIds = [];
    startButton.innerHTML = '<i class="fa-solid fa-play"></i>';
}

function changeImage(index) {
    const previousIndex = currentIndex;
    if(index < currentIndex) {
        images[previousIndex].classList.remove("active");
    }

    currentIndex = index;

    images[currentIndex].classList.add("active");
}
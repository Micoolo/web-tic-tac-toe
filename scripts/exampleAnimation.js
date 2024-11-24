const images = document.querySelectorAll(".image");  // pobieranie obrazkow
const startButton = document.getElementById("playButton");
const previousButton = document.getElementById("previousButton");
const nextButton = document.getElementById("nextButton");
images[0].classList.add("active");
let currentIndex = 0;
let isRunning = false;
let timeoutIds = [];
let animationEnded = false;

function animation() {
    const previousIndex = currentIndex;

    if (currentIndex < images.length - 1) {
        setTimeout(function() {
            images[previousIndex].classList.remove("active");
        }, 400);
        
        currentIndex ++;

        setTimeout(function() {
            images[currentIndex].classList.add("active");
        }, 0);
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

startButton.addEventListener("click", () => {
    if (isRunning) {
        stopAnimation();
    } else if (animationEnded) {
        resetAnimation();
    } else if (!animationEnded) {
        startAnimation();
    }
})

function changeImage(index) {
    const previousIndex = currentIndex;
    setTimeout(function() {
        images[previousIndex].classList.remove("active");
    }, 250);

    currentIndex = index;

    setTimeout(function() {
        images[currentIndex].classList.add("active");
    }, 0);
}

previousButton.addEventListener("click", () => {
    if (currentIndex > 0) {
        const previousIndex = (currentIndex - 1);
        changeImage(previousIndex);
    }
});

nextButton.addEventListener("click", () => {
    if (currentIndex < 3) {
        const nextIndex = (currentIndex + 1);
        changeImage(nextIndex);
    }
});

function updateButtonState() {
    if (isRunning) {
        previousButton.classList.add("disabled");
        nextButton.classList.add("disabled");
    } else {
        previousButton.classList.remove("disabled");
        nextButton.classList.remove("disabled");
    }
}
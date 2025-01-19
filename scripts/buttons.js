const easyButton = document.getElementById("easy")
const mediumButton = document.getElementById("medium")
const hardButton = document.getElementById("hard")
const onButton = document.getElementById("on")
const offButton = document.getElementById("off")
const slowSpeed = document.getElementById('slow');
const normalSpeed = document.getElementById('normal');
const fastSpeed = document.getElementById('fast');
const sideButton = document.querySelectorAll('.sideButton');
const speedRow = document.getElementById('speedRow');
const startButton = document.getElementById("playButton");
const previousButton = document.getElementById("previousButton");
const nextButton = document.getElementById("nextButton");
const playerButton = document.getElementById("playerButton");
const pcButton = document.getElementById("pcButton");
const startGameButton = document.getElementById("startGameButton");

//############## DIFFICULTY BUTTONS ##############

if (easyButton && mediumButton && hardButton) {
    hardButton.classList.add("diffChosen");

    easyButton.addEventListener("click", () => {
        mediumButton.classList.remove("diffChosen");
        hardButton.classList.remove("diffChosen");
        easyButton.classList.add("diffChosen");
        maxDepth = 0;
    });

    mediumButton.addEventListener("click", () => {
        easyButton.classList.remove("diffChosen");
        hardButton.classList.remove("diffChosen");
        mediumButton.classList.add("diffChosen");
        maxDepth = 2;
    });

    hardButton.addEventListener("click", () => {
        easyButton.classList.remove("diffChosen");
        mediumButton.classList.remove("diffChosen");
        hardButton.classList.add("diffChosen");
        maxDepth = 9;
    });
}

//############## VISUALIZATION BUTTONS ##############

if (onButton && offButton && slowSpeed && normalSpeed && fastSpeed && speedRow) {
    const buttonsInSpeedRow = speedRow.querySelectorAll("button");

    offButton.classList.add("diffChosen");
    speedRow.style.opacity = 0;
    buttonsInSpeedRow.forEach(button => {
        button.classList.add("disabled");
    });

    onButton.addEventListener("click", () => {
        offButton.classList.remove("diffChosen");
        onButton.classList.add("diffChosen");
        visualization = true; 
        speedRow.style.opacity = 1;
        buttonsInSpeedRow.forEach(button => {
            button.classList.remove("disabled");
        });
    });

    offButton.addEventListener("click", () => {
        onButton.classList.remove("diffChosen");
        offButton.classList.add("diffChosen");
        visualization = false;
        speedRow.style.opacity = 0;
        buttonsInSpeedRow.forEach(button => {
            button.classList.add("disabled");
        });
    });

    normalSpeed.classList.add("diffChosen");

    slowSpeed.addEventListener("click", () => {
        visualizationSpeed = 1000;
        fastSpeed.classList.remove("diffChosen");
        normalSpeed.classList.remove("diffChosen");
        slowSpeed.classList.add("diffChosen");
    });

    normalSpeed.addEventListener("click", () => {
        visualizationSpeed = 500;
        slowSpeed.classList.remove("diffChosen");
        fastSpeed.classList.remove("diffChosen");
        normalSpeed.classList.add("diffChosen");
    });

    fastSpeed.addEventListener("click", () => {
        visualizationSpeed = 250;
        slowSpeed.classList.remove("diffChosen");
        normalSpeed.classList.remove("diffChosen");
        fastSpeed.classList.add("diffChosen");
    });
}

//############## MOVE SELECTION BUTTONS ##############

if (playerButton && pcButton && startGameButton && startGameRow) {
    playerButton.classList.add("diffChosen");
    startGameRow.style.opacity = 0;
    startGameButton.classList.add("disabled");

    pcButton.addEventListener("click", () => {
        playerButton.classList.remove("diffChosen");
        pcButton.classList.add("diffChosen");
        startGameRow.style.opacity = 1;
        startGameButton.classList.remove("disabled");
        currentPlayer = "O";
        playerMovesFirst = false;
    })

    playerButton.addEventListener("click", () => {
        playerButton.classList.add("diffChosen");
        pcButton.classList.remove("diffChosen");
        startGameRow.style.opacity = 0;
        startGameButton.classList.add("disabled");
        currentPlayer = "X";
        playerMovesFirst = false;
    })
}

//############## EXAMPLE BUTTONS ##############

if (startButton && previousButton && nextButton) {
    startButton.addEventListener("click", () => {
        if (isRunning) {
            stopAnimation();
        } else if (animationEnded) {
            resetAnimation();
        } else if (!animationEnded) {
            startAnimation();
        }
    })

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
}
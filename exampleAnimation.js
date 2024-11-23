document.addEventListener("DOMContentLoaded", () => {
    const images = document.querySelectorAll(".image");  // Pobieramy wszystkie obrazki
    let currentIndex = 0;  // Indeks aktualnie wyświetlanego obrazka
    images[0].classList.add("active");
    function changeImage() {
        // Ukrywamy obecny obrazek
        setTimeout(function() {
            images[currentIndex].classList.remove("active");
        }, 500);
        

        // Przechodzimy do następnego obrazka (w pętli)
        currentIndex = (currentIndex + 1) % images.length;

        // Pokazujemy nowy obrazek
        setTimeout(function() {
            images[currentIndex].classList.add("active");
        }, 500);
    }

    for(let i = 0; i < images.length; i++) {
        setTimeout(changeImage, i * 3000);
    } 
});

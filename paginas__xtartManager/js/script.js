window.addEventListener('load', () => {
    const carouselContainer = document.querySelector('.eq-carrousel-container');
    const carousel = document.querySelector('.eq-carrousel');
    const btnLeft = document.querySelector('.eq-carrousel-btn--left');
    const btnRight = document.querySelector('.eq-carrousel-btn--right');
    const cards = carousel.querySelectorAll('.eq-carrousel__card');

    const gap = parseInt(getComputedStyle(carousel).gap);
    const cardWidth = cards[0].offsetWidth + gap;
    let index = 0;

    function moveCarousel() {
        carousel.style.transform = `translateX(${-index * cardWidth}px)`;
    }

    btnRight.addEventListener('click', () => {
        index++;
        if (index > cards.length - Math.floor(carouselContainer.offsetWidth / cards[0].offsetWidth)) index = 0;
        moveCarousel();
    });

    btnLeft.addEventListener('click', () => {
        index--;
        if (index < 0) index = cards.length - Math.floor(carouselContainer.offsetWidth / cards[0].offsetWidth);
        moveCarousel();
    });


    let autoScroll = setInterval(() => {
        index++;
        if (index > cards.length - Math.floor(carouselContainer.offsetWidth / cards[0].offsetWidth)) index = 0;
        moveCarousel();
    }, 3000);


    carousel.addEventListener('mouseenter', () => clearInterval(autoScroll));
    carousel.addEventListener('mouseleave', () => {
        autoScroll = setInterval(() => {
            index++;
            if (index > cards.length - Math.floor(carouselContainer.offsetWidth / cards[0].offsetWidth)) index = 0;
            moveCarousel();
        }, 3000);
    });
});

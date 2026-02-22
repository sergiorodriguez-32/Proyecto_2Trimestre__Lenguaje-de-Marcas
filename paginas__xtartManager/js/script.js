window.addEventListener('load', () => {
    const carousels = document.querySelectorAll('.eq-carrousel-container');

    carousels.forEach(container => {

        const carousel = container.querySelector('.eq-carrousel');
        const btnLeft = container.querySelector('.eq-carrousel-btn--left');
        const btnRight = container.querySelector('.eq-carrousel-btn--right');

        let cards = carousel.querySelectorAll('.eq-carrousel__card--size, .eq-carrousel__card');
        if (cards.length === 0) return;

        const gap = parseInt(getComputedStyle(carousel).gap) || 0;
        let cardWidth = cards[0].offsetWidth + gap;
        let visibleCards = Math.floor(container.offsetWidth / cardWidth);


        const firstClones = [...cards].slice(0, visibleCards).map(card => card.cloneNode(true));
        const lastClones = [...cards].slice(-visibleCards).map(card => card.cloneNode(true));

        firstClones.forEach(clone => carousel.appendChild(clone));
        lastClones.forEach(clone => carousel.insertBefore(clone, cards[0]));


        cards = carousel.querySelectorAll('.eq-carrousel__card--size, .eq-carrousel__card');

        let index = visibleCards;
        let isTransitioning = false;

        function moveCarousel(animate = true) {
            carousel.style.transition = animate ? 'transform 1.2s ease-in-out' : 'none';

            carousel.style.transform = `translateX(${-index * cardWidth}px)`;
        }

        moveCarousel(false);

        btnRight.addEventListener('click', () => {
            if (isTransitioning) return;
            isTransitioning = true;
            index++;
            moveCarousel();
        });

        btnLeft.addEventListener('click', () => {
            if (isTransitioning) return;
            isTransitioning = true;
            index--;
            moveCarousel();
        });

        carousel.addEventListener('transitionend', () => {
            isTransitioning = false;

            if (index >= cards.length - visibleCards) {
                index = visibleCards;
                moveCarousel(false);
            }
            if (index < visibleCards) {
                index = cards.length - visibleCards * 2;
                moveCarousel(false);
            }
        });


        let autoScroll = setInterval(() => btnRight.click(), 3000);
        carousel.addEventListener('mouseenter', () => clearInterval(autoScroll));
        carousel.addEventListener('mouseleave', () => autoScroll = setInterval(() => btnRight.click(), 3000));


        window.addEventListener('resize', () => {
            cardWidth = cards[0].offsetWidth + gap;
            visibleCards = Math.floor(container.offsetWidth / cardWidth);
            moveCarousel(false);
        });
    });
});



// Rotación de los equipos clasificados en la página de la Supercopa y calendario de partidos

document.querySelectorAll(".sc-footballTeams__box, .p-days__box")
.forEach(box => {

    const carrusel = box.querySelector("[class$='__carrusel']");
    const container = box.querySelector("[class$='__wrapper']");
    const btnLeft = box.querySelector("[class$='__button--left']");
    const btnRight = box.querySelector("[class$='__button--right']");

    let autoplay;

    function moverDerecha() {
        const card = carrusel.firstElementChild;
        const cardWidth = card.offsetWidth + 20;

        carrusel.style.transform = `translateX(-${cardWidth}px)`;

        setTimeout(() => {
            carrusel.style.transition = "none";
            carrusel.appendChild(card);
            carrusel.style.transform = "translateX(0)";
            carrusel.offsetHeight;
            carrusel.style.transition = "transform 0.6s ease";
        }, 600);
    }

    function moverIzquierda() {
        const last = carrusel.lastElementChild;
        const cardWidth = last.offsetWidth + 20;

        carrusel.style.transition = "none";
        carrusel.prepend(last);
        carrusel.style.transform = `translateX(-${cardWidth}px)`;

        carrusel.offsetHeight;
        carrusel.style.transition = "transform 0.6s ease";
        carrusel.style.transform = "translateX(0)";
    }

    btnRight.addEventListener("click", moverDerecha);
    btnLeft.addEventListener("click", moverIzquierda);

    function iniciarAutoplay() {
        autoplay = setInterval(moverDerecha, 2500);
    }

    function pararAutoplay() {
        clearInterval(autoplay);
    }

    iniciarAutoplay();

    container.addEventListener("mouseenter", pararAutoplay);
    container.addEventListener("mouseleave", iniciarAutoplay);
});


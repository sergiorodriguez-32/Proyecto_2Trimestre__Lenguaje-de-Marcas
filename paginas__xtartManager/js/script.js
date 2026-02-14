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

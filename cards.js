document.addEventListener('DOMContentLoaded', function() {
    const cards = Array.from(document.querySelectorAll('.hidden-card'));
    let flippedCard = false;
    let lockBoard = false;
    let firstCard, secondCard;
    let matchedPairs = 0;

    function flipCard() {
        if (lockBoard) return;
        if (this === firstCard) return;
        if (this.classList.contains('found')) return;

        this.classList.add('flipped');

        if (!flippedCard) {
            flippedCard = true;
            firstCard = this;
        } else {
            secondCard = this;
            checkMatch();
        }
    }
    
    function checkMatch() {
        const isMatch = firstCard.dataset.cards === secondCard.dataset.cards;
        isMatch ? markAsFound() : unflipCards();
    }
    
    function markAsFound() {
        firstCard.classList.add('found');
        secondCard.classList.add('found');
        matchedPairs++;
        
        if (matchedPairs === 3) {
            showVictory();
        }
        
        resetTurn();
    }
    
    function unflipCards() {
        lockBoard = true;

        setTimeout(() => {
            firstCard.classList.remove('flipped');
            secondCard.classList.remove('flipped');
            resetTurn();
        }, 700);
    }

    function resetTurn() {
        flippedCard = false;
        lockBoard = false;
        firstCard = null;
        secondCard = null;
    }
    
    function showVictory() {
        const container = document.getElementById('starsAnimation');
        const starsWrapper = container.querySelector('.stars-container');
        
        starsWrapper.innerHTML = '';
        
        const colors = ['GreenStar.svg', 'BlueStar.svg', 'RedStar.svg', 'PurpleStar.svg', 'YellowStar.svg'];
        const starsCount = 40;
        
        for (let i = 0; i < starsCount; i++) {
            const star = document.createElement('img');
            star.className = 'star';
            star.src = `img/${colors[Math.floor(Math.random() * colors.length)]}`;
            
            const startX = Math.random() * window.innerWidth;
            const startY = Math.random() * window.innerHeight;
            const moveX = (Math.random() - 0.2) * 200;
            const moveY = (Math.random() - 0.5) * 300 - 300;
            
            star.style.left = `${startX}px`;
            star.style.top = `${startY}px`;
            star.style.setProperty('--tx', `${moveX}px`);
            star.style.setProperty('--ty', `${moveY}px`);
            star.style.animationDelay = `${Math.random()}s`;
            
            starsWrapper.appendChild(star);
        }
        
        container.classList.add('active');
        
        setTimeout(() => {
            container.classList.remove('active');
        }, 1500);
    }

    cards.forEach(card => card.addEventListener('click', flipCard));
});
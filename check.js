document.addEventListener('DOMContentLoaded', function() {
    const input = document.querySelector('.field input');
    const searchButton = document.querySelector('.search');
    const ratings = [
        document.querySelector('.rating1'),
        document.querySelector('.rating2'),
        document.querySelector('.rating3'),
        document.querySelector('.rating4')
    ];
    const textToAnimate = document.querySelector('.blue-content span');
    const ratingStorage = {};
    
    let lastRating = null;
    let lastSearchedValue = '';
    let currentVisible = 0;
    let timeout = null;

    function reset() {
        ratings.forEach(r => r.style.opacity = '0');
        currentVisible = 0;
    }

    function error() {
        reset();
        textToAnimate.style.animation = 'none';
        textToAnimate.offsetHeight;
        textToAnimate.style.animation = 'blink-line 1.5s ease-in-out';
    }
    
    function showVictory() {
        const container = document.getElementById('starsAnimation');
        if (!container) return;
        
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
            const moveX = (Math.random() - 0.5) * 400;
            const moveY = (Math.random() - 0.6) * 300 - 300;
            
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

    function animate(final) {
        if (timeout) clearTimeout(timeout);
        
        if (final > currentVisible) {
            for (let i = currentVisible; i < final; i++) {
                timeout = setTimeout(() => {
                    ratings[i].style.opacity = '1';
                    currentVisible = i + 1;
                    if (currentVisible === 4) {
                        showVictory();
                    }
                }, (i - currentVisible) * 300);
            }
        } else if (final < currentVisible) {
            for (let i = currentVisible - 1; i >= final; i--) {
                timeout = setTimeout(() => {
                    ratings[i].style.opacity = '0';
                    currentVisible = i;
                }, (currentVisible - 1 - i) * 300);
            }
        }
    }
    
    function getRating() {
        let available = [1, 2, 3, 4];
        if (lastRating) {
            available = available.filter(r => r !== lastRating);
        }
        const random = available[Math.floor(Math.random() * available.length)];
        lastRating = random;
        animate(random);
        return random;
    }
    
    function check() {
        const value = input.value.trim();
        
        if (!value) {
            error();
            lastSearchedValue = '';
            return;
        }
        
        if (value === lastSearchedValue) return;
        
        lastSearchedValue = value;
        
        if (ratingStorage[value]) {
            animate(ratingStorage[value]);
        } else {
            ratingStorage[value] = getRating();
        }
    }
    
    searchButton.addEventListener('click', check);
    input.addEventListener('keypress', e => e.key === 'Enter' && check());
});
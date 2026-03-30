document.addEventListener('DOMContentLoaded', function() {
    const cells = document.querySelectorAll('.cell input');
    const COLS = 6;
    
    const WORDS = ['ЗАБОТА', 'СЕРДЦЕ', 'ЛАСКА', 'ТЕПЛО', 'ЛЮБОВЬ'];
    const WORD_LENGTHS = [6, 6, 5, 5, 6];
    let completedRows = 0;
    let rowCompleted = [false, false, false, false, false];

    function getWord(row) {
        const start = row * COLS;
        const length = WORD_LENGTHS[row];
        let word = '';
        
        for (let i = start; i < start + length; i++) {
            word += cells[i].value.toUpperCase();
        }
        return word;
    }
    
    function clearRow(row) {
        const start = row * COLS;
        const length = WORD_LENGTHS[row];
        
        for (let i = start; i < start + length; i++) {
            cells[i].value = '';
        }
    }
    
    function animateRow(row, className) {
        const start = row * COLS;
        const length = WORD_LENGTHS[row];
        
        for (let i = start; i < start + length; i++) {
            const cellDiv = cells[i].closest('.cell');
            cellDiv.classList.add(className);
            
            setTimeout(() => {
                cellDiv.classList.remove(className);
            }, 1500);
        }
    }
    
    function showVictoryStars() {
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
            const moveX = (Math.random() - 0.6) * 200;
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
    
    function checkAllWordsComplete() {
        if (completedRows === WORDS.length) {
            showVictoryStars();
        }
    }
    
    function checkRow(row) {
        const currentWord = getWord(row);
        const correctWord = WORDS[row];
        const start = row * COLS;
        const length = WORD_LENGTHS[row];
        
        let isFull = true;
        for (let i = start; i < start + length; i++) {
            if (!cells[i].value) {
                isFull = false;
                break;
            }
        }
        
        if (isFull && !rowCompleted[row]) {
            if (currentWord === correctWord) {
                animateRow(row, 'correct-animation');
                rowCompleted[row] = true;
                completedRows++;
                checkAllWordsComplete();
            } else {
                animateRow(row, 'wrong-animation');
                setTimeout(() => clearRow(row), 1500);
            }
        }
    }
    
    cells.forEach((cell, index) => {
        cell.addEventListener('input', function() {
            const row = Math.floor(index / COLS);
            const start = row * COLS;
            const length = WORD_LENGTHS[row];
            const lastIndex = start + length - 1;
            
            if (this.value.length === 1) {
                const nextIndex = index + 1;
                const nextRow = Math.floor(nextIndex / COLS);
                
                if (nextIndex <= lastIndex && nextRow === row) {
                    cells[nextIndex].focus();
                } else {
                    this.blur();
                    checkRow(row);
                }
            }
        });
        
        cell.addEventListener('keydown', function(e) {
            if (e.key === 'Backspace' && !this.value) {
                const row = Math.floor(index / COLS);
                const start = row * COLS;
                const prevIndex = index - 1;
                const prevRow = Math.floor(prevIndex / COLS);
                
                if (prevIndex >= start && prevRow === row) {
                    cells[prevIndex].focus();
                    cells[prevIndex].value = '';
                }
            }
        });
    });
});
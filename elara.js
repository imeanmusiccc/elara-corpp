document.addEventListener('DOMContentLoaded', function() {
    const colors = ['#fff', '#5FCE4E', '#4ED0FF', '#BF46D7', '#C92525'];
    let currentIndex = 0;
    
    const h1 = document.querySelector('.yellow-content h1');
    const p = document.querySelector('.yellow-content p');
    const yellowContent = document.querySelector('.yellow-content');

    function changeColors() {
        currentIndex = (currentIndex + 1) % colors.length;
        h1.style.color = colors[currentIndex];
        p.style.color = colors[currentIndex];
    }
    if (yellowContent) {
        yellowContent.addEventListener('click', changeColors);
    }
});
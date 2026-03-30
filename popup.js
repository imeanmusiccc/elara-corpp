document.addEventListener('DOMContentLoaded', () => {
    const registration = document.querySelector('.registration');
    const popup = document.getElementById('popup');
    const closeBtn = document.querySelector('.popup-close');

    if (registration && popup && closeBtn) {
        registration.addEventListener('click', () => {
            popup.style.display = 'flex';
            setTimeout(() => {
                popup.classList.add('show');
            }, 10);
        });
        
        closeBtn.addEventListener('click', () => {
            popup.classList.remove('show');
            setTimeout(() => {
                popup.style.display = 'none';
            }, 300);
        });
    }
});
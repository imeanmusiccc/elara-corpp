document.addEventListener('DOMContentLoaded', function() {
    const containers = {
        red: document.querySelector('.red-container'),
        green: document.querySelector('.green-container'),
        blue: document.querySelector('.blue-container'),
        footer: document.querySelector('.footer-container')
    };

    function isElementVisible(element) {
        const rect = element.getBoundingClientRect();
        return rect.top <= window.innerHeight && rect.bottom >= 0;
    }
    
    function startAnimation(element) {
        if (element && !element.hasAttribute('data-animated')) {
            if (isElementVisible(element)) {
                element.style.animationPlayState = 'running';
                element.setAttribute('data-animated', 'true');
            }
        }
    }
    
    function checkAllContainers() {
        startAnimation(containers.red);
        startAnimation(containers.green);
        startAnimation(containers.blue);
        startAnimation(containers.footer);
    }
    
    window.addEventListener('scroll', checkAllContainers);
    checkAllContainers();
});
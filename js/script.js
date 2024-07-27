document.addEventListener('DOMContentLoaded', function() {
    const logo = document.getElementById('logo');
    logo.addEventListener('click', handleLogoClick);


});

function handleLogoClick() {
    this.classList.remove('roll-in');
    void this.offsetWidth; 
    this.classList.add('spin-away'); 
    setTimeout(() => {
        this.classList.remove('spin-away');
        this.classList.add('roll-in');
    }, 2500);
}
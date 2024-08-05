

const islandBlock = document.querySelector('.island-block');
const logo = document.getElementById('logo');

document.addEventListener('DOMContentLoaded', function() {
    logo.addEventListener('click', handleLogoClick);
    islandBlock.addEventListener('mousemove', handleMouseMove);
    islandBlock.addEventListener('mouseleave', handleMouseLeave);

    initializeCanvas();
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

function handleMouseMove(e) {
    const islandBlock = e.currentTarget;
    const rect = islandBlock.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const moveX = (x - rect.width / 2) / 10; 
    const moveY = (y - rect.height / 2) / 10;
    islandBlock.style.transform = `translate(${moveX}px, ${moveY}px)`;
}

function handleMouseLeave(e) {
    const islandBlock = e.currentTarget;
    // islandBlock.style.transform = 'translate(0, 0)';
}

$(function () {
    $('[data-toggle="tooltip"]').tooltip({
      placement: 'bottom'
    });
  });


const islandBlock = document.querySelector('.island-block');
const logo = document.getElementById('logo');
const canvas = document.getElementById('codeCanvas');
const ctx = canvas.getContext('2d');

document.addEventListener('DOMContentLoaded', function() {
    logo.addEventListener('click', handleLogoClick);
    islandBlock.addEventListener('mousemove', handleMouseMove);
    islandBlock.addEventListener('mouseleave', handleMouseLeave);

    initializeCanvas();
});

function initializeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    console.log(window.innerHeight);
    console.log(window.innerWidth);

    const lines = [];
    const isMobile = window.innerWidth < 768;
    const maxLines = isMobile ? 200 : 500;
    const lineHeight = 20;

    function getRandomCode() {
        const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789[]{}.,;:<>?!@#$%^';
        return chars.charAt(Math.floor(Math.random() * chars.length));
    }

    function createLine() {
        return {
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height,
            text: getRandomCode(),
            speed: Math.random() * (isMobile ? 1 : 3) + 1
        };
    }

    for (let i = 0; i < maxLines; i++) {
        lines.push(createLine());
    }

    function draw() {
        ctx.fillStyle = '#262626';
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        ctx.fillStyle = '#0F0';
        ctx.font = `${lineHeight}px monospace`;

        lines.forEach(line => {
            ctx.fillText(line.text, line.x, line.y);
            line.y += line.speed;

            if (line.y > canvas.height) {
                line.y = 0;
                line.x = Math.random() * canvas.width;
                line.text = getRandomCode();
            }
        });

        requestAnimationFrame(draw);
    }

    draw();
}

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
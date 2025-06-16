// Botão voltar ao topo
const btn = document.getElementById('btnTop');
window.addEventListener('scroll', () => {
    btn.style.display = window.scrollY > 200 ? 'block' : 'none';
});

btn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
});

// Scroll suave nos links
document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
                target.scrollIntoView({ behavior: 'smooth' });
        }
    });
});

// Máquina de escrever
const frases = ["Confiança e velocidade x5", "Tecnologia com propósito", "Transformando ideias em soluções"];
let i = 0, j = 0;
let currentFrase = '';
let isDeleting = false;
const el = document.getElementById("typing");

function type() {
    currentFrase = frases[i];
    
    if (isDeleting) {
        el.textContent = currentFrase.substring(0, j);
        j--;
    } else {
        el.textContent = currentFrase.substring(0, j);
        j++;
    }

    if (!isDeleting && j === currentFrase.length + 1) {
        isDeleting = true;
        setTimeout(type, 2000);
    } else if (isDeleting && j === -1) {
        isDeleting = false;
        i = (i + 1) % frases.length;
        j = 0;
        setTimeout(type, 1000);
    } else {
        setTimeout(type, isDeleting ? 30 : 80);
    }
}

type();

// Botão voltar ao topo
const btnTop = document.getElementById('btnTop');

window.addEventListener('scroll', () => {
    if (window.scrollY > 300) {
        btnTop.style.display = 'flex';
        btnTop.classList.add('visible');
    } else {
        btnTop.classList.remove('visible');
        setTimeout(() => {
            if (window.scrollY <= 300) {
                btnTop.style.display = 'none';
            }
        }, 300);
    }
});

btnTop.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
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
const frases = [
    "Confiança e velocidade x5",
    "Tecnologia com propósito",
    "Transformando ideias em soluções",
    "Inovação que transforma seu negócio",
    "Soluções digitais que fazem a diferença",
    "Tecnologia que conecta pessoas"
];
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

// Função para animar os contadores
function animateCounters() {
    const counters = document.querySelectorAll('.contador');
    
    counters.forEach(counter => {
        const target = parseInt(counter.getAttribute('data-valor'));
        const duration = 2000; // 2 segundos
        const step = target / (duration / 16); // 60fps
        let current = 0;

        const updateCounter = () => {
            current += step;
            if (current < target) {
                counter.textContent = Math.floor(current);
                requestAnimationFrame(updateCounter);
            } else {
                counter.textContent = target;
            }
        };

        updateCounter();
    });
}

// Observador de Intersecção para iniciar a animação quando o elemento estiver visível
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            animateCounters();
            observer.unobserve(entry.target);
        }
    });
}, { threshold: 0.5 });

// Observar o container de estatísticas
const estatisticasContainer = document.querySelector('.estatisticas-container');
if (estatisticasContainer) {
    observer.observe(estatisticasContainer);
}

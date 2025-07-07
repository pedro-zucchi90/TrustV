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

// ===== WIDGET DE PREVISÃO DO TEMPO =====
window.addEventListener('DOMContentLoaded', () => {
    const widget = document.getElementById('weather-widget');
    if (!widget) return;
  
    const icon = widget.querySelector('.weather-icon');
    const desc = widget.querySelector('.weather-desc');
    const temp = widget.querySelector('.weather-temp');
  
    // Concórdia-SC: lat -27.2333, lon -52.0278
    fetch('https://api.open-meteo.com/v1/forecast?latitude=-27.2333&longitude=-52.0278&current_weather=true&timezone=America%2FSao_Paulo')
      .then(res => res.json())
      .then(data => {
        if (data && data.current_weather) {
          const t = Math.round(data.current_weather.temperature);
          const wcode = data.current_weather.weathercode;
  
          let wdesc = 'Tempo desconhecido';
          let wiconClass = 'wi wi-na';
  
          // Mapas de códigos para descrições e classes do weather-icons
          if ([0].includes(wcode)) { wdesc = 'Céu limpo'; wiconClass = 'wi wi-day-sunny'; }
          else if ([1].includes(wcode)) { wdesc = 'Predominantemente limpo'; wiconClass = 'wi wi-day-sunny-overcast'; }
          else if ([2].includes(wcode)) { wdesc = 'Parcialmente nublado'; wiconClass = 'wi wi-day-cloudy'; }
          else if ([3].includes(wcode)) { wdesc = 'Nublado'; wiconClass = 'wi wi-cloudy'; }
          else if ([45, 48].includes(wcode)) { wdesc = 'Névoa'; wiconClass = 'wi wi-fog'; }
          else if ([51, 53, 55].includes(wcode)) { wdesc = 'Garoa'; wiconClass = 'wi wi-sprinkle'; }
          else if ([56, 57].includes(wcode)) { wdesc = 'Garoa congelante'; wiconClass = 'wi wi-rain-mix'; }
          else if ([61].includes(wcode)) { wdesc = 'Chuva fraca'; wiconClass = 'wi wi-showers'; }
          else if ([63].includes(wcode)) { wdesc = 'Chuva moderada'; wiconClass = 'wi wi-rain'; }
          else if ([65].includes(wcode)) { wdesc = 'Chuva forte'; wiconClass = 'wi wi-rain-wind'; }
          else if ([66, 67].includes(wcode)) { wdesc = 'Chuva congelante'; wiconClass = 'wi wi-rain-mix'; }
          else if ([71, 73, 75, 77].includes(wcode)) { wdesc = 'Neve'; wiconClass = 'wi wi-snow'; }
          else if ([80, 81, 82].includes(wcode)) { wdesc = 'Aguaceiro'; wiconClass = 'wi wi-showers'; }
          else if ([85, 86].includes(wcode)) { wdesc = 'Aguaceiro de neve'; wiconClass = 'wi wi-snow'; }
          else if ([95].includes(wcode)) { wdesc = 'Tempestade'; wiconClass = 'wi wi-thunderstorm'; }
          else if ([96, 99].includes(wcode)) { wdesc = 'Tempestade com granizo'; wiconClass = 'wi wi-thunderstorm'; }
  
          // Atualiza conteúdo
          desc.textContent = wdesc;
          temp.textContent = t + '°C';
          icon.className = 'weather-icon ' + wiconClass;
          icon.title = wdesc;
          icon.style.display = 'inline-block';
          widget.style.opacity = 0;
          widget.style.transition = 'opacity 1s';
          setTimeout(() => { widget.style.opacity = 1; }, 200);
        } else {
          desc.textContent = 'Não foi possível obter o tempo.';
          icon.className = 'weather-icon wi wi-na';
          icon.title = 'Tempo desconhecido';
          icon.style.display = 'inline-block';
        }
      })
      .catch(() => {
        desc.textContent = 'Erro ao buscar previsão.';
        icon.className = 'weather-icon wi wi-na';
        icon.title = 'Tempo desconhecido';
        icon.style.display = 'inline-block';
      });
  });
  

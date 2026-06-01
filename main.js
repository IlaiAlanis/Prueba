/* ══ VIEWPORT HEIGHT FIX ══ */
function lockViewportHeight() {
  const vh = window.innerHeight * 0.01;

  document.documentElement.style.setProperty('--vh', `${vh}px`);
  document.documentElement.style.setProperty('--hero-h', `${window.innerHeight}px`);
}

lockViewportHeight();

let resizeTimeout;

window.addEventListener('resize', () => {
  clearTimeout(resizeTimeout);

  resizeTimeout = setTimeout(() => {
    lockViewportHeight();
  }, 150);
});

window.addEventListener('orientationchange', () => {
  setTimeout(lockViewportHeight, 300);
});

/* ══ COUNTDOWN ══ */
const EVENTO = new Date('2026-07-11T19:00:00');
const cdDays  = document.getElementById('cd-days');
const cdHours = document.getElementById('cd-hours');
const cdMins  = document.getElementById('cd-mins');
const cdSecs  = document.getElementById('cd-secs');

function updateCountdown() {
  const diff = EVENTO - Date.now();
  if (diff <= 0) {
    [cdDays, cdHours, cdMins, cdSecs].forEach(el => el.textContent = '00');
    return;
  }
  cdDays.textContent  = String(Math.floor(diff / 86400000)).padStart(2, '0');
  cdHours.textContent = String(Math.floor((diff % 86400000) / 3600000)).padStart(2, '0');
  cdMins.textContent  = String(Math.floor((diff % 3600000) / 60000)).padStart(2, '0');
  cdSecs.textContent  = String(Math.floor((diff % 60000) / 1000)).padStart(2, '0');
}
updateCountdown();
setInterval(updateCountdown, 1000);

/* ══ SCROLL REVEAL ══ */
const scroller = document.getElementById('scroll-container') || window;

const revealObs = new IntersectionObserver((entries) => {
  entries.forEach((entry, i) => {
    if (!entry.isIntersecting) return;
    setTimeout(() => entry.target.classList.add('visible'), i * 80);
    revealObs.unobserve(entry.target);
  });
}, { threshold: 0.08, root: document.getElementById('scroll-container') });

document.querySelectorAll('.reveal').forEach(el => revealObs.observe(el));

/* ══ HERO PARALLAX ══ */
const heroBg  = document.getElementById('heroBg');
const heroEl  = heroBg ? heroBg.closest('.hero') : null;
let ticking   = false;
let heroActive = true;

if (heroEl) {
  const heroExitObs = new IntersectionObserver((entries) => {
    heroActive = entries[0].isIntersecting;
    if (!heroActive && heroBg) heroBg.style.transform = 'translateY(0)';
  }, { threshold: 0, root: document.getElementById('scroll-container') });
  heroExitObs.observe(heroEl);
}

function applyParallax() {
  if (heroBg && heroActive) {
    const y = scroller.scrollTop !== undefined ? scroller.scrollTop : window.scrollY;
    heroBg.style.transform = `translateY(${y * 0.35}px)`;
  }
  ticking = false;
}

scroller.addEventListener('scroll', () => {
  if (!ticking && heroActive) {
    requestAnimationFrame(applyParallax);
    ticking = true;
  }
}, { passive: true });

/* ══ ADD TO CALENDAR ══ */
function addToCalendar() {
  const params = new URLSearchParams({
    action:   'TEMPLATE',
    text:     'XV Años — Miranda',
    dates:    '20260711T190000/20260712T010000',
    details:  '¡Celebración de los XV años de Miranda!',
    location: 'Guadalupe, N.L., México',
  });
  window.open(`https://calendar.google.com/calendar/render?${params}`, '_blank');
}

/* ══ MUSIC PLAYER ══ */
const musica = document.getElementById('musicaFondo');
const boton  = document.getElementById('botonMusica');

boton.addEventListener('click', () => {
  if (musica.paused) {
    musica.play();
    boton.textContent = '❚❚';
  } else {
    musica.pause();
    boton.textContent = '▶';
  }
});

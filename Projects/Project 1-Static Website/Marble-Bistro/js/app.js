const API_URL = "https://r5us992pmb.execute-api.af-south-1.amazonaws.com/prod"; 

/* ====== Submit helper (unchanged behaviour) ====== */
async function postSubmission(payload) {
  const url = `${API_URL}/submit`;
  const resp = await fetch(url, {
    method: 'POST',
    headers: {'Content-Type':'application/json'},
    body: JSON.stringify(payload)
  });
  if (!resp.ok) {
    const text = await resp.text().catch(()=>null);
    throw new Error(text || 'Network response was not ok');
  }
  return resp.json();
}

function formToObject(form) {
  const data = {};
  new FormData(form).forEach((v,k)=> {
    data[k] = v;
  });
  return data;
}

/* ====== Form submit handling (booking + order) ====== */
document.addEventListener('submit', async (e) => {
  if (!e.target.matches('#bookingForm') && !e.target.matches('#orderForm')) return;
  e.preventDefault();
  const form = e.target;
  const statusEl = form.querySelector('.status') || document.getElementById(form.id === 'bookingForm' ? 'bookingStatus' : 'orderStatus');

    // show small animated spinner
  statusEl.innerHTML = `<span style="display:inline-block;vertical-align:middle;margin-right:8px">⏳</span>Sending…`;
  try {
    const payload = formToObject(form);
    payload.createdAt = new Date().toISOString();
    const res = await postSubmission(payload);
    
    // success animation: checkmark
    statusEl.innerHTML = `<span style="display:inline-block;vertical-align:middle;margin-right:8px">✅</span>Saved`;
    
    // small delay so user sees the success
    setTimeout(()=> location.href = 'confirmation.html', 700);
  } catch (err) {
    console.error(err);
    statusEl.textContent = 'Failed to send. Please try again later.';
    
    // Shake the status to indicate error
    if (statusEl.animate) {
      statusEl.animate([
        { transform: 'translateX(0)' },
        { transform: 'translateX(-8px)' },
        { transform: 'translateX(8px)' },
        { transform: 'translateX(0)' }
      ], { duration: 450, iterations: 1 });
    }
  }
});

/* ====== AOS init (Animate on Scroll) ====== */
if (window.AOS) {
  AOS.init({
    duration: 800,
    once: true,
    easing: 'ease-out-cubic',
    offset: 80
  });
}

/* ====== GSAP animations (hero, menu cards, smooth page intro) ====== */
function initGSAP() {
  if (!window.gsap) return;
  // hero intro timeline
  const heroTitle = document.querySelector('.hero-title');
  const heroLead = document.querySelector('.hero-lead');
  const ctas = document.querySelectorAll('.hero .btn');

  const tl = gsap.timeline({defaults:{ease:'power3.out'}});
  tl.from(heroTitle, {y: 30, opacity: 0, duration: 0.8})
    .from(heroLead, {y: 18, opacity: 0, duration: 0.6}, '-=0.4')
    .from(ctas, {y: 18, opacity: 0, duration: 0.6, stagger: 0.12}, '-=0.35');

  // subtle parallax on scroll for hero background
  window.addEventListener('scroll', ()=> {
    const sc = window.scrollY;
    if (heroTitle) {
      const t = Math.min(sc * 0.03, 18);
      heroTitle.style.transform = `translateY(${t}px)`;
    }
  });

  // add hover micro-interactions for menu cards
  document.querySelectorAll('.card').forEach(card => {
    card.addEventListener('mouseenter', ()=> gsap.to(card, {scale: 1.01, boxShadow: '0 20px 50px rgba(0,0,0,0.6)', duration:0.35}));
    card.addEventListener('mouseleave', ()=> gsap.to(card, {scale: 1, boxShadow: 'none', duration:0.35}));
  });
}

document.addEventListener('DOMContentLoaded', ()=> {
  initGSAP();
});
/* ====== Menu Flipbook animation ====== */
(function(){
  const pages = Array.from(document.querySelectorAll('.menu-page'));
  const nextBtn = document.getElementById('nextPage');
  const prevBtn = document.getElementById('prevPage');
  let current = 0;
  const duration = 0.9;

  function showPage(index, direction){
    pages.forEach((page, i) => {
      if (i === index){
        page.style.zIndex = 3;
        gsap.fromTo(page,
          { rotationY: direction === 'next' ? 180 : -180, opacity: 0 },
          { rotationY: 0, opacity: 1, duration, ease: "power2.out" }
        );
      } else if (i < index){
        gsap.to(page, { rotationY: -180, opacity: 0, duration, ease: "power2.inOut" });
        page.style.zIndex = 1;
      } else {
        gsap.to(page, { rotationY: 180, opacity: 0, duration, ease: "power2.inOut" });
        page.style.zIndex = 0;
      }
    });
  }

  nextBtn?.addEventListener('click', () => {
    if (current < pages.length - 1){
      current++;
      showPage(current, 'next');
    }
  });

  prevBtn?.addEventListener('click', () => {
    if (current > 0){
      current--;
      showPage(current, 'prev');
    }
  });

  // Swipe (mobile)
  let startX = null;
  document.addEventListener('touchstart', e => startX = e.touches[0].clientX);
  document.addEventListener('touchend', e => {
    if (startX === null) return;
    const diff = e.changedTouches[0].clientX - startX;
    if (diff > 50) prevBtn.click();
    else if (diff < -50) nextBtn.click();
    startX = null;
  });

  // Initialize
  pages[current].style.opacity = 1;
  pages[current].style.zIndex = 3;
})();


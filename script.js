// Set email dynamically to prevent Cloudflare obfuscation
  (function(){
    var u = 'muhammad.abia';
    var d = 'gmail.com';
    var el = document.getElementById('contactEmail');
    if(el){ el.href = 'mailto:' + u + '@' + d; }
  })();

  // Scroll observer for fade-up animations
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if(entry.isIntersecting){
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, {threshold:0.05, rootMargin:'0px 0px -50px 0px'});
  document.querySelectorAll('.fade-up').forEach(el=>observer.observe(el));

  // Gallery carousel
  (function(){
    const track = document.getElementById('galleryTrack');
    const dots = document.querySelectorAll('.gallery-dot');
    const total = 3;
    let current = 0;
    let autoTimer;

    function goTo(idx){
      current = (idx + total) % total;
      track.style.transform = 'translateX(-' + (current * 100) + '%)';
      dots.forEach((d,i) => d.classList.toggle('active', i === current));
    }

    document.getElementById('galleryPrev').addEventListener('click', () => { goTo(current - 1); resetAuto(); });
    document.getElementById('galleryNext').addEventListener('click', () => { goTo(current + 1); resetAuto(); });
    dots.forEach(d => d.addEventListener('click', () => { goTo(+d.dataset.index); resetAuto(); }));

    // Swipe support
    let startX = 0;
    track.addEventListener('touchstart', e => { startX = e.touches[0].clientX; }, {passive:true});
    track.addEventListener('touchend', e => {
      const diff = startX - e.changedTouches[0].clientX;
      if(Math.abs(diff) > 50){ goTo(diff > 0 ? current + 1 : current - 1); resetAuto(); }
    });

    // Auto-play every 4s
    function startAuto(){ autoTimer = setInterval(() => goTo(current + 1), 4000); }
    function resetAuto(){ clearInterval(autoTimer); startAuto(); }
    startAuto();
  })();

  // Projects carousel
  (function(){
    const track = document.getElementById('projectsTrack');
    const dots = document.querySelectorAll('.projects-dot');
    const total = 3;
    let current = 0;

    function goTo(idx){
      current = (idx + total) % total;
      track.style.transform = 'translateX(-' + (current * 100) + '%)';
      dots.forEach((d,i) => d.classList.toggle('active', i === current));
    }

    document.getElementById('projectsPrev').addEventListener('click', () => goTo(current - 1));
    document.getElementById('projectsNext').addEventListener('click', () => goTo(current + 1));
    dots.forEach(d => d.addEventListener('click', () => goTo(+d.dataset.index)));

    // Swipe support
    let startX = 0;
    track.addEventListener('touchstart', e => { startX = e.touches[0].clientX; }, {passive:true});
    track.addEventListener('touchend', e => {
      const diff = startX - e.changedTouches[0].clientX;
      if(Math.abs(diff) > 50) goTo(diff > 0 ? current + 1 : current - 1);
    });
  })();

  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-links a');
  window.addEventListener('scroll', () => {
    let current = '';
    sections.forEach(s => {
      if(window.scrollY >= s.offsetTop - 120) current = s.getAttribute('id');
    });
    navLinks.forEach(a => {
      a.style.color = a.getAttribute('href') === '#' + current ? 'var(--teal)' : '';
    });
  });
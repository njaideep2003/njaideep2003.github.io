/* ============================================================
   PORTFOLIO JAVASCRIPT — Jaideep Nutalapati
   Sections:
   1. Data Canvas Animation (hero background)
   2. Typed Role Animation (hero)
   3. Navigation (scroll + mobile toggle)
   4. Project Filter (category tabs)
   5. Google Analytics Event Tracking
   ============================================================ */


/* ============================================================
   1. DATA CANVAS ANIMATION
   Draws subtle flowing data nodes and connection lines
   to give a live-dashboard feel to the hero background
   ============================================================ */
(function initCanvas() {
  const canvas = document.getElementById('data-canvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');

  let nodes = [];
  const NODE_COUNT = 60;
  const MAX_DIST = 130;

  function resize() {
    canvas.width  = window.innerWidth;
    canvas.height = window.innerHeight;
  }

  function createNode() {
    return {
      x:   Math.random() * canvas.width,
      y:   Math.random() * canvas.height,
      vx:  (Math.random() - 0.5) * 0.4,
      vy:  (Math.random() - 0.5) * 0.4,
      r:   Math.random() * 1.5 + 0.5,
    };
  }

  function initNodes() {
    nodes = Array.from({ length: NODE_COUNT }, createNode);
  }

  function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Update positions
    nodes.forEach(n => {
      n.x += n.vx;
      n.y += n.vy;
      if (n.x < 0 || n.x > canvas.width)  n.vx *= -1;
      if (n.y < 0 || n.y > canvas.height) n.vy *= -1;
    });

    // Draw connections
    for (let i = 0; i < nodes.length; i++) {
      for (let j = i + 1; j < nodes.length; j++) {
        const dx   = nodes[i].x - nodes[j].x;
        const dy   = nodes[i].y - nodes[j].y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < MAX_DIST) {
          const alpha = (1 - dist / MAX_DIST) * 0.25;
          ctx.beginPath();
          ctx.strokeStyle = `rgba(56,189,248,${alpha})`;
          ctx.lineWidth   = 0.6;
          ctx.moveTo(nodes[i].x, nodes[i].y);
          ctx.lineTo(nodes[j].x, nodes[j].y);
          ctx.stroke();
        }
      }
    }

    // Draw nodes
    nodes.forEach(n => {
      ctx.beginPath();
      ctx.arc(n.x, n.y, n.r, 0, Math.PI * 2);
      ctx.fillStyle = 'rgba(56,189,248,0.5)';
      ctx.fill();
    });

    requestAnimationFrame(draw);
  }

  resize();
  initNodes();
  draw();
  window.addEventListener('resize', () => { resize(); initNodes(); });
})();


/* ============================================================
   2. TYPED ROLE ANIMATION
   Cycles through role titles in the hero section
   ============================================================ */
(function initTyped() {
  const el = document.getElementById('typed-role');
  if (!el) return;

  const roles = [
    'Data Analytics',
    'Data Visualization',
    'Data Science',
    'Data Engineering',
    
  ];

  let roleIdx  = 0;
  let charIdx  = 0;
  let deleting = false;

  function type() {
    const current = roles[roleIdx];

    if (!deleting) {
      el.textContent = current.slice(0, charIdx + 1);
      charIdx++;
      if (charIdx === current.length) {
        deleting = true;
        setTimeout(type, 1800);
        return;
      }
    } else {
      el.textContent = current.slice(0, charIdx - 1);
      charIdx--;
      if (charIdx === 0) {
        deleting = false;
        roleIdx  = (roleIdx + 1) % roles.length;
      }
    }

    setTimeout(type, deleting ? 60 : 100);
  }

  type();
})();


/* ============================================================
   3. NAVIGATION
   - Scrolled state (adds background)
   - Mobile menu toggle
   - Active link highlight on scroll
   ============================================================ */
(function initNav() {
  const navbar = document.getElementById('navbar');
  const toggle = document.querySelector('.nav-toggle');
  const links  = document.querySelector('.nav-links');

  // Scrolled state
  window.addEventListener('scroll', () => {
    navbar.style.background = window.scrollY > 40
      ? 'rgba(10,14,26,0.97)'
      : 'rgba(10,14,26,0.85)';
  });

  // Mobile toggle
  if (toggle && links) {
    toggle.addEventListener('click', () => {
      links.classList.toggle('open');
    });

    // Close on link click
    links.querySelectorAll('a').forEach(a => {
      a.addEventListener('click', () => links.classList.remove('open'));
    });
  }

  // Active link on scroll
  const sections = document.querySelectorAll('section[id]');
  const navAs    = document.querySelectorAll('.nav-links a');

  function setActive() {
    let current = '';
    sections.forEach(s => {
      if (window.scrollY >= s.offsetTop - 100) current = s.id;
    });
    navAs.forEach(a => {
      a.style.color = a.getAttribute('href') === `#${current}`
        ? 'var(--text)'
        : '';
    });
  }

  window.addEventListener('scroll', setActive);
})();


/* ============================================================
   4. PROJECT FILTER
   Filters project cards by data-category attribute
   ============================================================ */
(function initFilter() {
  const btns  = document.querySelectorAll('.filter-btn');
  const cards = document.querySelectorAll('.project-card');

  btns.forEach(btn => {
    btn.addEventListener('click', () => {
      // Update active button
      btns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filter = btn.dataset.filter;

      cards.forEach(card => {
        const cats = card.dataset.category || '';
        if (filter === 'all' || cats.includes(filter)) {
          card.style.display = '';
        } else {
          card.style.display = 'none';
        }
      });

      // GA4 event tracking — filter click
      if (typeof gtag !== 'undefined') {
        gtag('event', 'project_filter', {
          event_category: 'Projects',
          event_label: filter,
        });
      }
    });
  });
})();


/* ============================================================
   5. GOOGLE ANALYTICS EVENT TRACKING
   Tracks meaningful user interactions beyond page views.
   All events appear in GA4 under Reports > Events.

   GUIDE: Once you replace GA_MEASUREMENT_ID in index.html,
   these events will automatically start tracking:
   - resume_download: which resume was downloaded
   - project_link_click: which project link was clicked
   - contact_form_submit: form submission attempt
   - project_filter: which category was filtered
   ============================================================ */
(function initTracking() {

  // Track resume downloads
  document.querySelectorAll('a[href*="resume/"]').forEach(a => {
    a.addEventListener('click', () => {
      if (typeof gtag !== 'undefined') {
        gtag('event', 'resume_download', {
          event_category: 'Resume',
          event_label: a.href,
        });
      }
    });
  });

  // Track project link clicks
  document.querySelectorAll('.project-links a').forEach(a => {
    a.addEventListener('click', () => {
      if (typeof gtag !== 'undefined') {
        const projectTitle = a.closest('.project-card').querySelector('h3').textContent;
        gtag('event', 'project_link_click', {
          event_category: 'Projects',
          event_label: projectTitle,
        });
      }
    });
  });

  // Track contact form submission
  const form = document.querySelector('.contact-form');
  if (form) {
    form.addEventListener('submit', () => {
      if (typeof gtag !== 'undefined') {
        gtag('event', 'contact_form_submit', {
          event_category: 'Contact',
          event_label: 'Portfolio Contact Form',
        });
      }
    });
  }

})();

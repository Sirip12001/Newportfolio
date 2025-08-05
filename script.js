document.addEventListener('DOMContentLoaded', () => {
  // Typewriter effect
  const phrases = [
    "Full Stack Developer",
    "AI Automation",
    "Cybersecurity"
  ];
  let typewriter = document.querySelector('.typewriter');
  if (typewriter) {
    let phraseIndex = 0, charIndex = 0;
    function typeWriterLoop() {
      if (!typewriter) return;
      typewriter.textContent = phrases[phraseIndex].slice(0, charIndex) + "|";
      charIndex++;
      if (charIndex > phrases[phraseIndex].length) {
        setTimeout(() => {
          charIndex = 0;
          phraseIndex = (phraseIndex + 1) % phrases.length;
          typeWriterLoop();
        }, 1200);
        return;
      }
      setTimeout(typeWriterLoop, 90);
    }
    typeWriterLoop();
  }

  // Scroll to Top button
  const scrollBtn = document.getElementById('scrollTopBtn');
  if(scrollBtn) {
    window.onscroll = function() {
      if (document.body.scrollTop > 210 || document.documentElement.scrollTop > 210) {
        scrollBtn.style.display = "block";
      } else {
        scrollBtn.style.display = "none";
      }
    };
    scrollBtn.onclick = function() {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    };
  }


  // Simple contact form feedback (does not send emails in static sites)
  const contactForm = document.getElementById('contactForm');
  if(contactForm) {
    contactForm.onsubmit = function(e) {
      e.preventDefault();
      const formMsg = document.getElementById('formMsg');
      if (formMsg) {
          formMsg.innerHTML = "<span style='color:green;'>Thank you, message sent!</span>";
          setTimeout(() => {
            formMsg.innerHTML = "";
            contactForm.reset();
          }, 2000);
      }
    };
  }

  // Mobile menu toggle
  const menuToggle = document.getElementById('menu-toggle');
  if (menuToggle) {
    menuToggle.onclick = function() {
      const links = document.getElementById('navbar-links');
      if(links) links.classList.toggle('active');
    };
  }

  // Close menu on link click
  const navLinks = document.querySelectorAll('.navbar-links a');
  navLinks.forEach(link => {
    link.addEventListener('click', () => {
      const menu = document.getElementById('navbar-links');
      if (menu && menu.classList.contains('active')) {
        menu.classList.remove('active');
      }
    });
  });

  // Dark Mode Toggle
  const themeSwitch = document.getElementById('checkbox');

  if (themeSwitch) {
    const currentTheme = localStorage.getItem('theme');

    if (currentTheme) {
      document.body.classList.add(currentTheme);
      if (currentTheme === 'dark-mode') {
        themeSwitch.checked = true;
      }
    }

    function switchTheme(e) {
      if (e.target.checked) {
        document.body.classList.add('dark-mode');
        localStorage.setItem('theme', 'dark-mode');
      } else {
        document.body.classList.remove('dark-mode');
        localStorage.setItem('theme', 'light-mode');
      }
    }

    themeSwitch.addEventListener('change', switchTheme, false);
  }

  // AOS Initialization
  AOS.init({
    duration: 1000,
    once: true,
  });

  // Highlight active section in navbar on scroll
  const sections = document.querySelectorAll('section[id]');
  const navLinksObserver = document.querySelectorAll('.navbar-links a');

  const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.5,
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const id = entry.target.getAttribute('id');
        navLinksObserver.forEach(link => {
          link.classList.remove('active');
          // Check if the link is for the resume, if so, don't activate it on scroll
          if (link.getAttribute('href') === `#${id}` && link.getAttribute('target') !== '_blank') {
            link.classList.add('active');
          }
        });
      }
    });
  }, observerOptions);

  sections.forEach(section => {
    observer.observe(section);
  });

  // Project Filtering
  const filterContainer = document.querySelector('.filter-buttons');
  const projectCards = document.querySelectorAll('.projects-grid .project-card');

  if (filterContainer) {
    filterContainer.addEventListener('click', (e) => {
      if (e.target.classList.contains('filter-btn')) {
        filterContainer.querySelector('.active').classList.remove('active');
        e.target.classList.add('active');
        
        const filterValue = e.target.dataset.filter;
        
        projectCards.forEach(card => {
          const cardCategories = card.dataset.category.split(' ');
          if (filterValue === 'all' || cardCategories.includes(filterValue)) {
            card.style.display = 'block';
          } else {
            card.style.display = 'none';
          }
        });
        AOS.refresh();
      }
    });
  }
});

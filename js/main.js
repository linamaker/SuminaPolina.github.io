document.addEventListener('DOMContentLoaded', () => {
  // === Плавный скролл по якорям ===
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        window.scrollTo({
          top: target.offsetTop - 80,
          behavior: 'smooth',
        });
      }
    });
  });

  // === Анимации появления элементов ===
  const revealObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('active');
        } else {
          entry.target.classList.remove('active');
        }
      });
    },
    { threshold: 0.2, rootMargin: '0px 0px -50px 0px' }
  );

  document.querySelectorAll('.reveal-item').forEach((el) => {
    revealObserver.observe(el);
  });

  // === Анимация карточек в секции вопросов ===
  const questionsSection = document.querySelector('#questions');
  const questionCards = document.querySelectorAll('.question-card');

  if (questionsSection && questionCards.length > 0) {
    const questionsObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            questionCards.forEach((card, index) => {
              setTimeout(() => {
                card.classList.add('active');
              }, index * 150);
            });
          } else {
            questionCards.forEach((card) => {
              card.classList.remove('active');
            });
          }
        });
      },
      { threshold: 0.3 }
    );

    questionsObserver.observe(questionsSection);
  }

  // === Бегущая строка соцсетей ===
  const marqueeContent = document.getElementById('marqueeContent');

  if (marqueeContent) {
    const originalIcons = Array.from(marqueeContent.querySelectorAll('.social-icon'));

    if (originalIcons.length > 0) {
      let clones = [];

      const fillMarquee = () => {
        clones.forEach((clone) => clone.remove());
        clones = [];

        const wrapperWidth = marqueeContent.parentElement.offsetWidth;
        const targetWidth = wrapperWidth * 2;

        let currentWidth = 0;
        originalIcons.forEach((icon) => {
          currentWidth += icon.offsetWidth + 40;
        });

        while (currentWidth < targetWidth) {
          originalIcons.forEach((icon) => {
            const clone = icon.cloneNode(true);
            clone.setAttribute('aria-hidden', 'true');
            clone.classList.add('marquee-clone');
            clones.push(clone);
            marqueeContent.appendChild(clone);
            currentWidth += icon.offsetWidth + 40;
          });
        }
      };

      const updateAnimationSpeed = () => {
        const baseDuration = 12;
        const baseWidth = 1200;
        const currentWidth = window.innerWidth;

        const duration = Math.max(6, Math.min(20, (baseDuration * currentWidth) / baseWidth));

        marqueeContent.style.animationDuration = `${duration}s`;
      };

      const updateMarqueeLayout = () => {
        const wasRunning = marqueeContent.style.animationPlayState !== 'paused';
        if (wasRunning) {
          marqueeContent.style.animationPlayState = 'paused';
        }

        fillMarquee();
        updateAnimationSpeed();

        if (wasRunning) {
          setTimeout(() => {
            marqueeContent.style.animationPlayState = 'running';
          }, 50);
        }
      };

      updateMarqueeLayout();

      let resizeTimeout;
      window.addEventListener('resize', () => {
        clearTimeout(resizeTimeout);
        resizeTimeout = setTimeout(updateMarqueeLayout, 150);
      });

      window.addEventListener('load', () => {
        setTimeout(updateMarqueeLayout, 100);
      });
    }
  }

  // === МОБИЛЬНОЕ МЕНЮ ===
  const mobileMenuTrigger = document.querySelector('.mobile-menu-trigger');
  const mobileMenuOverlay = document.getElementById('mobileMenu');
  const mobileMenuClose = document.querySelector('.mobile-menu-close');
  const mobileMenuLinks = document.querySelectorAll('.mobile-menu-nav .nav-link');

  if (mobileMenuTrigger && mobileMenuOverlay) {
    const openMobileMenu = () => {
      mobileMenuOverlay.classList.add('active');
      document.body.classList.add('menu-open');
    };

    const closeMobileMenu = () => {
      mobileMenuOverlay.classList.remove('active');
      document.body.classList.remove('menu-open');
    };

    mobileMenuTrigger.addEventListener('click', openMobileMenu);
    mobileMenuClose.addEventListener('click', closeMobileMenu);

    mobileMenuLinks.forEach((link) => {
      link.addEventListener('click', closeMobileMenu);
    });

    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && mobileMenuOverlay.classList.contains('active')) {
        closeMobileMenu();
      }
    });
  }
});

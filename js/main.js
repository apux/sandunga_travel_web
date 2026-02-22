document.addEventListener("DOMContentLoaded", () => {
  initNavigation();
  initScrollAnimations();
  initStickyHeader();
  initBackToTop();
  initHeroSlideshow();
  initCounterAnimation();
  initNewsletterForm();
  initSmoothScroll();
  initActiveNavHighlight();
  initCopyrightYear();
});

/* ====== COPYRIGHT YEAR ====== */
function initCopyrightYear() {
  const el = document.getElementById("copyright-year");
  if (el) el.textContent = new Date().getFullYear();
}

/* ====== MOBILE NAVIGATION ====== */
function initNavigation() {
  const toggle = document.getElementById("nav-toggle");
  const close = document.getElementById("nav-close");
  const menu = document.getElementById("nav-menu");

  let overlay = document.createElement("div");
  overlay.classList.add("nav__overlay");
  document.body.appendChild(overlay);

  function openMenu() {
    menu.classList.add("nav__menu--open");
    overlay.classList.add("nav__overlay--visible");
    document.body.style.overflow = "hidden";
  }

  function closeMenu() {
    menu.classList.remove("nav__menu--open");
    overlay.classList.remove("nav__overlay--visible");
    document.body.style.overflow = "";
  }

  toggle.addEventListener("click", openMenu);
  close.addEventListener("click", closeMenu);
  overlay.addEventListener("click", closeMenu);

  menu.querySelectorAll(".nav__link").forEach((link) => {
    link.addEventListener("click", closeMenu);
  });
}

/* ====== STICKY HEADER ====== */
function initStickyHeader() {
  const header = document.getElementById("header");
  let lastScroll = 0;

  window.addEventListener(
    "scroll",
    () => {
      const currentScroll = window.scrollY;
      header.classList.toggle("header--scrolled", currentScroll > 50);
      lastScroll = currentScroll;
    },
    { passive: true }
  );
}

/* ====== SCROLL ANIMATIONS ====== */
function initScrollAnimations() {
  const elements = document.querySelectorAll(".animate-on-scroll");

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("animate-on-scroll--visible");
          observer.unobserve(entry.target);
        }
      });
    },
    {
      threshold: 0.1,
      rootMargin: "0px 0px -50px 0px",
    }
  );

  elements.forEach((el) => observer.observe(el));
}

/* ====== BACK TO TOP ====== */
function initBackToTop() {
  const btn = document.getElementById("back-to-top");

  window.addEventListener(
    "scroll",
    () => {
      btn.classList.toggle("back-to-top--visible", window.scrollY > 600);
    },
    { passive: true }
  );

  btn.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  });
}

/* ====== HERO SLIDESHOW ====== */
function initHeroSlideshow() {
  const slides = document.querySelectorAll(".hero__slide");
  if (slides.length <= 1) return;

  let current = 0;
  const interval = 5000;

  setInterval(() => {
    slides[current].classList.remove("hero__slide--active");
    current = (current + 1) % slides.length;
    slides[current].classList.add("hero__slide--active");
  }, interval);
}


/* ====== COUNTER ANIMATION ====== */
function initCounterAnimation() {
  const counters = document.querySelectorAll("[data-count]");

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          animateCounter(entry.target);
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.5 }
  );

  counters.forEach((counter) => observer.observe(counter));
}

function animateCounter(el) {
  const target = parseInt(el.dataset.count, 10);
  const duration = 2000;
  const startTime = performance.now();

  function easeOutQuart(t) {
    return 1 - Math.pow(1 - t, 4);
  }

  function update(currentTime) {
    const elapsed = currentTime - startTime;
    const progress = Math.min(elapsed / duration, 1);
    const easedProgress = easeOutQuart(progress);
    const current = Math.round(easedProgress * target);

    el.textContent = current.toLocaleString("es-MX");

    if (progress < 1) {
      requestAnimationFrame(update);
    }
  }

  requestAnimationFrame(update);
}

/* ====== CONTACT FORM ====== */
function initNewsletterForm() {
  const form = document.getElementById("contact-form");
  if (!form) return;

  form.addEventListener("submit", (e) => {
    e.preventDefault();

    const btn = form.querySelector("button[type='submit']");
    const originalHTML = btn.innerHTML;

    btn.innerHTML = '<i class="fa-solid fa-check"></i> <span>¡Mensaje enviado!</span>';
    btn.style.background = "#3d8b5e";
    btn.disabled = true;

    setTimeout(() => {
      btn.innerHTML = originalHTML;
      btn.style.background = "";
      btn.disabled = false;
      form.reset();
    }, 4000);
  });
}

/* ====== SMOOTH SCROLL ====== */
function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", (e) => {
      const targetId = anchor.getAttribute("href");
      if (targetId === "#") return;

      const target = document.querySelector(targetId);
      if (!target) return;

      e.preventDefault();
      const headerHeight = document.getElementById("header").offsetHeight;
      const targetPosition = target.getBoundingClientRect().top + window.scrollY - headerHeight;

      window.scrollTo({
        top: targetPosition,
        behavior: "smooth",
      });
    });
  });
}

/* ====== ACTIVE NAV HIGHLIGHT ====== */
function initActiveNavHighlight() {
  const sections = document.querySelectorAll("section[id]");
  const navLinks = document.querySelectorAll(".nav__link");

  window.addEventListener(
    "scroll",
    () => {
      const scrollY = window.scrollY + 150;

      sections.forEach((section) => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.offsetHeight;
        const sectionId = section.getAttribute("id");

        if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
          navLinks.forEach((link) => {
            link.classList.remove("active");
            if (link.getAttribute("href") === `#${sectionId}`) {
              link.classList.add("active");
            }
          });
        }
      });
    },
    { passive: true }
  );
}

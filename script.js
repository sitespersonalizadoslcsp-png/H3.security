const revealItems = document.querySelectorAll(".reveal");

const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
        revealObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.16 }
);

revealItems.forEach((item) => revealObserver.observe(item));

const counters = document.querySelectorAll("[data-counter]");

const counterObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) {
        return;
      }

      const element = entry.target;
      const target = Number(element.dataset.counter);
      const duration = 1400;
      const start = performance.now();

      const updateCounter = (now) => {
        const progress = Math.min((now - start) / duration, 1);
        const value = Math.round(progress * target);
        element.textContent = value;

        if (progress < 1) {
          requestAnimationFrame(updateCounter);
        }
      };

      requestAnimationFrame(updateCounter);
      counterObserver.unobserve(element);
    });
  },
  { threshold: 0.65 }
);

counters.forEach((counter) => counterObserver.observe(counter));

const metricCards = document.querySelectorAll(".summary-metric-card");

if (metricCards.length > 0) {
  const closeMetricCards = (exceptCard) => {
    metricCards.forEach((card) => {
      if (card !== exceptCard) {
        card.classList.remove("is-open");
      }
    });
  };

  metricCards.forEach((card) => {
    const button = card.querySelector(".summary-help");

    if (!button) {
      return;
    }

    button.addEventListener("click", (event) => {
      event.stopPropagation();
      const willOpen = !card.classList.contains("is-open");
      closeMetricCards(card);
      card.classList.toggle("is-open", willOpen);
    });
  });

  document.addEventListener("click", (event) => {
    if (!event.target.closest(".summary-metric-card")) {
      closeMetricCards();
    }
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
      closeMetricCards();
    }
  });
}

// Menu Mobile Profissional - Carousel Horizontal
const mobileMenuToggle = document.querySelector(".mobile-menu-toggle");
const nav = document.querySelector(".nav");

if (mobileMenuToggle && nav) {
  mobileMenuToggle.addEventListener("click", (e) => {
    e.preventDefault();
    nav.classList.toggle("active");
    
    // Scroll suave para mostrar os itens
    if (nav.classList.contains("active")) {
      setTimeout(() => {
        const firstItem = nav.querySelector('.mobile-nav-items a');
        if (firstItem) {
          firstItem.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
        }
      }, 100);
    }
  });

  // Fecha o menu ao clicar fora
  document.addEventListener("click", (event) => {
    if (!event.target.closest(".nav") && !event.target.closest(".mobile-menu-toggle") && nav.classList.contains("active")) {
      nav.classList.remove("active");
    }
  });

  // Fecha o menu com ESC
  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && nav.classList.contains("active")) {
      nav.classList.remove("active");
    }
  });
}

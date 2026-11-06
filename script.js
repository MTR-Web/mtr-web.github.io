const menuToggle = document.querySelector(".menu-toggle");
const mainNav = document.querySelector("#main-nav");

if (menuToggle && mainNav) {
  const closeMenu = () => {
    mainNav.classList.remove("open");
    menuToggle.setAttribute("aria-expanded", "false");
    menuToggle.setAttribute("aria-label", "Abrir menú");
  };

  menuToggle.addEventListener("click", () => {
    const open = mainNav.classList.toggle("open");
    menuToggle.setAttribute("aria-expanded", String(open));
    menuToggle.setAttribute("aria-label", open ? "Cerrar menú" : "Abrir menú");
  });

  mainNav.querySelectorAll("a").forEach(link => link.addEventListener("click", closeMenu));
  document.addEventListener("keydown", event => {
    if (event.key === "Escape") closeMenu();
  });
  document.addEventListener("click", event => {
    if (!mainNav.contains(event.target) && !menuToggle.contains(event.target)) closeMenu();
  });
  window.addEventListener("resize", () => {
    if (window.innerWidth > 720) closeMenu();
  });
}

const filterButtons = [...document.querySelectorAll("[data-filter]")];
const projectCards = [...document.querySelectorAll(".project-card")];
const visibleCount = document.querySelector("#visible-count");
const emptyMessage = document.querySelector("#portfolio-empty");

function filterProjects(category) {
  let visible = 0;
  projectCards.forEach(card => {
    const show = category === "todos" || card.dataset.category === category;
    card.hidden = !show;
    if (show) visible++;
  });
  if (visibleCount) visibleCount.textContent = String(visible);
  if (emptyMessage) emptyMessage.hidden = visible > 0;
}

filterButtons.forEach(button => {
  button.addEventListener("click", () => {
    filterButtons.forEach(item => {
      const active = item === button;
      item.classList.toggle("is-active", active);
      item.setAttribute("aria-pressed", String(active));
    });
    filterProjects(button.dataset.filter);
  });
});

const year = document.querySelector("#year");
if (year) year.textContent = String(new Date().getFullYear());

document.querySelectorAll('a[href^="https://wa.me/"]').forEach(link => {
  link.addEventListener("click", () => {
    link.setAttribute("rel", "noopener noreferrer");
  });
});

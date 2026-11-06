/* =====================================================
   MTR STUDIO
   Navegación, proyectos, filtros y animaciones
   ===================================================== */


/* -----------------------------------------------------
   CONFIGURACIÓN
   ----------------------------------------------------- */

const CONFIG = {
  // WhatsApp de MTR Studio
  whatsapp: "5491132185989",

  // Instagram
  instagram: "https://www.instagram.com/mtrstudio.webs/",

  // GitHub
  github: "https://github.com/MTR-Web",

  // Formulario:
  // Reemplazar por la URL real de Formspree o Web3Forms.
  formEndpoint: "[COMPLETAR_URL_FORMSPREE]"
};


/* -----------------------------------------------------
   PROYECTOS
   ----------------------------------------------------- */

/*
  Proyectos identificados en los repositorios de MTR-Web.

  No se agregan URLs de sitios publicados sin confirmación.
  El campo site queda vacío hasta que se complete.

  IMPORTANTE:
  No incluir Copello ni Página Ciro.
*/

const projects = [

  {
    name: "Gimnasio",
    category: "Deporte",
    description:
      "Diseño web para un gimnasio, orientado a presentar sus servicios y facilitar el contacto con potenciales clientes.",
    repo: "https://github.com/MTR-Web/EJEMPLO-Pagina-gimansio.",
    site: "",
    image: "img/proyectos/gimnasio.jpg",
    technologies: ["HTML", "CSS", "JavaScript"]
  },

  {
    name: "Restaurante",
    category: "Gastronomía",
    description:
      "Propuesta digital para un restaurante, con una presentación visual pensada para comunicar su identidad.",
    repo: "https://github.com/MTR-Web/EJEMPLO-P-gina-de-restaurante.",
    site: "",
    image: "img/proyectos/restaurante.jpg",
    technologies: ["HTML", "CSS", "JavaScript"]
  },

  {
    name: "Series",
    category: "Entretenimiento",
    description:
      "Experiencia web de descubrimiento de series, con una interfaz enfocada en explorar contenido.",
    repo: "https://github.com/MTR-Web/EJEMPLO-Pagina-descubrimiento-de-series.",
    site: "",
    image: "img/proyectos/series.jpg",
    technologies: ["HTML", "CSS", "JavaScript"]
  },

  {
    name: "Pulseboard",
    category: "Dashboard",
    description:
      "Proyecto de interfaz digital orientado a organizar información y presentar datos de forma visual.",
    repo: "https://github.com/MTR-Web/EJEMPLO-Pulseboard",
    site: "",
    image: "img/proyectos/pulseboard.jpg",
    technologies: ["HTML", "CSS", "JavaScript"]
  },

  {
    name: "MTR Studio",
    category: "Diseño web",
    description:
      "Sitio principal del estudio. Una identidad digital enfocada en diseño web, creatividad y desarrollo.",
    repo: "https://github.com/MTR-Web/mtr-web.github.io",
    site: "https://mtr-web.github.io/",
    image: "img/proyectos/mtr-studio.jpg",
    technologies: ["HTML", "CSS", "JavaScript", "GitHub Pages"]
  },

  {
    name: "Barbería",
    category: "Servicios",
    description:
      "Diseño web para una barbería, con una presentación clara de su identidad y sus servicios.",
    repo: "https://github.com/MTR-Web/EJEMPLO-Pagina-barber-a",
    site: "",
    image: "img/proyectos/barberia.jpg",
    technologies: ["HTML", "CSS", "JavaScript"]
  },

  {
    name: "Arcade Bistro",
    category: "Gastronomía",
    description:
      "Concepto digital que combina una identidad gastronómica con una estética inspirada en el entretenimiento.",
    repo: "https://github.com/MTR-Web/arcade-bistro",
    site: "",
    image: "img/proyectos/arcade-bistro.jpg",
    technologies: ["HTML", "CSS", "JavaScript"]
  },

  {
    name: "Garage X",
    category: "Automotor",
    description:
      "Proyecto de presencia digital para el rubro automotor, con una propuesta visual orientada al sector.",
    repo: "https://github.com/MTR-Web/Garage-X",
    site: "",
    image: "img/proyectos/garage-x.jpg",
    technologies: ["HTML", "CSS", "JavaScript"]
  },

  {
    name: "Fuego Test",
    category: "Proyecto experimental",
    description:
      "Experiencia digital experimental desarrollada para explorar diseño e interacción web.",
    repo: "https://github.com/MTR-Web/Fuego-Test",
    site: "",
    image: "img/proyectos/fuego-test.jpg",
    technologies: ["HTML", "CSS", "JavaScript"]
  },

  {
    name: "Club",
    category: "Comunidad",
    description:
      "Propuesta web para un club, pensada para comunicar su identidad y presentar información.",
    repo: "https://github.com/MTR-Web/Pagina-Club",
    site: "",
    image: "img/proyectos/club.jpg",
    technologies: ["HTML", "CSS", "JavaScript"]
  },

  {
    name: "Diseños",
    category: "Diseño web",
    description:
      "Proyecto de exploración visual y diseño de interfaces para experiencias digitales.",
    repo: "https://github.com/MTR-Web/EJEMPLO-Pagina-Dise-os",
    site: "",
    image: "img/proyectos/disenos.jpg",
    technologies: ["HTML", "CSS", "JavaScript"]
  },

  {
    name: "Ejemplo Web",
    category: "Diseño web",
    description:
      "Proyecto de desarrollo web utilizado para explorar una propuesta de diseño y presentación digital.",
    repo: "https://github.com/MTR-Web/Ejemplo-Pagina-Nueva",
    site: "",
    image: "img/proyectos/ejemplo-web.jpg",
    technologies: ["HTML", "CSS", "JavaScript"]
  }

];


/* -----------------------------------------------------
   UTILIDADES
   ----------------------------------------------------- */

const $ = (selector, parent = document) =>
  parent.querySelector(selector);

const $$ = (selector, parent = document) =>
  [...parent.querySelectorAll(selector)];


/* -----------------------------------------------------
   AÑO DEL FOOTER
   ----------------------------------------------------- */

const yearElement = $("#year");

if (yearElement) {
  yearElement.textContent = new Date().getFullYear();
}


/* -----------------------------------------------------
   MENÚ MOBILE
   ----------------------------------------------------- */

const menuButton = $(".menu-toggle");
const navigation = $(".navigation");

function closeMenu() {
  if (!menuButton || !navigation) return;

  menuButton.setAttribute("aria-expanded", "false");
  navigation.classList.remove("open");
}

if (menuButton && navigation) {

  menuButton.addEventListener("click", () => {

    const isOpen =
      menuButton.getAttribute("aria-expanded") === "true";

    menuButton.setAttribute(
      "aria-expanded",
      String(!isOpen)
    );

    navigation.classList.toggle("open", !isOpen);

  });

  $$(".navigation a").forEach(link => {

    link.addEventListener("click", closeMenu);

  });

  document.addEventListener("keydown", event => {

    if (event.key === "Escape") {
      closeMenu();
    }

  });

  window.addEventListener("resize", () => {

    if (window.innerWidth > 700) {
      closeMenu();
    }

  });

}


/* -----------------------------------------------------
   SCROLL SUAVE
   ----------------------------------------------------- */

$$('a[href^="#"]').forEach(link => {

  link.addEventListener("click", event => {

    const href = link.getAttribute("href");

    if (!href || href === "#") return;

    const target = document.querySelector(href);

    if (!target) return;

    event.preventDefault();

    target.scrollIntoView({
      behavior: window.matchMedia(
        "(prefers-reduced-motion: reduce)"
      ).matches ? "auto" : "smooth"
    });

  });

});


/* -----------------------------------------------------
   PROYECTOS
   ----------------------------------------------------- */

const projectGrid = $("#project-grid");
const projectFilters = $("#project-filters");


/*
  Categorías únicas.
  El filtro aparece automáticamente cuando hay 5 o más proyectos.
*/

const categories = [
  ...new Set(projects.map(project => project.category))
];


function createProjectCard(project, index) {

  const article = document.createElement("article");

  article.className = "project-card reveal";

  article.dataset.category = project.category;

  /*
    Imagen:
    Si el archivo no existe, se muestra el fallback
    con la inicial del proyecto.
  */

  const imageWrapper = document.createElement("div");

  imageWrapper.className = "project-image";

  const fallback = document.createElement("div");

  fallback.className = "project-fallback";

  fallback.textContent = project.name.charAt(0).toUpperCase();

  fallback.setAttribute("aria-hidden", "true");

  imageWrapper.appendChild(fallback);


  const image = document.createElement("img");

  image.src = project.image;

  image.alt = `Vista previa del proyecto ${project.name}`;

  image.loading = "lazy";

  image.decoding = "async";

  image.addEventListener("load", () => {

    fallback.style.display = "none";

  });

  image.addEventListener("error", () => {

    image.remove();

    fallback.style.display = "grid";

  });

  imageWrapper.appendChild(image);


  const category = document.createElement("span");

  category.className = "project-category";

  category.textContent = project.category;

  imageWrapper.appendChild(category);


  const details = document.createElement("div");

  details.className = "project-details";


  const titleRow = document.createElement("div");

  titleRow.className = "project-title-row";


  const title = document.createElement("h3");

  title.textContent = project.name;


  const number = document.createElement("span");

  number.textContent = String(index + 1).padStart(2, "0");


  titleRow.append(title, number);


  const description = document.createElement("p");

  description.textContent = project.description;


  const technologies = document.createElement("div");

  technologies.className = "project-tech";


  project.technologies.forEach(technology => {

    const tag = document.createElement("span");

    tag.textContent = technology;

    technologies.appendChild(tag);

  });


  const actions = document.createElement("div");

  actions.className = "project-actions";


  /*
    Ver sitio:
    Solo aparece cuando se completó una URL real.
  */

  if (project.site && project.site.trim() !== "") {

    const siteLink = document.createElement("a");

    siteLink.href = project.site;

    siteLink.target = "_blank";

    siteLink.rel = "noopener noreferrer";

    siteLink.className = "primary-link";

    siteLink.innerHTML = 'Ver sitio <span aria-hidden="true">↗</span>';

    actions.appendChild(siteLink);

  }


  /*
    Código:
    Todos los proyectos tienen un repositorio.
  */

  if (project.repo && project.repo.trim() !== "") {

    const repoLink = document.createElement("a");

    repoLink.href = project.repo;

    repoLink.target = "_blank";

    repoLink.rel = "noopener noreferrer";

    repoLink.innerHTML = 'Ver código <span aria-hidden="true">↗</span>';

    actions.appendChild(repoLink);

  }


  details.append(
    titleRow,
    description,
    technologies,
    actions
  );

  article.append(
    imageWrapper,
    details
  );

  return article;

}


/* -----------------------------------------------------
   FILTROS
   ----------------------------------------------------- */

function createFilterButton(category, label) {

  const button = document.createElement("button");

  button.type = "button";

  button.className = "filter-button";

  button.dataset.filter = category;

  button.textContent = label;

  return button;

}


function renderFilters() {

  if (!projectFilters) return;

  projectFilters.replaceChildren();

  /*
    Para 5 proyectos o más:
    mostrar filtros de categorías.
  */

  if (projects.length >= 5) {

    projectFilters.appendChild(
      createFilterButton("all", "Todos")
    );

    categories.forEach(category => {

      projectFilters.appendChild(
        createFilterButton(category, category)
      );

    });

  }

}


function renderProjects(filter = "all") {

  if (!projectGrid) return;

  projectGrid.replaceChildren();

  const filteredProjects = projects.filter(project => {

    return filter === "all" ||
      project.category === filter;

  });


  filteredProjects.forEach((project, index) => {

    const card = createProjectCard(project, index);

    projectGrid.appendChild(card);

  });


  /*
    Re-observar tarjetas nuevas para la animación.
  */

  observeRevealElements();

}


if (projectFilters) {

  projectFilters.addEventListener("click", event => {

    const button = event.target.closest("[data-filter]");

    if (!button) return;

    const filter = button.dataset.filter;

    $$(".filter-button", projectFilters).forEach(item => {

      item.classList.toggle(
        "active",
        item === button
      );

    });

    renderProjects(filter);

  });

}


/* Inicializar portfolio */

renderFilters();

renderProjects();


/* -----------------------------------------------------
   ANIMACIÓN AL HACER SCROLL
   ----------------------------------------------------- */

const revealObserver = (
  "IntersectionObserver" in window
) ? new IntersectionObserver(entries => {

  entries.forEach(entry => {

    if (entry.isIntersecting) {

      entry.target.classList.add("visible");

      revealObserver.unobserve(entry.target);

    }

  });

}, {
  threshold: 0.12
}) : null;


function observeRevealElements() {

  const elements = $$(".reveal");

  elements.forEach(element => {

    if (element.classList.contains("visible")) {
      return;
    }

    if (revealObserver) {

      revealObserver.observe(element);

    } else {

      element.classList.add("visible");

    }

  });

}


/* Observar contenido inicial */

observeRevealElements();


/* -----------------------------------------------------
   FORMULARIO
   ----------------------------------------------------- */

const contactForm = $("#contact-form");


if (contactForm) {

  /*
    Endpoint:
    Reemplazar [COMPLETAR_URL_FORMSPREE]
    por la URL real del formulario.

    Ejemplo de formato:
    https://formspree.io/f/XXXXXXXX

    Este ejemplo usa envío HTML tradicional.
  */

  if (
    CONFIG.formEndpoint &&
    !CONFIG.formEndpoint.includes("[COMPLETAR")
  ) {

    contactForm.action = CONFIG.formEndpoint;

  }


  contactForm.addEventListener("submit", event => {

    /*
      No interceptamos el envío.
      El navegador envía el formulario al endpoint
      configurado en el atributo action.
    */

    const submitButton = contactForm.querySelector(
      'button[type="submit"]'
    );

    if (submitButton) {

      submitButton.disabled = true;

      submitButton.textContent = "Enviando...";

    }

  });

}


/* -----------------------------------------------------
   WHATSAPP
   ----------------------------------------------------- */

const whatsappLinks = $$(".contact-whatsapp");

whatsappLinks.forEach(link => {

  const message =
    "Hola MTR Studio, quiero consultar por una página web.";

  link.href =
    `https://wa.me/${CONFIG.whatsapp}?text=${encodeURIComponent(message)}`;

});


/* -----------------------------------------------------
   INSTAGRAM
   ----------------------------------------------------- */

const instagramLinks = $$(
  '.contact-socials a[href*="instagram"]'
);

instagramLinks.forEach(link => {

  link.href = CONFIG.instagram;

});


/* -----------------------------------------------------
   GITHUB
   ----------------------------------------------------- */

const githubLinks = $$(
  '.contact-socials a[href*="github"]'
);

githubLinks.forEach(link => {

  link.href = CONFIG.github;

});


/* -----------------------------------------------------
   CONSOLA
   ----------------------------------------------------- */

console.info(
  "MTR Studio | Sitio inicializado correctamente."
);


/* -----------------------------------------------------
   TEMA CLARO / OSCURO
   ----------------------------------------------------- */

const themeToggle = $(".theme-toggle");
const themeMeta = $("#theme-color-meta");
const root = document.documentElement;

function setTheme(theme) {
  root.dataset.theme = theme;
  const dark = theme === "dark";

  if (themeToggle) {
    themeToggle.setAttribute("aria-pressed", String(dark));
    themeToggle.setAttribute(
      "aria-label",
      dark ? "Cambiar a tema claro" : "Cambiar a tema oscuro"
    );
    themeToggle.textContent = dark ? "☼" : "◐";
  }

  if (themeMeta) {
    themeMeta.setAttribute("content", dark ? "#171816" : "#f5f3ee");
  }
}

if (themeToggle) {
  const savedTheme = (() => {
    try { return localStorage.getItem("mtr-theme"); }
    catch (_) { return null; }
  })();

  const systemDark = window.matchMedia &&
    window.matchMedia("(prefers-color-scheme: dark)").matches;

  setTheme(savedTheme || (systemDark ? "dark" : "light"));

  themeToggle.addEventListener("click", () => {
    const next = root.dataset.theme === "dark" ? "light" : "dark";
    setTheme(next);

    try { localStorage.setItem("mtr-theme", next); }
    catch (_) { /* La página sigue funcionando sin storage. */ }
  });
}

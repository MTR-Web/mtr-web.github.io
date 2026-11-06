// Menú para celulares
    const menuToggle = document.getElementById("menu-toggle");
    const mainNav = document.getElementById("main-nav");

    if (menuToggle && mainNav) {
      const closeMenu = () => {
        mainNav.classList.remove("open");
        menuToggle.setAttribute("aria-expanded", "false");
        menuToggle.setAttribute("aria-label", "Abrir menú");
        menuToggle.textContent = "☰";
      };

      menuToggle.addEventListener("click", (event) => {
        event.stopPropagation();
        const isOpen = mainNav.classList.toggle("open");
        menuToggle.setAttribute("aria-expanded", String(isOpen));
        menuToggle.setAttribute("aria-label", isOpen ? "Cerrar menú" : "Abrir menú");
        menuToggle.textContent = isOpen ? "×" : "☰";
      });

      mainNav.querySelectorAll("a").forEach((link) => {
        link.addEventListener("click", closeMenu);
      });

      document.addEventListener("click", (event) => {
        if (!mainNav.contains(event.target) && !menuToggle.contains(event.target)) {
          closeMenu();
        }
      });

      document.addEventListener("keydown", (event) => {
        if (event.key === "Escape") closeMenu();
      });

      window.addEventListener("resize", () => {
        if (window.innerWidth > 650) closeMenu();
      });
    }

    // Tema claro / oscuro

    const themeToggle = document.getElementById("theme-toggle");

    themeToggle.addEventListener("click", () => {

      document.body.classList.toggle("light");

      const lightMode = document.body.classList.contains("light");

      themeToggle.setAttribute("aria-label", lightMode ? "Activar tema oscuro" : "Activar tema claro");

    });

    // Año del footer

    document.getElementById("year").textContent = new Date().getFullYear();

    // Formulario: copia el mensaje y muestra el correo de contacto.

    // Reemplazá este correo por el correo real de MTR Studio.

    const CONTACT_EMAIL = "mtrstudio.webs@gmail.com";

    const contactEmailLink = document.getElementById("contact-email-link");

    const formStatus = document.getElementById("form-status");

    contactEmailLink.textContent = CONTACT_EMAIL;

    contactEmailLink.href = "mailto:" + CONTACT_EMAIL;

    document.getElementById("contact-form").addEventListener("submit", async event => {

      event.preventDefault();

      const form = event.currentTarget;

      const data = new FormData(form);

      const message =

        "Consulta desde MTR Studio\n\n" +

        "Nombre: " + data.get("name") + "\n" +

        "Correo: " + data.get("email") + "\n" +

        "Consulta: " + data.get("subject") + "\n\n" +

        "Mensaje:\n" + data.get("message");

      try {

        await navigator.clipboard.writeText(message);

        formStatus.innerHTML =

          "Tu mensaje ha sido guardado. Copiamos el texto para que puedas enviarlo a: " +

          '<a href="mailto:' + CONTACT_EMAIL + '">' + CONTACT_EMAIL + "</a>";

        formStatus.classList.add("visible");

      } catch (error) {

        formStatus.textContent =

          "No pudimos copiar automáticamente el mensaje. Seleccioná y copiá los datos del formulario y escribinos a " + CONTACT_EMAIL + ".";

        formStatus.classList.add("visible");

      }

    });

    // WhatsApp: reemplazá el número de ejemplo por el tuyo,

    // incluyendo el código de país y de área, sin + ni espacios.

    const WHATSAPP_NUMBER = "5491132185989";

    const whatsappLink = document.getElementById("whatsapp-link");

    if (WHATSAPP_NUMBER) {

      whatsappLink.href = "https://wa.me/" + WHATSAPP_NUMBER + "?text=" + encodeURIComponent("Hola, vi la web de MTR Studio y quiero consultar por un proyecto.");

      whatsappLink.target = "_blank";

      whatsappLink.rel = "noopener noreferrer";

    } else {

      whatsappLink.href = "#contacto";

    }

    // Abre el correo con la consulta ya escrita, además de copiarla.
    document.getElementById("contact-form").addEventListener("submit", event => {
      const d = new FormData(event.currentTarget);
      const body = "Hola, soy " + d.get("name") + " (" + d.get("email") + ").\n\nMe interesa: " + d.get("subject") + "\n\n" + d.get("message");
      window.location.href = "mailto:" + CONTACT_EMAIL + "?subject=" + encodeURIComponent("Consulta desde MTR Studio: " + d.get("subject")) + "&body=" + encodeURIComponent(body);
    });

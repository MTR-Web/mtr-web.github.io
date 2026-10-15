/*
  MTR Studio — configuración inicial
  Reemplazá estos valores antes de publicar.
  WhatsApp: código de país + número, solo dígitos. Argentina: 549 + área + número.
  Email: dirección donde querés recibir consultas.
*/
const MTR_CONFIG = {
  whatsapp: "", // Ejemplo de formato: "5491123456789"
  email: ""     // Ejemplo: "hola@tudominio.com"
};

document.getElementById("year").textContent = new Date().getFullYear();

// Modo claro/oscuro. Guarda la preferencia en este navegador.
const themeToggle = document.querySelector(".theme-toggle");
const themeIcon = document.querySelector(".theme-icon");
const themeLabel = document.querySelector(".theme-label");

function applyTheme(theme) {
  const dark = theme === "dark";
  document.body.classList.toggle("dark-mode", dark);
  themeIcon.textContent = dark ? "☀" : "☾";
  themeLabel.textContent = dark ? "Modo claro" : "Modo oscuro";
  themeToggle.setAttribute("aria-label", dark ? "Activar modo claro" : "Activar modo oscuro");
  try { localStorage.setItem("mtr-studio-theme", theme); } catch (error) {}
}

let savedTheme = "light";
try { savedTheme = localStorage.getItem("mtr-studio-theme") || "light"; } catch (error) {}
applyTheme(savedTheme);
themeToggle.addEventListener("click", () => {
  applyTheme(document.body.classList.contains("dark-mode") ? "light" : "dark");
});


const menuToggle = document.querySelector(".menu-toggle");
const nav = document.querySelector(".nav");
menuToggle.addEventListener("click", () => {
  const isOpen = nav.classList.toggle("open");
  menuToggle.setAttribute("aria-expanded", String(isOpen));
  menuToggle.setAttribute("aria-label", isOpen ? "Cerrar menú" : "Abrir menú");
  menuToggle.textContent = isOpen ? "×" : "☰";
});
nav.querySelectorAll("a").forEach(link => link.addEventListener("click", () => {
  nav.classList.remove("open");
  menuToggle.setAttribute("aria-expanded", "false");
  menuToggle.textContent = "☰";
}));

const whatsappLink = document.getElementById("whatsapp-link");
function updateWhatsAppLink() {
  const configured = MTR_CONFIG.whatsapp.trim();
  if (configured) {
    whatsappLink.href = `https://wa.me/${configured}?text=${encodeURIComponent("Hola, vi la web de MTR Studio y quiero consultar por un proyecto.")}`;
    whatsappLink.removeAttribute("aria-disabled");
  } else {
    whatsappLink.href = "#contacto";
    whatsappLink.addEventListener("click", event => {
      event.preventDefault();
      document.getElementById("form-status").textContent = "Para activar WhatsApp, agregá tu número en MTR_CONFIG dentro de script.js.";
    });
  }
}
updateWhatsAppLink();

document.getElementById("contact-form").addEventListener("submit", async event => {
  event.preventDefault();
  const form = event.currentTarget;
  const data = new FormData(form);
  const name = String(data.get("name") || "").trim();
  const email = String(data.get("email") || "").trim();
  const service = String(data.get("service") || "").trim();
  const message = String(data.get("message") || "").trim();
  const status = document.getElementById("form-status");

  if (!MTR_CONFIG.email.trim()) {
    status.textContent = "El formulario todavía no está configurado. Agregá el correo de MTR Studio en MTR_CONFIG dentro de script.js.";
    return;
  }

  const fullMessage = `Consulta para MTR Studio\n\nNombre: ${name}\nCorreo: ${email}\nServicio: ${service}\n\nMensaje:\n${message}`;
  try {
    await navigator.clipboard.writeText(fullMessage);
    status.textContent = `Tu mensaje fue copiado. Para enviarlo, escribí a ${MTR_CONFIG.email.trim()} y pegalo en el correo. No se envió ni se guardó en un servidor.`;
  } catch (error) {
    status.textContent = `No se pudo copiar automáticamente. Copiá estos datos y envialos a ${MTR_CONFIG.email.trim()}: ${fullMessage}`;
  }
});

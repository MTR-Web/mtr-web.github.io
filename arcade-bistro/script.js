(() => {
  "use strict";
  // Demo settings: replace with the real venue WhatsApp number (country code, digits only).
  const WHATSAPP_NUMBER = "5491100000000";
  const CURRENCY = new Intl.NumberFormat("es-AR", { style: "currency", currency: "ARS", maximumFractionDigits: 0 });
  const products = [
    {id:"combo-breaker",name:"Burger Combo Breaker",category:"Hamburguesas",tag:"BEST SELLER",price:14500,description:"Doble smash, cheddar, cebolla crispy, salsa de la casa y papas.",image:"https://images.unsplash.com/photo-1571091718767-18b5b1457add?auto=format&fit=crop&w=800&q=80"},
    {id:"pixel-smash",name:"Pixel Smash",category:"Hamburguesas",tag:"PLAYER 01",price:11200,description:"Medallón smash, queso americano, pepinillos y relish gamer.",image:"https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=800&q=80"},
    {id:"boss-final",name:"El Boss Final",category:"Hamburguesas",tag:"BOSS LEVEL",price:16900,description:"Triple carne, triple cheddar, panceta y BBQ ahumada.",image:"https://images.unsplash.com/photo-1553979459-d2229ba7433a?auto=format&fit=crop&w=800&q=80"},
    {id:"mana",name:"Poción de Maná",category:"Bebidas / Tragos",tag:"+50 MANA",price:6500,description:"Gin, frutos rojos, lima y burbujas violetas. Versión sin alcohol disponible.",image:"https://images.unsplash.com/photo-1513558161293-cfaf765edfd7?auto=format&fit=crop&w=800&q=80"},
    {id:"critical-hit",name:"Critical Hit",category:"Bebidas / Tragos",tag:"CRITICAL!",price:7200,description:"Vodka, maracuyá, cítricos y un golpe de jengibre.",image:"https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?auto=format&fit=crop&w=800&q=80"},
    {id:"health-potion",name:"Health Potion 0.0",category:"Bebidas / Tragos",tag:"0.0% ALCOHOL",price:4900,description:"Frutilla, limón, menta y soda. Recargá vida sin alcohol.",image:"https://images.unsplash.com/photo-1513558161293-cfaf765edfd7?auto=format&fit=crop&w=800&q=80"},
    {id:"green-pixel",name:"Green Pixel Burger",category:"Veganas",tag:"PLANT POWER",price:10800,description:"Medallón vegetal, palta, rúcula, tomate y mayo vegana.",image:"https://images.unsplash.com/photo-1520072959219-c595dc870360?auto=format&fit=crop&w=800&q=80"},
    {id:"veggie-nachos",name:"Veggie Respawn",category:"Veganas",tag:"VEGGIE",price:7900,description:"Nachos, guacamole, pico de gallo y salsa picante vegetal.",image:"https://images.unsplash.com/photo-1513456852971-30c0b8199d4d?auto=format&fit=crop&w=800&q=80"},
    {id:"xp-brownie",name:"Brownie XP",category:"Postres",tag:"+100 XP",price:5200,description:"Brownie tibio de chocolate con helado de crema.",image:"https://images.unsplash.com/photo-1606313564200-e75d5e30476c?auto=format&fit=crop&w=800&q=80"},
    {id:"checkpoint",name:"Checkpoint Cheesecake",category:"Postres",tag:"SAVE POINT",price:4900,description:"Cheesecake cremoso con frutos rojos y base crocante.",image:"https://images.unsplash.com/photo-1533134242443-d4fd215305ad?auto=format&fit=crop&w=800&q=80"},
    {id:"token-pack",name:"Pack de Fichas",category:"Juegos / Fichas",tag:"ARCADE MODE",price:4000,description:"Pack de fichas para seguir jugando. Precio demo por pack.",image:"https://images.unsplash.com/photo-1511512578047-dfb367046420?auto=format&fit=crop&w=800&q=80"},
    {id:"tabletop",name:"Mesa de Tabletop",category:"Juegos / Fichas",tag:"PARTY MODE",price:2500,description:"Acceso a juegos de mesa por persona. Consultá disponibilidad.",image:"https://images.unsplash.com/photo-1606503153255-59d8b8b8211c?auto=format&fit=crop&w=800&q=80"}
  ];
  const categories = ["Todo", "Hamburguesas", "Bebidas / Tragos", "Veganas", "Postres", "Juegos / Fichas"];
  const state = { category: "Todo", query: "", cart: {} };
  const $ = (selector) => document.querySelector(selector);
  const $$ = (selector) => [...document.querySelectorAll(selector)];
  const formatMoney = (amount) => CURRENCY.format(amount).replace(/\u00a0/g, " ");
  const menuGrid = $("#menu-grid");
  const filters = $("#menu-filters");
  const cartDrawer = $("#cart-drawer");
  const cartOverlay = $("#cart-overlay");
  const cartItems = $("#cart-items");
  const toast = $("#toast");
  let toastTimer;

  function safeText(value) {
    return String(value).replace(/[&<>"']/g, (char) => ({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[char]));
  }
  function renderFilters() {
    filters.innerHTML = categories.map((category) => '<button class="filter-btn'+(state.category===category?' active':'')+'" type="button" data-category="'+safeText(category)+'" aria-pressed="'+(state.category===category)+'">'+safeText(category.toUpperCase())+'</button>').join("");
  }
  function renderMenu() {
    const query = state.query.trim().toLocaleLowerCase("es-AR");
    const visible = products.filter((p) => (state.category==="Todo" || p.category===state.category) && (!query || (p.name+" "+p.description+" "+p.category).toLocaleLowerCase("es-AR").includes(query)));
    if (!visible.length) { menuGrid.innerHTML = '<div class="no-results">NO SE ENCONTRARON ITEMS.<br>Probá con otra búsqueda o categoría.</div>'; return; }
    menuGrid.innerHTML = visible.map((p) => '<article class="menu-card"><div class="card-image"><img src="'+p.image+'" alt="'+safeText(p.name)+'" loading="lazy"><span class="card-tag">'+safeText(p.tag)+'</span></div><div class="card-content"><div class="card-meta"><span>'+safeText(p.category.toUpperCase())+'</span><span>ITEM // '+String(products.indexOf(p)+1).padStart(2,"0")+'</span></div><h3>'+safeText(p.name)+'</h3><p>'+safeText(p.description)+'</p><div class="card-bottom"><strong class="price">'+formatMoney(p.price)+'</strong><button class="add-btn" type="button" data-add="'+p.id+'" aria-label="Agregar '+safeText(p.name)+' al pedido">AGREGAR <span>＋</span></button></div></div></article>').join("");
  }
  function cartCount() { return Object.values(state.cart).reduce((sum, qty) => sum+qty, 0); }
  function cartTotal() { return products.reduce((sum, p) => sum+p.price*(state.cart[p.id]||0), 0); }
  function renderCart() {
    const entries = products.filter((p) => state.cart[p.id]);
    $("#cart-count").textContent = cartCount();
    $("#cart-fab-total").textContent = formatMoney(cartTotal());
    $("#cart-total").textContent = formatMoney(cartTotal());
    if (!entries.length) { cartItems.innerHTML = '<div class="empty-cart">Tu inventario está vacío.<br><span>Agregá algo rico para empezar.</span></div>'; return; }
    cartItems.innerHTML = entries.map((p) => '<div class="cart-row"><div><h3>'+safeText(p.name)+'</h3><small>'+formatMoney(p.price*(state.cart[p.id]||0))+'</small></div><div class="quantity-controls"><button type="button" data-qty="'+p.id+'" data-delta="-1" aria-label="Quitar uno de '+safeText(p.name)+'">−</button><span>'+(state.cart[p.id]||0)+'</span><button type="button" data-qty="'+p.id+'" data-delta="1" aria-label="Agregar uno de '+safeText(p.name)+'">+</button></div></div>').join("");
  }
  function showToast(message) {
    toast.textContent = message; toast.classList.add("show");
    clearTimeout(toastTimer); toastTimer = setTimeout(() => toast.classList.remove("show"), 2400);
  }
  function addItem(id) {
    const product = products.find((p) => p.id===id); if (!product) return;
    state.cart[id] = (state.cart[id]||0)+1; renderCart(); showToast(product.name+" agregado al pedido");
  }
  function openCart() {
    cartDrawer.classList.add("open"); cartDrawer.setAttribute("aria-hidden","false"); cartOverlay.classList.add("open"); document.body.classList.add("no-scroll"); $("#close-cart").focus();
  }
  function closeCart() {
    cartDrawer.classList.remove("open"); cartDrawer.setAttribute("aria-hidden","true"); cartOverlay.classList.remove("open"); document.body.classList.remove("no-scroll");
  }
  function whatsappUrl(message) { return "https://wa.me/"+WHATSAPP_NUMBER+"?text="+encodeURIComponent(message); }
  function sendOrder() {
    const entries = products.filter((p) => state.cart[p.id]);
    if (!entries.length) { showToast("Tu pedido está vacío. Agregá algún item primero."); return; }
    const lines = entries.map((p) => (state.cart[p.id])+"x "+p.name+" — "+formatMoney(p.price*(state.cart[p.id])));
    const message = "¡Hola! Quisiera consultar por este pedido en Arcade & Bistro:\n\n"+lines.join("\n")+"\n\nTotal estimado: "+formatMoney(cartTotal())+"\n\n¿Me confirman disponibilidad y total final?";
    window.open(whatsappUrl(message), "_blank", "noopener,noreferrer");
  }
  function openReservation() {
    $("#reservation-modal").classList.add("open"); $("#reservation-modal").setAttribute("aria-hidden","false"); document.body.classList.add("no-scroll"); $("#reservation-modal input[name=name]").focus();
  }
  function closeReservation() {
    $("#reservation-modal").classList.remove("open"); $("#reservation-modal").setAttribute("aria-hidden","true"); document.body.classList.remove("no-scroll");
  }
  function updateOpenStatus() {
    // Argentina time; sample hours Tue-Sun 18:00–02:00, Monday closed.
    const now = new Date(new Date().toLocaleString("en-US", {timeZone:"America/Argentina/Buenos_Aires"}));
    const day = now.getDay(), minutes = now.getHours()*60+now.getMinutes();
    const open = day!==1 && (minutes>=1080 || (minutes<120 && day!==2));
    const status = $("#open-status");
    status.textContent = open ? "ABIERTO AHORA · 18:00 A 02:00 HS" : "CERRADO · ABRIMOS 18:00 HS";
    $(".topbar").classList.toggle("closed", !open);
  }
  filters.addEventListener("click", (event) => {
    const button = event.target.closest("[data-category]"); if (!button) return;
    state.category = button.dataset.category; renderFilters(); renderMenu();
  });
  menuGrid.addEventListener("click", (event) => { const button = event.target.closest("[data-add]"); if (button) addItem(button.dataset.add); });
  $("#menu-search").addEventListener("input", (event) => { state.query=event.target.value; renderMenu(); });
  $("#cart-fab").addEventListener("click", openCart);
  $("#close-cart").addEventListener("click", closeCart);
  cartOverlay.addEventListener("click", closeCart);
  cartItems.addEventListener("click", (event) => {
    const button = event.target.closest("[data-qty]"); if (!button) return;
    const id = button.dataset.qty, next = (state.cart[id]||0)+Number(button.dataset.delta);
    if (next<=0) delete state.cart[id]; else state.cart[id]=next;
    renderCart();
  });
  $("#clear-cart").addEventListener("click", () => { state.cart={}; renderCart(); showToast("Pedido vaciado"); });
  $("#send-order").addEventListener("click", sendOrder);
  $$("[data-open-reservation]").forEach((button) => button.addEventListener("click", openReservation));
  $("#close-reservation").addEventListener("click", closeReservation);
  $("#reservation-modal").addEventListener("click", (event) => { if (event.target.id==="reservation-modal") closeReservation(); });
  $("#reservation-form").addEventListener("submit", (event) => {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    const name = String(form.get("name")||"").trim();
    const people = String(form.get("people")||"");
    const date = String(form.get("date")||"");
    const time = String(form.get("time")||"");
    if (!name || !date || !time) return;
    const message = "¡Hola! Quisiera solicitar una reserva en Arcade & Bistro.\nNombre: "+name+"\nPersonas: "+people+"\nFecha: "+date+"\nHora: "+time+"\n\n¿Me confirman disponibilidad?";
    window.open(whatsappUrl(message), "_blank", "noopener,noreferrer");
    closeReservation();
  });
  document.addEventListener("keydown", (event) => {
    if (event.key==="Escape") { closeCart(); closeReservation(); }
  });
  const dateInput = $("#reservation-date");
  const localToday = new Date();
  dateInput.min = new Date(localToday.getTime()-localToday.getTimezoneOffset()*60000).toISOString().slice(0,10);
  renderFilters(); renderMenu(); renderCart(); updateOpenStatus(); setInterval(updateOpenStatus, 60000);
})();
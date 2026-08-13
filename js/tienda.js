// Número de WhatsApp de AURA STREET
const WHATSAPP_NUMBER = "5491161488971";

const products = [
  { id: 1, name: "Camiseta Barcelona Retro", cat: "Camisetas retro", img: "IMG_BARCELONA", sizes: ["S","M","L","XL"] },
  { id: 2, name: "Camiseta Selección Argentina Retro", cat: "Camisetas retro", img: "IMG_ARGENTINA", sizes: ["S","M","L","XL"] },
  { id: 3, name: "Camiseta Redentor (Brasil)", cat: "Camisetas retro", img: "IMG_REDENTOR", sizes: ["S","M","L","XL"] },
  { id: 4, name: "Jean Oversize Negro Desgastado", cat: "Jeans y bermudas", img: "IMG_NEGRO", sizes: ["S","M","L","XL"] },
  { id: 5, name: "Jean Oversize Camo Verde/Beige", cat: "Jeans y bermudas", img: "IMG_CAMO", sizes: ["S","M","L","XL"] },
  { id: 6, name: "Jean Oversize Camo Destroyed", cat: "Jeans y bermudas", img: "IMG_CAMODESTROYED", sizes: ["S","M","L","XL"] },
  { id: 7, name: "Jean Oversize Celeste/Lila Claro", cat: "Jeans y bermudas", img: "IMG_CELESTE", sizes: ["S","M","L","XL"] },
  { id: 8, name: "Jean Oversize Gris Desgastado", cat: "Jeans y bermudas", img: "IMG_GRIS", sizes: ["S","M","L","XL"] },
  { id: 9, name: "Bermuda Denim Clara", cat: "Jeans y bermudas", img: "IMG_BERMUDA", sizes: ["S","M","L","XL"] },
  { id: 10, name: "Set Floral SDA Club (remera + short)", cat: "Sets", img: "IMG_FLORAL", sizes: ["S","M","L","XL"] }
];

const IMAGES = {
  IMG_BARCELONA: "images/remera-barcelona.jpg",
  IMG_ARGENTINA: "images/remera-argentina.jpg",
  IMG_REDENTOR: "images/remera-redentor.jpg",
  IMG_NEGRO: "images/jean-negro.jpg",
  IMG_CAMO: "images/jean-camo.jpg",
  IMG_CAMODESTROYED: "images/jean-camo-destroyed.jpg",
  IMG_CELESTE: "images/jean-celeste.jpg",
  IMG_GRIS: "images/jean-gris.jpg",
  IMG_BERMUDA: "images/bermuda-denim.jpg",
  IMG_FLORAL: "images/set-floral.jpg",
};

let cart = [];

const catGridMap = {
  "Camisetas retro": "grid-camisetas",
  "Jeans y bermudas": "grid-jeans",
  "Sets": "grid-sets"
};
const catCountMap = {
  "Camisetas retro": "count-camisetas",
  "Jeans y bermudas": "count-jeans",
  "Sets": "count-sets"
};
const catCounts = {};

products.forEach(p => {
  const grid = document.getElementById(catGridMap[p.cat]);
  const card = document.createElement('div');
  card.className = 'tag-card';
  card.innerHTML = `
    <div class="tag-hole"></div>
    <div class="tag-img"><img src="${IMAGES[p.img]}" alt="${p.name}" loading="lazy"></div>
    <div class="tag-cat">${p.cat}</div>
    <div class="tag-name">${p.name}</div>
    <div class="tag-price mono">Consultar precio</div>
    <div class="tag-row">
      <select class="size-select" id="size-${p.id}">
        ${p.sizes.map(s => `<option value="${s}">Talle ${s}</option>`).join('')}
      </select>
      <button class="add-btn" onclick="addToCart(${p.id})">Sumar</button>
    </div>
  `;
  grid.appendChild(card);
  catCounts[p.cat] = (catCounts[p.cat] || 0) + 1;
});
Object.keys(catCounts).forEach(cat => {
  document.getElementById(catCountMap[cat]).textContent = catCounts[cat] + (catCounts[cat] === 1 ? ' prenda' : ' prendas');
});

function addToCart(id) {
  const product = products.find(p => p.id === id);
  const size = document.getElementById(`size-${id}`).value;
  const existing = cart.find(i => i.id === id && i.size === size);
  if (existing) {
    existing.qty += 1;
  } else {
    cart.push({ id, name: product.name, img: product.img, size, qty: 1 });
  }
  renderCart();
  openDrawer();
}

function removeFromCart(index) {
  cart.splice(index, 1);
  renderCart();
}

function renderCart() {
  const body = document.getElementById('cartBody');
  const countEl = document.getElementById('cartCount');
  const totalEl = document.getElementById('cartTotal');
  const waBtn = document.getElementById('waBtn');

  const totalQty = cart.reduce((sum, i) => sum + i.qty, 0);
  countEl.textContent = totalQty;

  if (cart.length === 0) {
    body.innerHTML = '<p class="empty-cart">Todavía no agregaste nada.</p>';
    totalEl.textContent = '—';
    waBtn.disabled = true;
    return;
  }

  body.innerHTML = cart.map((item, i) => `
    <div class="cart-item">
      <div class="cart-item-img"><img src="${IMAGES[item.img]}" alt="${item.name}" style="width:100%;height:100%;object-fit:cover;border-radius:4px;"></div>
      <div class="cart-item-info">
        <div class="name">${item.name}</div>
        <div class="meta">Talle ${item.size} · x${item.qty}</div>
      </div>
      <button class="remove-btn" onclick="removeFromCart(${i})">Quitar</button>
    </div>
  `).join('');

  totalEl.textContent = 'A coordinar';
  waBtn.disabled = false;
}

function openDrawer() {
  document.getElementById('drawer').classList.add('active');
  document.getElementById('overlay').classList.add('active');
}
function closeDrawer() {
  document.getElementById('drawer').classList.remove('active');
  document.getElementById('overlay').classList.remove('active');
}

document.getElementById('openCart').addEventListener('click', openDrawer);
document.getElementById('closeCart').addEventListener('click', closeDrawer);
document.getElementById('overlay').addEventListener('click', closeDrawer);

function openMenu() {
  document.getElementById('sideMenu').classList.add('active');
  document.getElementById('menuOverlay').classList.add('active');
}
function closeMenu() {
  document.getElementById('sideMenu').classList.remove('active');
  document.getElementById('menuOverlay').classList.remove('active');
}
document.getElementById('openMenu').addEventListener('click', openMenu);
document.getElementById('closeMenu').addEventListener('click', closeMenu);
document.getElementById('menuOverlay').addEventListener('click', closeMenu);
document.querySelectorAll('.side-menu-links a').forEach(a => a.addEventListener('click', closeMenu));

document.getElementById('waBtn').addEventListener('click', () => {
  if (cart.length === 0) return;
  let msg = "Hola! Quiero cotizar este pedido en AURA STREET:%0A%0A";
  cart.forEach(item => {
    msg += `• ${item.name} - Talle ${item.size} x${item.qty}%0A`;
  });
  msg += "%0APasame precio y disponibilidad, dale!";
  window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${msg}`, '_blank');
});
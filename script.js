// Basic homepage JS: inject categories & featured products, search, wishlist (localStorage)
const categories = [
  { id: 'clothing', title: 'Clothing', desc: 'Premium apparel & accessories', img: 'images/cat-clothing.jpg', link: 'clothing.html' },
  { id: 'electronics', title: 'Electronics', desc: 'Curated gadgets & audio', img: 'images/cat-electronics.jpg', link: 'electronics.html' },
  { id: 'beauty', title: 'Beauty', desc: 'Luxury skincare & perfume', img: 'images/cat-beauty.jpg', link: 'beauty.html' }
];

const products = [
  // Clothing
  { id: 'c1', category: 'clothing', title: 'Signature Leather Jacket', price: 12499, img: 'images/proj-jacket.jpg', desc: 'Handstitched premium leather.' },
  { id: 'c2', category: 'clothing', title: 'Cashmere Sweater', price: 6999, img: 'images/proj-sweater.jpg', desc: 'Soft cashmere for cool evenings.' },

  // Electronics
  { id: 'e1', category: 'electronics', title: 'Aurora Headphones', price: 8999, img: 'images/proj-headphones.jpg', desc: 'Studio-grade sound with noise cancel.' },
  { id: 'e2', category: 'electronics', title: 'Sleek Smartwatch', price: 7999, img: 'images/proj-watch.jpg', desc: 'Minimal design with long battery life.' },

  // Beauty
  { id: 'b1', category: 'beauty', title: 'Rose Gold Perfume', price: 3499, img: 'images/proj-perfume.jpg', desc: 'A floral, long-lasting fragrance.' },
  { id: 'b2', category: 'beauty', title: 'Revive Night Cream', price: 2499, img: 'images/proj-cream.jpg', desc: 'Night repair & glow formula.' }
];

document.addEventListener('DOMContentLoaded', () => {
  document.getElementById('year').textContent = new Date().getFullYear();
  renderCategories();
  renderProducts(products);
  setupSearch();
  setupSort();
  setupWishlistBtn();
});

/* Render category cards */
function renderCategories(){
  const grid = document.getElementById('categoryGrid');
  grid.innerHTML = '';
  categories.forEach(cat => {
    const el = document.createElement('a');
    el.className = 'category-card';
    el.href = cat.link;
    el.innerHTML = `
      <div class="cat-thumb"><img src="${cat.img}" alt="${cat.title}"></div>
      <div class="cat-info">
        <h4>${cat.title}</h4>
        <p>${cat.desc}</p>
      </div>
    `;
    grid.appendChild(el);
  });
}

/* Render product cards */
function renderProducts(list){
  const grid = document.getElementById('productsGrid');
  grid.innerHTML = '';
  list.forEach(p => {
    const card = document.createElement('div');
    card.className = 'product-card';
    card.innerHTML = `
      <div class="product-thumb"><img src="${p.img}" alt="${p.title}"></div>
      <div class="product-body">
        <div class="product-title">${p.title}</div>
        <div class="product-meta">
          <div class="price">₹${p.price.toLocaleString('en-IN')}</div>
          <div class="muted">${p.category}</div>
        </div>
        <div class="product-actions">
          <button class="small-btn" onclick="viewProduct('${p.id}')">Details</button>
          <button class="small-btn" onclick="toggleWishlist('${p.id}')">❤ Wishlist</button>
        </div>
      </div>
    `;
    grid.appendChild(card);
  });
}

/* Search */
function setupSearch(){
  const input = document.getElementById('searchInput');
  input.addEventListener('input', (e) => {
    const q = e.target.value.trim().toLowerCase();
    const filtered = products.filter(p => p.title.toLowerCase().includes(q) || p.desc.toLowerCase().includes(q));
    renderProducts(filtered);
  });
}

/* Sort */
function setupSort(){
  const sel = document.getElementById('sortSelect');
  sel.addEventListener('change', (e) => {
    const val = e.target.value;
    let list = [...products];
    if(val === 'low') list.sort((a,b)=> a.price - b.price);
    else if(val === 'high') list.sort((a,b)=> b.price - a.price);
    renderProducts(list);
  });
}

/* View product (simple redirect to product page with id in query) */
function viewProduct(id){
  window.location.href = product.html?id=${id};
}

/* Wishlist (localStorage) */
function getWishlist(){
  return JSON.parse(localStorage.getItem('ec_wishlist') || '[]');
}
function saveWishlist(list){
  localStorage.setItem('ec_wishlist', JSON.stringify(list));
}
function toggleWishlist(id){
  const list = getWishlist();
  const idx = list.indexOf(id);
  if(idx === -1) list.push(id);
  else list.splice(idx,1);
  saveWishlist(list);
  alert('Wishlist updated');
}
function setupWishlistBtn(){
  const btn = document.getElementById('wishlistBtn');
  btn.addEventListener('click', () => {
    const list = getWishlist();
    if(list.length === 0) alert('Wishlist is empty');
    else {
      const items = products.filter(p => list.includes(p.id)).map(i => ${i.title} — ₹${i.price}).join('\n');
      alert(Wishlist:\n\n${items});
    }
  });
}
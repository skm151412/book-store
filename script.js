/* ===========================
   KLH Digital Library (script.js)
   All features: data, render, cart, wallet, checkout, top-up,
   favorites, reading list, ratings, recently viewed, animations, modals.
   =========================== */

/* ---------- Data: 15+ Real CSE / GATE Books ---------- */
const books = [
  { id:1, title:"Operating System Concepts", author:"Abraham Silberschatz, Peter B. Galvin, Greg Gagne", publisher:"Wiley", year:2020, category:"Operating System", cover:"https://m.media-amazon.com/images/I/81Lb29aXa9L.jpg", description:"Comprehensive OS concepts with examples and problems.", price:950, availability:"in stock", sample:"#"},
  { id:2, title:"Database System Concepts", author:"Abraham Silberschatz, Henry F. Korth, S. Sudarshan", publisher:"McGraw Hill", year:2019, category:"DBMS", cover:"https://m.media-amazon.com/images/I/51dC4E2S+qL._UF1000,1000_QL80_.jpg", description:"Classic DBMS text covering theory and implementation.", price:850, availability:"in stock", sample:"#"},
  { id:3, title:"Computer Networks", author:"Andrew S. Tanenbaum, David J. Wetherall", publisher:"Pearson", year:2011, category:"Computer Networks", cover:"https://booksdelivery.com/image/cache/catalog/books/pearson/computer-networks-%205th-edition-550x550h.jpeg", description:"Fundamentals of networking and protocols.", price:780, availability:"in stock", sample:"#"},
  { id:4, title:"Compilers: Principles, Techniques, and Tools", author:"Aho, Lam, Sethi, Ullman", publisher:"Pearson", year:2006, category:"Compilers", cover:"https://m.media-amazon.com/images/I/71GKSIHfJ-L._UF1000,1000_QL80_.jpg", description:"Dragon Book – compiler design fundamentals.", price:990, availability:"in stock", sample:"#"},
  { id:5, title:"Introduction to Algorithms (CLRS)", author:"Cormen, Leiserson, Rivest, Stein", publisher:"MIT Press", year:2022, category:"Algorithms", cover:"https://m.media-amazon.com/images/I/61Mw06x2XcL.jpg", description:"In-depth algorithms with proofs and exercises.", price:1200, availability:"in stock", sample:"#"},
  { id:6, title:"Artificial Intelligence: A Modern Approach", author:"Stuart Russell, Peter Norvig", publisher:"Pearson", year:2021, category:"AI/ML", cover:"https://m.media-amazon.com/images/I/61-6TTTBZeL.jpg", description:"Definitive AI textbook covering modern approaches.", price:1150, availability:"in stock", sample:"#"},
  { id:7, title:"Computer Organization and Design", author:"David A. Patterson, John L. Hennessy", publisher:"Morgan Kaufmann", year:2017, category:"CSE Core", cover:"https://m.media-amazon.com/images/I/91gJ1cqKrDL._UF1000,1000_QL80_.jpg", description:"Hardware fundamentals and RISC concepts.", price:900, availability:"in stock", sample:"#"},
  { id:8, title:"Discrete Mathematics and Its Applications", author:"Kenneth H. Rosen", publisher:"McGraw Hill", year:2019, category:"CSE Core", cover:"https://m.media-amazon.com/images/I/716hbj45eOL._UF1000,1000_QL80_.jpg", description:"Discrete math for computer science courses.", price:700, availability:"in stock", sample:"#"},
  { id:9, title:"Digital Logic and Computer Design", author:"M. Morris Mano", publisher:"Pearson", year:2017, category:"CSE Core", cover:"https://m.media-amazon.com/images/I/81HQzrzi4mL.jpg", description:"Digital logic and design methodology.", price:650, availability:"in stock", sample:"#"},
  { id:10, title:"Data Structures and Algorithms in C++", author:"Adam Drozdek", publisher:"Cengage", year:2012, category:"Programming", cover:"https://m.media-amazon.com/images/I/61stE86UPFL._UF1000,1000_QL80_.jpg", description:"Practical DSA using C++.", price:780, availability:"in stock", sample:"#"},
  { id:11, title:"Operating Systems: Internals and Design Principles", author:"William Stallings", publisher:"Pearson", year:2018, category:"Operating System", cover:"https://m.media-amazon.com/images/I/8137stGaNQL.jpg", description:"Detailed OS internals and design.", price:880, availability:"in stock", sample:"#"},
  { id:12, title:"GATE Computer Science & IT Guide", author:"Trishna Knowledge Systems", publisher:"Pearson", year:2022, category:"GATE", cover:"https://m.media-amazon.com/images/I/81q69XrjFqL.jpg", description:"Comprehensive GATE prep guide.", price:650, availability:"in stock", sample:"#"},
  { id:13, title:"Theory of Computation", author:"Michael Sipser", publisher:"Cengage", year:2013, category:"CSE Core", cover:"https://contents.kyobobook.co.kr/sih/fit-in/400x0/pdt/9781133187813.jpg", description:"Automata theory and computability.", price:820, availability:"in stock", sample:"#"},
  { id:14, title:"Computer Graphics with OpenGL", author:"Donald D. Hearn, M. Pauline Baker", publisher:"Pearson", year:2014, category:"Graphics", cover:"https://m.media-amazon.com/images/I/51wbtjvzbuL._UF1000,1000_QL80_.jpg", description:"Computer graphics fundamentals with examples.", price:720, availability:"in stock", sample:"#"},
  { id:15, title:"GATE Computer Science & IT 2025", author:"Made Easy Editorial Board", publisher:"Made Easy", year:2025, category:"GATE", cover:"https://m.media-amazon.com/images/I/813trMr0iZL._UF1000,1000_QL80_.jpg", description:"Latest GATE guide with solved papers.", price:999, availability:"in stock", sample:"#"}
];

/* ---------- Local storage keys & state ---------- */
const LS_CART = "klh_cart_v1";
const LS_FAV  = "klh_fav_v1";
const LS_READ = "klh_read_v1";
const LS_RECENT = "klh_recent_v1";
const LS_WALLET = "klh_wallet_v1";
const LS_TXNS = "klh_txns_v1";

/* state */
let cart = JSON.parse(localStorage.getItem(LS_CART)) || []; // [{id,quantity}]
let favorites = JSON.parse(localStorage.getItem(LS_FAV)) || []; // [book]
let readingList = JSON.parse(localStorage.getItem(LS_READ)) || []; // [book]
let recent = JSON.parse(localStorage.getItem(LS_RECENT)) || []; // [book]
let wallet = parseInt(localStorage.getItem(LS_WALLET) || "16000", 10);
let transactions = JSON.parse(localStorage.getItem(LS_TXNS)) || []; // [{when,amount,items,qty}]

/* ---------- DOM elements ---------- */
const bookGrid = document.getElementById("bookGrid");
const searchInput = document.getElementById("searchInput");
const categorySelect = document.getElementById("categorySelect");
const sortSelect = document.getElementById("sortSelect");
const resetFiltersBtn = document.getElementById("resetFilters");
const applyFiltersBtn = document.getElementById("applyFiltersBtn");
const clearFiltersBtn = document.getElementById("clearFiltersBtn");

const bookCountEl = document.getElementById("bookCount");
const cartBtn = document.getElementById("cartBtn");
const cartCountEl = document.getElementById("cartCount");
const cartPreview = document.getElementById("cartPreview");
const cartTotalRight = document.getElementById("cartTotal");
const openCartBtn = document.getElementById("openCartBtn");
const checkoutBtnRight = document.getElementById("checkoutBtn");
const walletBalanceEls = document.querySelectorAll("#walletBalance, #walletSidebar");
const toastEl = document.getElementById("toast");

/* ---------- Add Book form elements ---------- */
const addBookForm = document.getElementById('addBookForm');
const addBookBtn = document.getElementById('addBookBtn');
const clearAddBookBtn = document.getElementById('clearAddBookBtn');
const ab_title = document.getElementById('ab_title');
const ab_author = document.getElementById('ab_author');
const ab_publisher = document.getElementById('ab_publisher');
const ab_year = document.getElementById('ab_year');
const ab_category = document.getElementById('ab_category');
const ab_cover = document.getElementById('ab_cover');
const ab_price = document.getElementById('ab_price');
const ab_availability = document.getElementById('ab_availability');
const ab_description = document.getElementById('ab_description');

const modal = document.getElementById("bookModal");
const modalCover = document.getElementById("modalCover");
const modalTitle = document.getElementById("modalTitle");
const modalAuthor = document.getElementById("modalAuthor");
const modalPublisher = document.getElementById("modalPublisher");
const modalYear = document.getElementById("modalYear");
const modalCategory = document.getElementById("modalCategory");
const modalPrice = document.getElementById("modalPrice");
const modalDesc = document.getElementById("modalDesc");
const modalAddCart = document.getElementById("modalAddCart");
const modalAddReading = document.getElementById("modalAddReading");
const modalFavToggle = document.getElementById("modalFavToggle");
const modalReadOnline = document.getElementById("modalReadOnline");
const modalDownload = document.getElementById("modalDownload");
const modalRating = document.getElementById("modalRating");

const cartModal = document.getElementById("cartModal");
const cartItemsList = document.getElementById("cartItemsList");
const cartModalTotal = document.getElementById("cartModalTotal");
const cartCheckoutBtn = document.getElementById("cartCheckoutBtn");
const clearCartBtn = document.getElementById("clearCartBtn");

const qtyModal = document.getElementById("qtyModal");
const qtyInput = document.getElementById("qtyInput");
const confirmQtyBtn = document.getElementById("confirmQtyBtn");
const cancelQtyBtn = document.getElementById("cancelQtyBtn");

const topupModal = document.getElementById("topupModal");
const topupAmount = document.getElementById("topupAmount");
const topupConfirmBtn = document.getElementById("topupConfirmBtn");
const topupCancelBtn = document.getElementById("topupCancelBtn");

const readingModal = document.getElementById("readingModal");
const readingListItems = document.getElementById("readingListItems");
const favModal = document.getElementById("favModal");
const favListItems = document.getElementById("favListItems");
const recentlyViewedList = document.getElementById("recentlyViewedList");

const favoritesBtn = document.getElementById("favoritesBtn");
const favCountEl = document.getElementById("favCount");
const readingBtn = document.getElementById("readingListBtn");
const readingCountEl = document.getElementById("readingCount");

// toolbar buttons (View reading/favorites) in the content toolbar
const viewReadingBtn = document.getElementById("viewReadingBtn");
const viewFavoritesBtn = document.getElementById("viewFavoritesBtn");

const topUpBtn = document.getElementById("topUpBtn");
const transactionHistory = document.getElementById("transactionHistory");

/* ---------- helpers ---------- */
function formatINR(n){ return new Intl.NumberFormat("en-IN").format(n); }
function findBook(id){ return books.find(b => b.id === id); }
function saveLS(){ localStorage.setItem(LS_CART, JSON.stringify(cart)); localStorage.setItem(LS_FAV, JSON.stringify(favorites)); localStorage.setItem(LS_READ, JSON.stringify(readingList)); localStorage.setItem(LS_RECENT, JSON.stringify(recent)); localStorage.setItem(LS_WALLET, String(wallet)); localStorage.setItem(LS_TXNS, JSON.stringify(transactions)); }

/* ---------- Custom books persistence ---------- */
const LS_CUSTOM = 'klh_custom_books_v1';
function loadCustomBooks(){
  try{
    const raw = localStorage.getItem(LS_CUSTOM);
    if(!raw) return [];
    const arr = JSON.parse(raw);
    return Array.isArray(arr) ? arr : [];
  }catch(e){ return []; }
}
function saveCustomBooks(list){ localStorage.setItem(LS_CUSTOM, JSON.stringify(list)); }

// merge saved custom books into runtime `books` array on load
const customBooks = loadCustomBooks();
if(customBooks.length){
  // ensure ids don't collide with existing ids
  const maxId = books.reduce((m,b)=>Math.max(m,b.id), 0);
  let nextId = maxId + 1;
  customBooks.forEach(cb => { if(!cb.id) cb.id = nextId++; books.push(cb); });
}

/* ---------- render books ---------- */
function renderBooks(list = books){
  bookGrid.innerHTML = "";
  list.forEach(book => {
    const card = document.createElement("div");
    card.className = "book-card";
    card.innerHTML = `
      <img src="${book.cover}" alt="${escapeHtml(book.title)}">
      <div class="book-info">
        <h3>${escapeHtml(book.title)}</h3>
        <p class="muted">${escapeHtml(book.author)}</p>
        <p class="muted">₹${formatINR(book.price)} • ${book.year}</p>
        <div class="book-actions">
          <button class="btn-view" data-id="${book.id}">View</button>
          <button class="btn-add" data-id="${book.id}" ${book.availability!=="in stock"?"disabled":""}>Add to Cart</button>
        </div>
      </div>
    `;
    bookGrid.appendChild(card);
  });
  bookCountEl.textContent = list.length;
  attachCardEventListeners();
  renderCartPreview();
  renderTopRated();
}

/* ---------- Add Book form handling ---------- */
function resetAddBookForm(){ addBookForm.reset(); }

addBookBtn.addEventListener('click', ()=>{
  const title = (ab_title.value||"").trim();
  const author = (ab_author.value||"").trim();
  if(!title || !author){ showToast('Please provide title and author'); return; }
  const newBook = {
    id: Date.now(),
    title,
    author,
    publisher: (ab_publisher.value||"").trim(),
    year: ab_year.value ? parseInt(ab_year.value,10) : undefined,
    category: (ab_category.value||"Other").trim() || 'Other',
    cover: (ab_cover.value||"https://img.icons8.com/fluency/96/000000/books.png").trim(),
    description: (ab_description.value||"").trim(),
    price: ab_price.value ? parseInt(ab_price.value,10) : 0,
    availability: (ab_availability.value||'in stock')
  };

  // add to runtime list and persist in custom storage
  books.unshift(newBook);
  const saved = loadCustomBooks();
  saved.unshift(newBook);
  saveCustomBooks(saved);
  saveLS();

  renderBooks();
  showToast('Book added');
  resetAddBookForm();
  updateCounts();
});

clearAddBookBtn.addEventListener('click', ()=>{ resetAddBookForm(); showToast('Form cleared'); });

/* attach listeners for dynamically created buttons */
function attachCardEventListeners(){
  document.querySelectorAll(".btn-view").forEach(btn => {
    btn.onclick = e => openBookModal(parseInt(e.currentTarget.dataset.id,10));
  });
  document.querySelectorAll(".btn-add").forEach(btn => {
    btn.onclick = e => {
      const id = parseInt(e.currentTarget.dataset.id,10);
      const img = e.currentTarget.closest(".book-card").querySelector("img");
      addToCart(id,1,true,img);
    };
  });
}

/* escape HTML */
function escapeHtml(text){ return String(text).replace(/[&<>"']/g, s=>({ '&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#039;' }[s])); }

/* ---------- modal: book details ---------- */
let currentModalBookId = null;
function openBookModal(id){
  const book = findBook(id);
  if(!book) return;
  currentModalBookId = id;

  // fill modal
  modalCover.src = book.cover;
  modalTitle.textContent = book.title;
  modalAuthor.textContent = book.author;
  modalPublisher.textContent = book.publisher || "—";
  modalYear.textContent = book.year || "—";
  modalCategory.textContent = book.category || "—";
  modalPrice.textContent = formatINR(book.price);
  modalDesc.textContent = book.description || "No description.";
  modalDownload.href = book.sample || "#";
  modalReadOnline.onclick = () => showToast("Read Online (demo) — opens sample if available.");

  // rating
  modalRating.innerHTML = "";
  const ratingKey = "rating_" + id;
  const existing = parseInt(localStorage.getItem(ratingKey) || "0",10);
  for(let i=1;i<=5;i++){
    const star = document.createElement("button");
    star.textContent = i<=existing ? "★":"☆";
    star.onclick = ()=>{ localStorage.setItem(ratingKey,String(i)); openBookModal(id); };
    modalRating.appendChild(star);
  }

  // modal buttons
  modalAddCart.onclick = ()=> addToCart(id,1,true, document.querySelector(`.btn-add[data-id="${id}"]`) );
  modalAddReading.onclick = ()=> { addToReading(id); renderReadingList(); };
  modalFavToggle.onclick = ()=> { toggleFavorite(id); renderFavList(); };

  // favorites text state
  modalFavToggle.textContent = favorites.some(f=>f.id===id) ? "♥ Favorited":"♡ Favorite";

  // recently viewed
  recent = [book, ...recent.filter(b=>b.id!==id)].slice(0,5);
  saveLS();
  renderRecentlyViewed();

  // show
  modal.style.display = "flex";
  modal.setAttribute("aria-hidden","false");
}

/* close modals by close buttons or clicking outside */
document.querySelectorAll(".modal .modal-close").forEach(btn=>{
  btn.addEventListener("click", ()=>{ const id = btn.dataset.close; const el = document.getElementById(id); if(el){ el.style.display="none"; el.setAttribute("aria-hidden","true"); } });
});
document.querySelectorAll(".modal").forEach(m=>{
  m.addEventListener("click", e=>{ if(e.target === m){ m.style.display="none"; m.setAttribute("aria-hidden","true"); }});
});

/* ---------- favorites & reading list ---------- */
function toggleFavorite(id){
  const idx = favorites.findIndex(f=>f.id===id);
  if(idx===-1) { favorites.push(findBook(id)); showToast("Added to favorites"); }
  else { favorites.splice(idx,1); showToast("Removed from favorites"); }
  saveLS(); updateCounts();
}
function addToReading(id){
  if(!readingList.some(r=>r.id===id)){
    readingList.push(findBook(id));
    showToast("Added to reading list");
    saveLS();
    updateCounts();
    renderReadingPreview();
  } else showToast("Already in reading list");
}

/* render favorites modal items */
function renderFavList(){
  favListItems.innerHTML = "";
  if(!favorites.length){ favListItems.innerHTML = "<p>No favorites yet.</p>"; return; }
  favorites.forEach(b=>{
    const el = document.createElement("div");
    el.className = "fav-item";
    el.innerHTML = `<div style="display:flex;gap:8px;align-items:center">
      <img src="${b.cover}" style="width:44px;height:60px;object-fit:cover">
      <div><div style="font-weight:600">${escapeHtml(b.title)}</div><div style="font-size:12px">${escapeHtml(b.author)}</div></div>
    </div>
    <div>
      <button class="fav-add" data-id="${b.id}">Add to Cart</button>
      <button class="fav-remove" data-id="${b.id}" style="background:#ff4d4f;color:#fff">Remove</button>
    </div>`;
    favListItems.appendChild(el);
  });
  favListItems.querySelectorAll(".fav-add").forEach(btn=> btn.onclick = e=> addToCart(parseInt(e.target.dataset.id,10),1,true) );
  favListItems.querySelectorAll(".fav-remove").forEach(btn=> btn.onclick = e=> { favorites = favorites.filter(f=>f.id!==parseInt(e.target.dataset.id,10)); saveLS(); renderFavList(); updateCounts(); } );
}

/* render reading list */
function renderReadingList(){
  readingListItems.innerHTML = "";
  if(!readingList.length){ readingListItems.innerHTML = "<p>No items in reading list.</p>"; return; }
  readingList.forEach(b=>{
    const el = document.createElement("div");
    el.className="reading-item";
    el.innerHTML = `<div style="display:flex;gap:8px;align-items:center">
      <img src="${b.cover}" style="width:44px;height:60px;object-fit:cover">
      <div><div style="font-weight:600">${escapeHtml(b.title)}</div><div style="font-size:12px">${escapeHtml(b.author)}</div></div>
    </div>
    <div><button class="reading-add" data-id="${b.id}">Add to Cart</button><button class="reading-remove" data-id="${b.id}" style="background:#ff4d4f;color:#fff">Remove</button></div>`;
    readingListItems.appendChild(el);
  });
  readingListItems.querySelectorAll(".reading-add").forEach(btn=> btn.onclick = e=> addToCart(parseInt(e.target.dataset.id,10),1,true) );
  readingListItems.querySelectorAll(".reading-remove").forEach(btn=> btn.onclick = e=> {
    readingList = readingList.filter(r=>r.id!==parseInt(e.target.dataset.id,10));
    saveLS();
    renderReadingList();
    renderReadingPreview();
    updateCounts();
  } );
}

/* render recently viewed */
function renderRecentlyViewed(){
  recentlyViewedList.innerHTML = "";
  if(!recent.length){ recentlyViewedList.innerHTML = "<li style='color:#9ca3af'>No recently viewed</li>"; return; }
  recent.forEach(b=>{
    const li = document.createElement("li");
    li.innerHTML = `<a href="#" data-id="${b.id}" class="recent-link">${escapeHtml(b.title)}</a>`;
    recentlyViewedList.appendChild(li);
  });
  document.querySelectorAll(".recent-link").forEach(a=> a.onclick = e=> { e.preventDefault(); openBookModal(parseInt(e.currentTarget.dataset.id,10)); } );
}

/* ---------- cart implementation ---------- */
function getCartTotal(){
  return cart.reduce((sum,it)=> sum + (findBook(it.id).price * it.quantity), 0);
}
function addToCart(id, qty=1, animate=false, imgEl=null){
  const book = findBook(id); if(!book) return;
  const existing = cart.find(i=>i.id===id);
  if(existing) existing.quantity += qty; else cart.push({id,quantity:qty});
  saveLS(); renderCartPreview(); showToast(`Added "${book.title}" to cart`);
  updateCounts();
  if(animate && imgEl) animateToCart(imgEl, 80);
}
function updateCartItem(id, newQty){
  const idx = cart.findIndex(i=>i.id===id);
  if(idx===-1) return;
  if(newQty<=0) cart.splice(idx,1); else cart[idx].quantity = newQty;
  saveLS(); renderCartModal(); renderCartPreview(); updateCounts();
}
function removeFromCart(id){ cart = cart.filter(i=>i.id!==id); saveLS(); renderCartModal(); renderCartPreview(); updateCounts(); }
function clearCart(){ cart=[]; saveLS(); renderCartModal(); renderCartPreview(); updateCounts(); }

/* render cart preview (right panel) */
function renderCartPreview(){
  if(cart.length===0){ cartPreview.textContent="No items in cart"; cartTotalRight.textContent="0"; cartCountEl.textContent="0"; return; }
  cartPreview.innerHTML = "";
  cart.slice(0,3).forEach(item=>{
    const b = findBook(item.id);
    const d = document.createElement("div"); d.textContent = `${b.title} x${item.quantity} — ₹${formatINR(b.price*item.quantity)}`; cartPreview.appendChild(d);
  });
  if(cart.length>3){ const more = document.createElement("div"); more.textContent = `+ ${cart.length-3} more`; cartPreview.appendChild(more); }
  cartModalTotal.textContent = formatINR(getCartTotal());
  cartTotalRight.textContent = formatINR(getCartTotal());
  cartCountEl.textContent = cart.reduce((s,i)=>s+i.quantity,0);
}

/* render cart modal (detailed) */
function renderCartModal(){
  cartItemsList.innerHTML = "";
  if(cart.length===0){ cartItemsList.innerHTML="<p>Your cart is empty.</p>"; cartModalTotal.textContent="0"; return; }
  cart.forEach(it=>{
    const book = findBook(it.id);
    const row = document.createElement("div"); row.className="cart-item";
    row.innerHTML = `<div class="cart-item-left"><img src="${book.cover}"><div style="margin-left:8px"><div style="font-weight:600">${escapeHtml(book.title)}</div><div style="font-size:12px;color:#6b7280">${escapeHtml(book.author)}</div></div></div>
      <div class="cart-item-right">
        <div>₹${formatINR(book.price)}</div>
        <div style="display:flex;gap:8px;align-items:center;margin-top:6px">
          <button class="qty-decr" data-id="${it.id}">-</button>
          <span class="qty">${it.quantity}</span>
          <button class="qty-incr" data-id="${it.id}">+</button>
          <button class="remove-item" data-id="${it.id}">Remove</button>
        </div>
      </div>`;
    cartItemsList.appendChild(row);
  });

  // listeners
  cartItemsList.querySelectorAll(".qty-incr").forEach(btn=> btn.onclick = e=> { const id=parseInt(e.currentTarget.dataset.id,10); const it=cart.find(ci=>ci.id===id); updateCartItem(id,it.quantity+1); } );
  cartItemsList.querySelectorAll(".qty-decr").forEach(btn=> btn.onclick = e=> { const id=parseInt(e.currentTarget.dataset.id,10); const it=cart.find(ci=>ci.id===id); updateCartItem(id,it.quantity-1); } );
  cartItemsList.querySelectorAll(".remove-item").forEach(btn=> btn.onclick = e=> removeFromCart(parseInt(e.currentTarget.dataset.id,10)) );

  cartModalTotal.textContent = formatINR(getCartTotal());
  cartTotalRight.textContent = formatINR(getCartTotal());
}

/* ---------- checkout flow with qty confirmation ---------- */
function openCartModal(){
  renderCartModal(); cartModal.style.display="flex"; cartModal.setAttribute("aria-hidden","false");
}
cartCheckoutBtn.onclick = ()=> { // open qty modal
  if(cart.length===0){ showToast("Cart empty"); return; }
  qtyModal.style.display="flex"; qtyModal.setAttribute("aria-hidden","false");
};
confirmQtyBtn.onclick = ()=>{
  const qty = Math.max(1, parseInt(qtyInput.value||"1",10));
  const total = getCartTotal() * qty;
  if(total > wallet){ showToast("Insufficient wallet balance"); return; }
  // deduct wallet, create transaction record
  wallet -= total;
  const items = cart.map(i=>({id:i.id,qty:i.quantity}));
  const tx = { when: new Date().toISOString(), amount: total, items, qty };
  transactions.unshift(tx);
  // clear cart
  clearCart();
  saveLS();
  updateWalletUI();
  renderTransactions();
  showToast(`Payment successful — ₹${formatINR(total)} deducted`);
  qtyModal.style.display="none";
  cartModal.style.display="none";
};
cancelQtyBtn.onclick = ()=> { qtyModal.style.display="none"; };

/* top-up wallet */
topUpBtn.addEventListener("click", ()=> { topupModal.style.display="flex"; topupModal.setAttribute("aria-hidden","false"); });
topupConfirmBtn.onclick = ()=> {
  const amt = Math.max(0, parseInt(topupAmount.value||"0",10));
  if(amt<=0){ showToast("Enter valid amount"); return; }
  wallet += amt;
  saveLS();
  updateWalletUI();
  showToast(`₹${formatINR(amt)} added to wallet`);
  topupModal.style.display="none";
  topupAmount.value="";
};
topupCancelBtn.onclick = ()=> { topupModal.style.display="none"; };

/* ---------- transactions ---------- */
function renderTransactions(){
  const el = document.getElementById("transactionHistory");
  el.innerHTML = "";
  if(!transactions.length){ el.innerHTML = "<li style='color:#9ca3af'>No transactions yet</li>"; return; }
  transactions.slice(0,10).forEach(t=>{
    const li = document.createElement("li");
    const when = new Date(t.when).toLocaleString();
    li.textContent = `${when} — ₹${formatINR(t.amount)} (${t.items.length} item(s), qty ×${t.qty})`;
    el.appendChild(li);
  });
}

/* ---------- wallet UI & counts ---------- */
function updateWalletUI(){ walletBalanceEls.forEach(el=>el.textContent = formatINR(wallet)); saveLS(); }
function updateCounts(){ favCountEl.textContent = favorites.length; readingCountEl.textContent = readingList.length; cartCountEl.textContent = cart.reduce((s,i)=>s+i.quantity,0); }

/* ---------- search, filter, sort ---------- */
function applyFiltersAndRender(){
  let filtered = [...books];
  const term = (searchInput.value||"").trim().toLowerCase();
  const cat = categorySelect.value || "All";
  if(term){
    filtered = filtered.filter(b => (b.title+b.author+(b.publisher||"")).toLowerCase().includes(term));
  }
  if(cat && cat!=="All"){
    filtered = filtered.filter(b => (b.category||"").toLowerCase() === cat.toLowerCase());
  }
  // checkbox filters (sidebar)
  const checked = Array.from(document.querySelectorAll(".genreCheckbox:checked")).map(i=>i.value);
  if(checked.length>0) filtered = filtered.filter(b => checked.includes(b.category)|| checked.includes("All"));
  // sort
  const s = sortSelect.value || "newest";
  switch(s){
    case "title-asc": filtered.sort((a,b)=>a.title.localeCompare(b.title)); break;
    case "title-desc": filtered.sort((a,b)=>b.title.localeCompare(a.title)); break;
    case "price-asc": filtered.sort((a,b)=>a.price-b.price); break;
    case "price-desc": filtered.sort((a,b)=>b.price-a.price); break;
    case "year-asc": filtered.sort((a,b)=> (a.year||0)-(b.year||0)); break;
    case "year-desc": filtered.sort((a,b)=> (b.year||0)-(a.year||0)); break;
    default: filtered.sort((a,b)=> (b.year||0)-(a.year||0)); break;
  }
  renderBooks(filtered);
}

/* reset filters */
resetFiltersBtn.onclick = ()=> { searchInput.value=""; categorySelect.value="All"; sortSelect.value="newest"; document.querySelectorAll(".genreCheckbox").forEach(c=>c.checked=false); applyFiltersAndRender(); };

/* apply/clear sidebar */
applyFiltersBtn && (applyFiltersBtn.onclick = applyFiltersAndRender);
clearFiltersBtn && (clearFiltersBtn.onclick = ()=>{ document.querySelectorAll(".genreCheckbox").forEach(c=>c.checked=false); applyFiltersAndRender(); });

/* listeners for header filters */
searchInput.addEventListener("input", applyFiltersAndRender);
categorySelect.addEventListener("change", applyFiltersAndRender);
sortSelect.addEventListener("change", applyFiltersAndRender);

/* ---------- toast ---------- */
let toastTimer = null;
function showToast(msg, ms=2200){ if(!toastEl) return alert(msg); toastEl.textContent = msg; toastEl.classList.add("show"); clearTimeout(toastTimer); toastTimer = setTimeout(()=> toastEl.classList.remove("show"), ms); }

/* ---------- fly-to-cart animation ---------- */
function animateToCart(imgEl, size=80){
  if(!imgEl) return;
  const rect = imgEl.getBoundingClientRect();
  const fly = imgEl.cloneNode(true);
  fly.className = "fly";
  fly.style.left = rect.left + "px";
  fly.style.top = rect.top + "px";
  fly.style.width = size + "px";
  fly.style.height = (size * 1.2) + "px";
  document.body.appendChild(fly);
  setTimeout(()=> fly.remove(), 900);
}

/* ---------- top rated preview ---------- */
function renderTopRated(){
  const preview = document.getElementById("topRatedPreview");
  const rated = books.map(b=>({ b, r: parseInt(localStorage.getItem("rating_"+b.id)||"0",10)})).filter(x=>x.r>0).sort((a,b)=>b.r-a.r).slice(0,3);
  preview.innerHTML = rated.length? rated.map(x=>`${x.b.title} (${x.r}★)`).join("<br/>") : "—";
}

/* ---------- render transactions preview, reading preview ---------- */
function renderTransactionPreview(){
  const el = document.getElementById("transactionHistory");
  el.innerHTML = "";
  (transactions.slice(0,5)).forEach(t=>{ const li=document.createElement("li"); li.textContent = `${new Date(t.when).toLocaleString()} — ₹${formatINR(t.amount)}`; el.appendChild(li); });
}
function renderReadingPreview(){
  const el = document.getElementById("readingPreviewList");
  el.innerHTML = "";
  readingList.slice(0,5).forEach(b=>{ const li=document.createElement("li"); li.textContent = b.title; el.appendChild(li); });
}

/* ---------- open/close panels ---------- */
cartBtn.addEventListener("click", ()=> openCartModal());
openCartBtn.addEventListener("click", ()=> openCartModal());
document.getElementById("checkoutBtn") && (document.getElementById("checkoutBtn").onclick = ()=> { cartModal.style.display = "flex"; openCartModal(); });
favoritesBtn.addEventListener("click", ()=> { renderFavList(); favModal.style.display="flex"; favModal.setAttribute("aria-hidden","false"); });
readingBtn.addEventListener("click", ()=> { renderReadingList(); readingModal.style.display="flex"; readingModal.setAttribute("aria-hidden","false"); });

// content-toolbar buttons
viewFavoritesBtn && viewFavoritesBtn.addEventListener("click", ()=> { renderFavList(); favModal.style.display="flex"; favModal.setAttribute("aria-hidden","false"); });
viewReadingBtn && viewReadingBtn.addEventListener("click", ()=> { renderReadingList(); readingModal.style.display="flex"; readingModal.setAttribute("aria-hidden","false"); });

/* ---------- openCartModal ---------- */
function openCartModal(){ renderCartModal(); cartModal.style.display="flex"; cartModal.setAttribute("aria-hidden","false"); }

/* ---------- save & load ---------- */
function init(){
  favorites = JSON.parse(localStorage.getItem(LS_FAV)) || favorites;
  readingList = JSON.parse(localStorage.getItem(LS_READ)) || readingList;
  recent = JSON.parse(localStorage.getItem(LS_RECENT)) || recent;
  cart = JSON.parse(localStorage.getItem(LS_CART)) || cart;
  wallet = parseInt(localStorage.getItem(LS_WALLET) || String(wallet),10);
  transactions = JSON.parse(localStorage.getItem(LS_TXNS)) || transactions;

  renderBooks(books);
  renderCartPreview();
  renderRecentlyViewed();
  renderFavList();
  renderReadingList();
  renderReadingPreview();
  updateWalletUI();
  updateCounts();
  renderTransactions();
  renderTransactionPreview();
}

/* ---------- update wallet UI and counts ---------- */
function updateWalletUI(){ walletBalanceEls.forEach(el=>el.textContent = formatINR(wallet)); saveLS(); }
function updateCounts(){ favCountEl.textContent = favorites.length; readingCountEl.textContent = readingList.length; cartCountEl.textContent = cart.reduce((s,i)=>s+i.quantity,0); }

/* ---------- dark mode toggle ---------- */
const darkModeToggle = document.getElementById("darkModeToggle");
darkModeToggle && darkModeToggle.addEventListener("click", ()=>{
  document.body.classList.toggle("dark");
  darkModeToggle.textContent = document.body.classList.contains("dark") ? "☀️":"🌙";
});

/* ---------- initial render ---------- */
init();

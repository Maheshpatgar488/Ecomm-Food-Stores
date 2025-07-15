const products = [
  { id: 1, name: "Rice", price: 219.99, image: "image/rice.jpeg" },
  { id: 2, name: "Flour", price: 129.99, image: "image/flour.png" },
  { id: 3, name: "Biscuits", price: 39.99, image: "image/biscuit.jpeg" },
  { id: 4, name: "Tea Powder", price: 135.99, image: "image/tea.jpg" },
  { id: 5, name: "Tomato", price: 79.99, image: "image/Tomato.jpg" },
  { id: 6, name: "Sugar", price: 139.99, image: "image/sugar.jpg" },
  { id: 7, name: "Wheat", price: 119.99, image: "image/wheat.jpg" },
  { id: 8, name: "coriander powder", price: 139.99, image: "image/coriander powder.jpg" },
  { id: 9, name: "Red Chilli Powder", price: 120.99, image: "image/mirchi powder.jpg" },
  { id: 10, name: "Bread", price: 130.99, image: "image/bread.jpg" },
];

let cart = JSON.parse(localStorage.getItem("cart")) || [];

function saveCart() {
  localStorage.setItem("cart", JSON.stringify(cart));
}

function renderProducts() {
  const productList = document.getElementById("product-list");
  productList.innerHTML = "";
  products.forEach(product => {
    const card = document.createElement("div");
    card.className = "product-card";
    card.innerHTML = `
      <img src="${product.image}" alt="${product.name}" />
      <h3>${product.name}</h3>
      <p>Rs ${product.price.toFixed(2)}</p>
      <button onclick="addToCart(${product.id})">Add to Cart</button>
    `;
    productList.appendChild(card);
  });
}

function addToCart(id) {
  const existing = cart.find(item => item.id === id);

  if (existing) {
    existing.quantity++;
  } else {
    const product = products.find(p => p.id === id);
    cart.push({ ...product, quantity: 1 });
  }
  saveCart();
  updateCartCount();
  updateCartUI();
  alert("Product added to cart successfully!");
}

function removeFromCart(id) {
  cart = cart.filter(item => item.id !== id);
  saveCart();
  updateCartCount();
  updateCartUI();
  alert("Product removed successfully!");
}

function updateQuantity(id, amount) {
  const item = cart.find(i => i.id === id);
  if (!item) return;

  item.quantity += amount;
  if (item.quantity <= 0) {
    removeFromCart(id);
  } else {
    saveCart();
    updateCartCount();
    updateCartUI();
    alert("Quantity updated successfully!");
  }
}

function updateCartCount() {
  const totalCount = cart.reduce((sum, item) => sum + item.quantity, 0);
  document.getElementById("cart-count").textContent = totalCount;
}

function updateCartUI() {
  const cartItems = document.getElementById("cart-items");
  cartItems.innerHTML = "";

  let total = 0;

  cart.forEach(item => {
    const li = document.createElement("li");
    total += item.price * item.quantity;
    li.innerHTML = `
      ${item.name} - Rs ${item.price.toFixed(2)} × ${item.quantity}
      <button onclick="updateQuantity(${item.id}, 1)">+</button>
      <button onclick="updateQuantity(${item.id}, -1)">−</button>
      <button onclick="removeFromCart(${item.id})">🗑️</button>
    `;
    cartItems.appendChild(li);
  });

  const totalDisplay = document.createElement("li");
  totalDisplay.style.fontWeight = "bold";
  totalDisplay.textContent = `Total: Rs ${total.toFixed(2)}`;
  cartItems.appendChild(totalDisplay);

  // Checkout Button
  const checkoutBtn = document.createElement("button");
  checkoutBtn.textContent = "Checkout";
  checkoutBtn.style.marginTop = "10px";
  checkoutBtn.onclick = checkout;

  const checkoutLi = document.createElement("li");
  checkoutLi.appendChild(checkoutBtn);
  cartItems.appendChild(checkoutLi);
}

function toggleCart() {
  const cartSection = document.getElementById("cart-section");
  cartSection.classList.toggle("active");
}

function checkout() {
  if (cart.length === 0) {
    alert("Cart is empty.");
    return;
  }

  const confirmCheckout = confirm("Proceed to checkout?");
  if (confirmCheckout) {
    alert("Checkout successful! Thank you for your purchase.");
    cart = [];
    saveCart();
    updateCartCount();
    updateCartUI();
  }
}

// Initial load
renderProducts();
updateCartCount();
updateCartUI();

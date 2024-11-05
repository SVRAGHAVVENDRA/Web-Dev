document.addEventListener("DOMContentLoaded", () => {
  loadCartItems();
  updateTotalPrice();
});

function loadCartItems() {
  const cartItemsContainer = document.getElementById("cart-items");
  while (cartItemsContainer.hasChildNodes()) {
    cartItemsContainer.removeChild(cartItemsContainer.firstChild);
  }
  const cart = JSON.parse(localStorage.getItem("cart")) || [];
  cart.forEach((item, i) => {
    const cartItem = document.createElement("div");
    cartItem.className = "cart-item";
    cartItem.id = item.name;
    cartItem.innerHTML = `
            <img src="${item.image}" alt="${item.name}">
            <div class="cart-item-info" id="${i}">
                <h2>${item.name}</h2>
                <p class="product-price">$${item.price} each</p>
                <div class="quantity-controls">
                    <button class="quantity-button" onclick="changeQuantity('${item.name}', -1)">-</button>
                    <span class="quantity-display" id="cart-quantity-${item.name}">${item.quantity}</span>
                    <button class="quantity-button" onclick="changeQuantity('${item.name}', 1)">+</button>
                </div>
                <button class="remove-button" onclick="removeFromCart('${item.name}')">Remove</button>
            </div>
        `;
    cartItemsContainer.appendChild(cartItem);
  });
}

function changeQuantity(productName, change) {
  const cart = JSON.parse(localStorage.getItem("cart")) || [];
  const item = cart.find((item) => item.name === productName);
  if (item) {
    item.quantity += change;
    if (item.quantity <= 0) {
      removeFromCart(productName);
    } else {
      localStorage.setItem("cart", JSON.stringify(cart));
      document.getElementById(`cart-quantity-${productName}`).textContent =
        item.quantity;
      updateTotalPrice();
    }
  }
}

function removeFromCart(productName) {
  let cart = JSON.parse(localStorage.getItem("cart")) || [];
  cart = cart.filter((item) => item.name !== productName);
  localStorage.setItem("cart", JSON.stringify(cart));

  loadCartItems();
  updateTotalPrice();
}

function updateTotalPrice() {
  const cart = JSON.parse(localStorage.getItem("cart")) || [];
  let totalPrice = 0;
  cart.forEach((item) => {
    totalPrice += item.price * item.quantity;
  });
  document.getElementById("cart-total-price").textContent =
    totalPrice.toFixed(2);
}

function checkout() {
  alert("Proceeding to checkout...");
}

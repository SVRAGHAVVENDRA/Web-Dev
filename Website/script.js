function changeQuantity(productName, change) {
    const quantityDisplay = document.getElementById(`quantity-${productName}`);
    let currentQuantity = parseInt(quantityDisplay.textContent);
    currentQuantity += change;
    if (currentQuantity < 0) {
        currentQuantity = 0;
    }
    quantityDisplay.textContent = currentQuantity;
}

function addToCart(productName, productPrice, productImage) {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const existingItem = cart.find(item => item.name === productName);
    if (existingItem) {
        existingItem.quantity += 1;
    }
     else {
        cart.push({ name: productName, price: productPrice, quantity: 1, image: productImage });
    }
    localStorage.setItem('cart', JSON.stringify(cart));
    alert(`${productName} added to cart`);
}

// Ensure your buy buttons call this function with the correct arguments:
// Example: <button onclick="addToCart('Apple', 1.00, 'apple.jpg')">Add to Cart</button>

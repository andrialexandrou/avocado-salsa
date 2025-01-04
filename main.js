let cartCount = 0;
const products = [
    { id: 1, name: 'Product 1', price: 99.99 },
    { id: 2, name: 'Product 2', price: 149.99 },
    { id: 3, name: 'Product 3', price: 79.99 }
];

// Add to cart functionality
document.querySelectorAll('.add-to-cart').forEach(button => {
    button.addEventListener('click', () => {
        cartCount++;
        updateCart();
        showNotification();
    });
});

// Update cart count
function updateCart() {
    document.getElementById('count').textContent = cartCount;
}

// Show notification
function showNotification() {
    const notification = document.getElementById('notification');
    notification.style.display = 'block';
    setTimeout(() => {
        notification.style.display = 'none';
    }, 2000);
}

// Sort products
document.getElementById('sortBtn').addEventListener('click', () => {
    const sortedProducts = [...products].sort((a, b) => a.price - b.price);
    updateProductGrid(sortedProducts);
});

// Filter products
document.getElementById('filterBtn').addEventListener('click', () => {
    const filteredProducts = products.filter(product => product.price < 100);
    updateProductGrid(filteredProducts);
});

// Update product grid
function updateProductGrid(products) {
    const grid = document.getElementById('productGrid');
    grid.innerHTML = products.map(product => `
        <div class="card">
            <h3>${product.name}</h3>
            <p>Price: $${product.price}</p>
            <button class="btn add-to-cart">Add to Cart</button>
        </div>
    `).join('');
    
    // Reattach event listeners
    attachCartListeners();
}

// Attach cart event listeners
function attachCartListeners() {
    document.querySelectorAll('.add-to-cart').forEach(button => {
        button.addEventListener('click', () => {
            cartCount++;
            updateCart();
            showNotification();
        });
    });
}

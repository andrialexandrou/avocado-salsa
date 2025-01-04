// Configuration
const CONFIG = {
    NOTIFICATION_DURATION: 2000,
    DEFAULT_MAX_PRICE: 200,
    STORAGE_KEY: 'shopping_cart'
};

// State management
const state = {
    cartCount: parseInt(localStorage.getItem(CONFIG.STORAGE_KEY)) || 0,
    products: [
        { id: 1, name: 'Premium Headphones', price: 99.99, inStock: true },
        { id: 2, name: 'Wireless Mouse', price: 149.99, inStock: true },
        { id: 3, name: 'Gaming Keyboard', price: 79.99, inStock: true }
    ],
    filteredProducts: [],
    maxPrice: CONFIG.DEFAULT_MAX_PRICE
};

// DOM Elements
const elements = {
    productGrid: document.getElementById('productGrid'),
    cartCount: document.getElementById('count'),
    notification: document.getElementById('notification'),
    maxPrice: document.getElementById('maxPrice'),
    priceValue: document.getElementById('priceValue')
};

// Initialize the application
function init() {
    state.filteredProducts = [...state.products];
    updateCart();
    attachEventListeners();
    updateProductGrid(state.products);
}

// Event Listeners
function attachEventListeners() {
    // Event delegation for product grid
    elements.productGrid.addEventListener('click', e => {
        if (e.target.matches('.add-to-cart')) {
            handleAddToCart();
        }
    });

    // Filter and sort buttons
    document.getElementById('filterBtn').addEventListener('click', () => {
        filterProducts(product => product.price < 100);
    });

    document.getElementById('sortBtn').addEventListener('click', () => {
        const sortedProducts = [...state.filteredProducts].sort((a, b) => a.price - b.price);
        updateProductGrid(sortedProducts);
    });

    document.getElementById('resetBtn').addEventListener('click', resetFilters);

    // Price range filter
    elements.maxPrice.addEventListener('input', handlePriceFilter);
}

// Cart functionality
function handleAddToCart() {
    state.cartCount++;
    localStorage.setItem(CONFIG.STORAGE_KEY, state.cartCount);
    updateCart();
    showNotification('Item added to cart!');
}

function updateCart() {
    elements.cartCount.textContent = state.cartCount;
}

// Notification system
function showNotification(message) {
    elements.notification.textContent = message;
    elements.notification.style.display = 'block';
    
    setTimeout(() => {
        elements.notification.style.display = 'none';
    }, CONFIG.NOTIFICATION_DURATION);
}

// Product filtering
function filterProducts(filterFn) {
    state.filteredProducts = state.products.filter(filterFn);
    updateProductGrid(state.filteredProducts);
}

function handlePriceFilter(e) {
    const maxPrice = parseInt(e.target.value);
    state.maxPrice = maxPrice;
    elements.priceValue.textContent = `$${maxPrice}`;
    filterProducts(product => product.price <= maxPrice);
}

// Reset filters
function resetFilters() {
    state.maxPrice = CONFIG.DEFAULT_MAX_PRICE;
    elements.maxPrice.value = CONFIG.DEFAULT_MAX_PRICE;
    elements.priceValue.textContent = `$${CONFIG.DEFAULT_MAX_PRICE}`;
    state.filteredProducts = [...state.products];
    updateProductGrid(state.filteredProducts);
}

// Grid updates
function updateProductGrid(products) {
    const productHTML = products
        .map(({ name, price, inStock }) => `
            <div class="card">
                <h3>${name}</h3>
                <p>Price: $${price.toFixed(2)}</p>
                <div class="stock-label">${inStock ? 'In Stock' : 'Out of Stock'}</div>
                <button class="btn add-to-cart" ${!inStock ? 'disabled' : ''}>
                    Add to Cart
                </button>
            </div>
        `)
        .join('');
    
    elements.productGrid.innerHTML = productHTML;
}

// Initialize the app
init();
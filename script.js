// Product Data
const products = [
    {
        id: 1,
        name: "Logitech MX Mechanical Keyboard",
        price: 2500000,
        image: "my-11134207-7r98r-lwz8gh840fhm85.jpeg",
        category: "keyboard",
        description: "Keyboard mechanical premium dengan switch Tactile Quiet, wireless, dan baterai tahan 15 hari.",
        stock: 10
    },
    {
        id: 2,
        name: "Razer DeathAdder V2 Pro Mouse",
        price: 1250000,
        image: "RAZER-DEATHADDER-V2-PRO-ERGONOMIC-WIRELESS-GAMING-MOUSE-4.jpg",
        category: "mouse",
        description: "Mouse gaming wireless dengan sensor Focus+ 30K DPI, baterai 120 jam, dan desain ergonomis.",
        stock: 15
    },
    {
        id: 3,
        name: "HyperX Alloy FPS Pro",
        price: 950000,
        image: "allowfps4-768x768.jpg",
        category: "keyboard",
        description: "Keyboard mechanical gaming dengan switch Cherry MX Red, aluminium frame, dan RGB lighting.",
        stock: 8
    },
    {
        id: 4,
        name: "SteelSeries Aerox 3 Wireless",
        price: 1450000,
        image: "feature_dt_aerox3wl_smp.jpg__1920x700_q100_crop-scale_optimize_subsampling-2.jpg",
        category: "mouse",
        description: "Mouse gaming ultra ringan 66g, sensor TrueMove Air, baterai 200 jam, dan IP54 water resistant.",
        stock: 12
    },
    {
        id: 5,
        name: "Cooler Master MK770",
        price: 850000,
        image: "6b608a9a-8bea-41d4-883d-9948d2d5361d.__CR0,0,3492,1080_PT0_SX970_V1___.jpeg",
        category: "keyboard",
        description: "Keyboard mechanical 75% layout dengan hot-swappable switch dan gasket mount design.",
        stock: 20
    },
    {
        id: 6,
        name: "Logitech G Pro X Superlight",
        price: 1850000,
        image: "logitech-g-pro-x-superlight-wireless-gaming-mouse_mmz2.1920.webp",
        category: "mouse",
        description: "Mouse gaming eSports dengan berat 63g, sensor HERO 25K, dan koneksi LIGHTSPEED wireless.",
        stock: 6
    },
    {
        id: 7,
        name: "Keychron K8 Pro",
        price: 1650000,
        image: "hotswappablefeatureofkeychronk8prowirelessmechanicalkeyboardisolayoutversion-1666169920558.jpg",
        category: "keyboard",
        description: "Keyboard wireless 75% dengan Gateron switch, QMK/VIA support, dan baterai 240 jam.",
        stock: 14
    },
    {
        id: 8,
        name: "Corsair Dark Core RGB Pro",
        price: 1350000,
        image: "45f355f48f32ad5dd07670e209e09232.jpg",
        category: "mouse",
        description: "Mouse gaming dengan sensor PixArt PAW3392, baterai 50 jam, dan 8 tombol programmable.",
        stock: 9
    }
];

// Shopping Cart
let cart = [];

// DOM Elements
const productsGrid = document.getElementById('productsGrid');
const cartCount = document.getElementById('cartCount');
const cartModal = document.getElementById('cartModal');
const cartItems = document.getElementById('cartItems');
const cartTotal = document.getElementById('cartTotal');
const searchInput = document.getElementById('searchInput');
const productModal = document.getElementById('productModal');
const productDetail = document.getElementById('productDetail');

// Initialize
document.addEventListener('DOMContentLoaded', function() {
    renderProducts(products);
    updateCartCount();
});

// Render Products
function renderProducts(productList) {
    productsGrid.innerHTML = productList.map(product => `
        <div class="product-card" onclick="openProductModal(${product.id})">
            <div class="product-image">
                <img src="${product.image}" alt="${product.name}" loading="lazy">
                <div class="product-badge">${product.stock > 0 ? 'Tersedia' : 'Habis'}</div>
            </div>
            <div class="product-info">
                <h3>${product.name}</h3>
                <p>${product.description.substring(0, 80)}...</p>
                <div class="product-price">Rp ${formatRupiah(product.price)}</div>
                <button class="add-to-cart" onclick="event.stopPropagation(); addToCart(${product.id})">
                    <i class="fas fa-cart-plus"></i> Tambah Keranjang
                </button>
            </div>
        </div>
    `).join('');
}

// Format Rupiah
function formatRupiah(angka) {
    return angka.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
}

// Add to Cart
function addToCart(productId) {
    const product = products.find(p => p.id === productId);
    const existingItem = cart.find(item => item.id === productId);
    
    if (product.stock === 0) {
        alert('Produk habis stok!');
        return;
    }
    
    if (existingItem) {
        if (existingItem.quantity >= product.stock) {
            alert('Stok tidak mencukupi!');
            return;
        }
        existingItem.quantity++;
    } else {
        cart.push({ ...product, quantity: 1 });
    }
    
    updateCartCount();
    updateCartDisplay();
    showNotification('Produk ditambahkan ke keranjang!');
}

// Update Cart Count
function updateCartCount() {
    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    cartCount.textContent = totalItems;
}

// Update Cart Display
function updateCartDisplay() {
    if (cart.length === 0) {
        cartItems.innerHTML = '<p style="text-align: center; color: #6b7280;">Keranjang kosong</p>';
        cartTotal.textContent = 'Rp 0';
        return;
    }
    
    cartItems.innerHTML = cart.map(item => `
        <div class="cart-item">
            <img src="${item.image}" alt="${item.name}">
            <div class="cart-item-info">
                <h4>${item.name}</h4>
                <p>Rp ${formatRupiah(item.price)} x ${item.quantity}</p>
            </div>
            <button class="remove-item" onclick="removeFromCart(${item.id})">
                Hapus
            </button>
        </div>
    `).join('');
    
    const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    cartTotal.textContent = `Rp ${formatRupiah(total)}`;
}

// Remove from Cart
function removeFromCart(productId) {
    cart = cart.filter(item => item.id !== productId);
    updateCartCount();
    updateCartDisplay();
}

// Toggle Cart Modal
function toggleCart() {
    cartModal.style.display = cartModal.style.display === 'block' ? 'none' : 'block';
}

// Open Product Modal
function openProductModal(productId) {
    const product = products.find(p => p.id === productId);
    productDetail.innerHTML = `
        <div style="display: flex; gap: 2rem; flex-wrap: wrap;">
            <img src="${product.image}" alt="${product.name}" style="width: 350px; height: 350px; object-fit: cover; border-radius: 20px;">
            <div style="flex: 1; min-width: 300px;">
                <h2 style="font-size: 2rem; margin-bottom: 1rem; color: #1e293b;">${product.name}</h2>
                <div style="font-size: 2rem; font-weight: bold; color: #059669; margin-bottom: 1rem;">
                    Rp ${formatRupiah(product.price)}
                </div>
                <p style="color: #64748b; line-height: 1.6; margin-bottom: 2rem;">${product.description}</p>
                <div style="display: flex; gap: 1rem; align-items: center; margin-bottom: 1.5rem;">
                    <span>Stok: ${product.stock}</span>
                    <div style="display: flex; align-items: center; gap: 0.5rem; background: #f3f4f6; padding: 0.5rem 1rem; border-radius: 25px;">
                        <i class="fas fa-tags"></i>
                        <span>${product.category === 'keyboard' ? 'Keyboard' : 'Mouse'}</span>
                    </div>
                </div>
                <button class="add-to-cart" onclick="addToCart(${product.id}); closeProductModal()" style="margin-bottom: 1rem;">
                    <i class="fas fa-cart-plus"></i> Tambah ke Keranjang
                </button>
            </div>
        </div>
    `;
    productModal.style.display = 'block';
}

// Close Product Modal
function closeProductModal() {
    productModal.style.display = 'none';
}

// Checkout
function checkout() {
    if (cart.length === 0) {
        alert('Keranjang kosong!');
        return;
    }
    
    const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    alert(`Terima kasih! Total pembelian: Rp ${formatRupiah(total)}\nFitur checkout akan diimplementasikan nanti.`);
    cart = [];
    updateCartCount();
    updateCartDisplay();
    toggleCart();
}

// Search Functionality
searchInput.addEventListener('input', function(e) {
    const searchTerm = e.target.value.toLowerCase();
    const filteredProducts = products.filter(product =>
        product.name.toLowerCase().includes(searchTerm) ||
        product.description.toLowerCase().includes(searchTerm) ||
        product.category.includes(searchTerm)
    );
    renderProducts(filteredProducts);
});

// Scroll to Products
function scrollToProducts() {
    document.getElementById('products').scrollIntoView({ behavior: 'smooth' });
}

// Close modals when clicking outside
window.onclick = function(event) {
    if (event.target === cartModal) {
        toggleCart();
    }
    if (event.target === productModal) {
        closeProductModal();
    }
}

// Notification
function showNotification(message) {
    const notification = document.createElement('div');
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        background: #10b981;
        color: white;
        padding: 1rem 2rem;
        border-radius: 10px;
        z-index: 3000;
        animation: slideInRight 0.3s ease;
    `;
    notification.textContent = message;
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.remove();
    }, 3000);
}
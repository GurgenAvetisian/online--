// Данные товаров
const products = [
    {
        id: 1,
        name: "Ваза с узором",
        artist: "от Миры Ильянс",
        price: 3500,
        oldPrice: 5000,
        rating: 4.9,
        reviews: 45,
        category: "ceramics",
       image:src= "https://avatars.mds.yandex.net/i?id=a8f8f51838da9d09f2d049aaf8366dd5_sr-3699222-images-thumbs&n=13"
    },
    {
        id: 2,
        name: "Серебряное колье с натуральными камнями",
        artist: "от Анны Петровой",
        price: 5200,
        oldPrice: 7999,
        rating: 5.0,
        reviews: 50,
        category: "jewelry",
        image:src=  "https://avatars.mds.yandex.net/i?id=4f1ae88049bb21b0ac2d3e8706c0336d3498661a-4079534-images-thumbs&n=13"
    },
    {
        id: 3,
        name: "Льняной платок с бахромой",
        artist: "от Ольги Садовой",
        price: 4800,
        oldPrice: 6999,
        rating: 4.8,
        reviews: 32,
        category: "textile",
        image:src= "https://img.joomcdn.net/ab40357fb655db31215dd9e93846775f02dd1f4a_original.jpeg"
    },
    {
        id: 4,
        name: "Деревянная разделочная доска",
        artist: "от Дмитрия Козлова",
        price: 2900,
        oldPrice: 3500,
        rating: 4.7,
        reviews: 36,
        category: "wood",
        image:src= "https://avatars.mds.yandex.net/i?id=8fce932bd845fbc2c6394ba3249fde227b0e0c65-7015461-images-thumbs&n=13"
    },
    {
        id: 5,
        name: "Набор керамических тарелок",
        artist: "от Богдана Морозова",
        price: 4200,
        oldPrice: 4999,
        rating: 4.9,
        reviews: 57,
        category: "ceramics",
        image:src=  "https://avatars.mds.yandex.net/i?id=4e4a768aded6c4dc0e3b26b389bdfbc479d15077-5875681-images-thumbs&n=13"
    },
    {
        id: 6,
        name: "Кожаный кошелек ручной работы",
        artist: "от Алексея Бойкова",
        price: 3800,
        oldPrice: 5500,
        rating: 4.8,
        reviews: 41,
        category: "decor",
        image:src=  "https://avatars.mds.yandex.net/i?id=2d14f55023bdfd12f7bd9e8b7561ff64ddae4020-4576585-images-thumbs&n=13"
    },
    {
        id: 7,
        name: "Керамические чашки (пара)",
        artist: "от Марии Ивановой",
        price: 3200,
        oldPrice: 4800,
        rating: 4.9,
        reviews: 78,
        category: "ceramics",
        image:src=  "https://avatars.mds.yandex.net/i?id=956815135d28cd49259a9a318cefc2cb0ef7be68-12898193-images-thumbs&n=13"
    },
    {
        id: 8,
        name: "Сервиз с авторским дизайном",
        artist: "от Анны Петровой",
        price: 7800,
        oldPrice: 10500,
        rating: 5.0,
        reviews: 54,
        category: "ceramics",
        image:src=  "https://avatars.mds.yandex.net/i?id=e5dee317eb699f9637650a69009cf661a1829608-4412543-images-thumbs&n=13"
    }
];

// Состояние приложения
const state = {
    cart: [],
    wishlist: [],
    filters: {
        category: 'all',
        price: 'all',
        sort: 'popular'
    }
};

// DOM элементы
const productsContainer = document.getElementById('productsContainer');
const cartSidebar = document.getElementById('cartSidebar');
const cartIcon = document.getElementById('cartIcon');
const closeCartBtn = document.getElementById('closeCartBtn');
const cartItems = document.getElementById('cartItems');
const cartTotal = document.getElementById('cartTotal');
const cartCount = document.getElementById('cartCount');
const checkoutBtn = document.getElementById('checkoutBtn');
const notification = document.getElementById('notification');
const notificationText = document.getElementById('notificationText');
const startShoppingBtn = document.getElementById('startShoppingBtn');
const becomeSellerBtn = document.getElementById('becomeSellerBtn');
const newsletterForm = document.getElementById('newsletterForm');
const categoryFilter = document.getElementById('categoryFilter');
const priceFilter = document.getElementById('priceFilter');
const sortFilter = document.getElementById('sortFilter');

// Инициализация приложения
function init() {
    renderProducts();
    setupEventListeners();
    updateCartUI();
}

// Настройка обработчиков событий
function setupEventListeners() {
    // Корзина
    cartIcon.addEventListener('click', toggleCart);
    closeCartBtn.addEventListener('click', closeCart);
    checkoutBtn.addEventListener('click', checkout);
    
    // Кнопки в шапке
    startShoppingBtn.addEventListener('click', startShopping);
    becomeSellerBtn.addEventListener('click', becomeSeller);
    
    // Форма подписки
    newsletterForm.addEventListener('submit', subscribeToNewsletter);
    
    // Фильтры
    categoryFilter.addEventListener('change', applyFilters);
    priceFilter.addEventListener('change', applyFilters);
    sortFilter.addEventListener('change', applyFilters);
    
    // Клик вне корзины для закрытия
    document.addEventListener('click', (e) => {
        if (!cartSidebar.contains(e.target) && !cartIcon.contains(e.target) && cartSidebar.classList.contains('active')) {
            closeCart();
        }
    });
}

// Рендер товаров
function renderProducts() {
    productsContainer.innerHTML = '';
    
    // Применение фильтров
    let filteredProducts = [...products];
    
    if (state.filters.category !== 'all') {
        filteredProducts = filteredProducts.filter(product => product.category === state.filters.category);
    }
    
    if (state.filters.price !== 'all') {
        const maxPrice = parseInt(state.filters.price);
        filteredProducts = filteredProducts.filter(product => product.price <= maxPrice);
    }
    
    // Применение сортировки
    switch (state.filters.sort) {
        case 'price-low':
            filteredProducts.sort((a, b) => a.price - b.price);
            break;
        case 'price-high':
            filteredProducts.sort((a, b) => b.price - a.price);
            break;
        case 'new':
            // Для демонстрации просто перемешиваем
            filteredProducts.sort(() => Math.random() - 0.5);
            break;
        default:
            // По умолчанию - по популярности (рейтинг)
            filteredProducts.sort((a, b) => b.rating - a.rating);
    }
    
    // Рендер отфильтрованных товаров
    filteredProducts.forEach(product => {
        const productCard = document.createElement('div');
        productCard.className = 'product-card';
        productCard.innerHTML = `
            <img class="product-image" src=${product.image}>
            <button class="wishlist-btn" data-id="${product.id}">
                <i class="far fa-heart"></i>
            </button>
            <div class="product-info">
                <div class="product-rating">
                    <span class="rating-stars">${getStarRating(product.rating)}</span>
                    <span class="rating-count">${product.rating} (${product.reviews})</span>
                </div>
                <div class="product-name">${product.name}</div>
                <div class="product-artist">${product.artist}</div>
                <div class="product-price">
                    <span class="current-price">${formatPrice(product.price)}</span>
                    ${product.oldPrice ? `<span class="old-price">${formatPrice(product.oldPrice)}</span>` : ''}
                </div>
                <button class="add-to-cart" data-id="${product.id}">
                    <i class="fas fa-shopping-cart"></i>
                    В корзину
                </button>
            </div>
        `;
        productsContainer.appendChild(productCard);
    });
    
    // Добавление обработчиков для кнопок добавления в корзину и избранное
    document.querySelectorAll('.add-to-cart').forEach(button => {
        button.addEventListener('click', addToCart);
    });
    
    document.querySelectorAll('.wishlist-btn').forEach(button => {
        button.addEventListener('click', toggleWishlist);
    });
}

// Получить звездный рейтинг
function getStarRating(rating) {
    const fullStars = Math.floor(rating);
    const halfStar = rating % 1 >= 0.5;
    const emptyStars = 5 - fullStars - (halfStar ? 1 : 0);
    
    return '★'.repeat(fullStars) + (halfStar ? '½' : '') + '☆'.repeat(emptyStars);
}

// Форматирование цены
function formatPrice(price) {
    return price.toLocaleString('ru-RU') + ' ₽';
}

// Добавление в корзину
function addToCart(e) {
    const productId = parseInt(e.currentTarget.getAttribute('data-id'));
    const product = products.find(p => p.id === productId);
    
    if (product) {
        // Проверяем, есть ли товар уже в корзине
        const existingItem = state.cart.find(item => item.id === productId);
        
        if (existingItem) {
            existingItem.quantity += 1;
        } else {
            state.cart.push({
                ...product,
                quantity: 1
            });
        }
        
        updateCartUI();
        showNotification('Товар добавлен в корзину');
        
        // Визуальная обратная связь на кнопке
        const button = e.currentTarget;
        button.classList.add('added');
        button.innerHTML = '<i class="fas fa-check"></i> Добавлено';
        
        setTimeout(() => {
            button.classList.remove('added');
            button.innerHTML = '<i class="fas fa-shopping-cart"></i> В корзину';
        }, 2000);
    }
}

// Переключение избранного
function toggleWishlist(e) {
    const productId = parseInt(e.currentTarget.getAttribute('data-id'));
    const button = e.currentTarget;
    const icon = button.querySelector('i');
    
    const index = state.wishlist.indexOf(productId);
    
    if (index === -1) {
        state.wishlist.push(productId);
        button.classList.add('active');
        icon.className = 'fas fa-heart';
        showNotification('Товар добавлен в избранное');
    } else {
        state.wishlist.splice(index, 1);
        button.classList.remove('active');
        icon.className = 'far fa-heart';
        showNotification('Товар удален из избранного');
    }
}

// Обновление интерфейса корзины
function updateCartUI() {
    // Очистка корзины
    cartItems.innerHTML = '';
    
    // Обновление счетчика
    const totalItems = state.cart.reduce((sum, item) => sum + item.quantity, 0);
    cartCount.textContent = totalItems;
    
    // Обновление общей стоимости
    const totalPrice = state.cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    cartTotal.textContent = formatPrice(totalPrice);
    
    // Рендер товаров в корзине
    state.cart.forEach(item => {
        const cartItem = document.createElement('div');
        cartItem.className = 'cart-item';
        cartItem.innerHTML = `
            <div class="cart-item-image">${item.image}</div>
            <div class="cart-item-details">
                <div class="cart-item-name">${item.name}</div>
                <div class="cart-item-price">${formatPrice(item.price)} × ${item.quantity}</div>
            </div>
            <button class="cart-item-remove" data-id="${item.id}">
                <i class="fas fa-times"></i>
            </button>
        `;
        cartItems.appendChild(cartItem);
    });
    
    // Добавление обработчиков для кнопок удаления
    document.querySelectorAll('.cart-item-remove').forEach(button => {
        button.addEventListener('click', removeFromCart);
    });
    
    // Показ/скрытие кнопки оформления заказа
    checkoutBtn.style.display = state.cart.length > 0 ? 'block' : 'none';
}

// Удаление из корзины
function removeFromCart(e) {
    const productId = parseInt(e.currentTarget.getAttribute('data-id'));
    state.cart = state.cart.filter(item => item.id !== productId);
    updateCartUI();
    showNotification('Товар удален из корзины');
}

// Переключение видимости корзины
function toggleCart() {
    cartSidebar.classList.toggle('active');
}

// Закрытие корзины
function closeCart() {
    cartSidebar.classList.remove('active');
}

// Оформление заказа
function checkout() {
    if (state.cart.length === 0) {
        showNotification('Корзина пуста');
        return;
    }
    
    const totalPrice = state.cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    alert(`Заказ оформлен! Сумма: ${formatPrice(totalPrice)}\n\nВ реальном приложении здесь будет переход к оформлению заказа.`);
    state.cart = [];
    updateCartUI();
    closeCart();
    showNotification('Заказ успешно оформлен!');
}

// Показ уведомления
function showNotification(text) {
    notificationText.textContent = text;
    notification.classList.add('show');
    
    setTimeout(() => {
        notification.classList.remove('show');
    }, 3000);
}

// Начать покупки
function startShopping() {
    document.querySelector('.categories').scrollIntoView({ 
        behavior: 'smooth' 
    });
}

// Стать продавцом
function becomeSeller() {
    alert('Форма для регистрации продавца будет открыта в ближайшее время!');
}

// Подписка на рассылку
function subscribeToNewsletter(e) {
    e.preventDefault();
    const emailInput = e.target.querySelector('.newsletter-input');
    const email = emailInput.value;
    
    if (email) {
        showNotification(`Спасибо за подписку! На адрес ${email} будут приходить новости и специальные предложения.`);
        emailInput.value = '';
    }
}

// Применение фильтров
function applyFilters() {
    state.filters.category = categoryFilter.value;
    state.filters.price = priceFilter.value;
    state.filters.sort = sortFilter.value;
    
    renderProducts();
}

// Запуск приложения
init();
// Можно добавить функциональность для кнопки
document.addEventListener('DOMContentLoaded', function() {
    const eventButton = document.querySelector('.event-button');
    
    if (eventButton) {
        eventButton.addEventListener('click', function() {
            alert('Переход к материальному событию');
            // Здесь можно добавить другую логику, например:
            // window.location.href = 'event-page.html';
        });
    }
    
    // Дополнительный JavaScript код можно добавить здесь
    console.log('Сайт "Разносменная аудиция" загружен');
});

// Menu Display Functions
function displayMenu(category = 'all') {
    const menuContainer = document.getElementById('menu-items');
    if (!menuContainer) return;
    
    menuContainer.innerHTML = '';
    
    const filteredItems = category === 'all' 
        ? menuItems 
        : menuItems.filter(item => item.category === category);

    filteredItems.forEach(item => {
        const menuItem = document.createElement('div');
        menuItem.className = 'col-md-6 mb-4';
        menuItem.innerHTML = `
            <div class="menu-item" data-category="${item.category}">
                <img src="${item.image}" alt="${item.name}" class="img-fluid">
                <h3>${item.name}</h3>
                <p>${item.description}</p>
                <p class="price">$${item.price}</p>
                <button onclick="addToCart(${item.id})" class="btn btn-outline-gold w-100">
                    <i class="fas fa-plus me-2"></i>Add to Selection
                </button>
            </div>
        `;
        menuContainer.appendChild(menuItem);
    });
}

// Cart Functions
function addToCart(itemId) {
    const item = menuItems.find(item => item.id === itemId);
    cart.push(item);
    updateCart();
    
    // Show addition animation
    showNotification(`${item.name} added to selection`);
}

function removeFromCart(index) {
    const removedItem = cart[index];
    cart.splice(index, 1);
    updateCart();
    
    // Show removal animation
    showNotification(`${removedItem.name} removed from selection`);
}

function updateCart() {
    const cartItems = document.getElementById('cart-items');
    const cartTotal = document.getElementById('cart-total');
    
    cartItems.innerHTML = '';
    let total = 0;

    cart.forEach((item, index) => {
        total += item.price;
        const cartItem = document.createElement('div');
        cartItem.className = 'cart-item mb-2';
        cartItem.innerHTML = `
            <span>${item.name} - $${item.price}</span>
            <button onclick="removeFromCart(${index})" class="btn btn-outline-danger btn-sm ms-2">
                <i class="fas fa-times"></i>
            </button>
        `;
        cartItems.appendChild(cartItem);
    });

    cartTotal.innerHTML = `<div class="total mt-3 fw-bold">Total: $${total}</div>`;
}

// Utility Functions
function showNotification(message) {
    const notification = document.createElement('div');
    notification.className = 'notification';
    notification.textContent = message;
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.remove();
    }, 3000);
}

function proceedToReservation() {
    const selectedItems = cart.map(item => item.name).join(', ');
    localStorage.setItem('selectedDishes', selectedItems);
    window.location.href = 'reservation.html';
}

// Event Listeners
document.addEventListener('DOMContentLoaded', () => {
    displayMenu();
    if (document.getElementById('map')) {
        initMap();
    }
    
    // Filter buttons event listeners
    const filterButtons = document.querySelectorAll('[onclick^="filterMenu"]');
    filterButtons.forEach(button => {
        button.addEventListener('click', (e) => {
            filterButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');
        });
    });
});

document.addEventListener('DOMContentLoaded', function() {
    // Set minimum date to today
    const dateInput = document.getElementById('date');
    const today = new Date().toISOString().split('T')[0];
    dateInput.min = today;

    // Load any selected dishes from menu
    const selectedDishes = localStorage.getItem('selectedDishes');
    if (selectedDishes) {
        const requests = document.getElementById('requests');
        requests.value = `Selected dishes: ${selectedDishes}`;
    }

    document.getElementById('reservationForm').addEventListener('submit', function(e) {
        e.preventDefault();
        
        const formData = {
            date: document.getElementById('date').value,
            time: document.getElementById('time').value,
            guests: document.getElementById('guests').value,
            name: document.getElementById('name').value,
            email: document.getElementById('email').value,
            phone: document.getElementById('phone').value,
            requests: document.getElementById('requests').value
        };

        showConfirmation(formData);
        
        // Clear selected dishes from storage
        localStorage.removeItem('selectedDishes');
    });
});

function showConfirmation(data) {
    const modal = document.createElement('div');
    modal.className = 'reservation-confirmation';
    modal.innerHTML = `
        <div class="confirmation-content">
            <h2>Reservation Confirmed!</h2>
            <p>Thank you, ${data.name}!</p>
            <p>Your reservation details:</p>
            <ul>
                <li>Date: ${data.date}</li>
                <li>Time: ${data.time}</li>
                <li>Guests: ${data.guests}</li>
            </ul>
            <p>A confirmation email has been sent to ${data.email}</p>
            <button onclick="window.location.href='webbsida.html'" class="btn btn-outline-gold">Return to Home</button>
        </div>
    `;
    document.body.appendChild(modal);
}
function filterMenu(category) {
    const menuItems = document.querySelectorAll('.menu-item');
    const buttons = document.querySelectorAll('.menu-options button');

    // Update active button
    buttons.forEach(button => {
        button.classList.remove('active');
        if (button.textContent.toLowerCase().includes(category)) {
            button.classList.add('active');
        }
    });

    // Filter menu items
    menuItems.forEach(item => {
        if (category === 'all' || item.dataset.category === category) {
            item.style.display = 'block';
        } else {
            item.style.display = 'none';
        }
    });
}

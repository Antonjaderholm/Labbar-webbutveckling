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


// Select all card elements
const cards = document.querySelectorAll('.card');

// Add click event listener to each card
cards.forEach(card => {
    card.addEventListener('click', function () {
        // First remove active class from all cards
        cards.forEach(c => {
            c.classList.remove('active');
        });

        // Add active class to clicked card
        this.classList.add('active');

        // Identify the type of card using its class
        const cardType = this.classList[1]; // e.g., 'admission', 'students', etc.

        // Navigate based on card type
        switch (cardType) {
            case 'admission':
                window.location.href = 'admission.html';
                break;
            case 'students':
                window.location.href = 'student.html';
                break;
            case 'fees':
                window.location.href = 'fees.html';
                break;
            case 'payment':
                window.location.href = 'payment.html';
                break;
            // Add more cases here if needed for other cards
            default:
                console.log(`${this.querySelector('h3').textContent} card clicked`);
        }
    });
});

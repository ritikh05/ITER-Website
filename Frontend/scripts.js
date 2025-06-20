document.addEventListener('DOMContentLoaded', function () {
    const userIdInput = document.getElementById('userId');
    const passwordInput = document.getElementById('password');  // Corrected from 'dob'
    const loginBtn = document.getElementById('loginBtn');

    // Login button functionality
    loginBtn.addEventListener('click', function () {
        if (!userIdInput.value.trim()) {
            alert('Please enter your Registration number');
            return;
        }

        if (!passwordInput.value.trim()) {
            alert('Please enter your Password');
            return;
        }

        // Simulate login and redirect
        console.log('Login attempt with:', userIdInput.value, passwordInput.value);
        window.location.href = "dashboard.html";
    });
});

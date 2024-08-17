document.addEventListener('DOMContentLoaded', function() {
    const loginForm = document.getElementById('login-form');
    const loginError = document.getElementById('login-error');

    loginForm.addEventListener('submit', function(event) {
        event.preventDefault();
        const username = document.getElementById('username').value;
        const password = document.getElementById('password').value;

        const users = JSON.parse(localStorage.getItem('users')) || [];
        const user = users.find(user => user.username === username && user.password === password);

        if (user) {
            localStorage.setItem('loggedInUser', JSON.stringify(user));
            window.location.href = 'index.html'; // Redirect to dashboard
        } else {
            loginError.textContent = 'Invalid username or password';
        }
    });
});

document.addEventListener('DOMContentLoaded', function() {
    const registerForm = document.getElementById('register-form');
    const registerError = document.getElementById('register-error');

    registerForm.addEventListener('submit', function(event) {
        event.preventDefault();
        const username = document.getElementById('register-username').value;
        const password = document.getElementById('register-password').value;

        let users = JSON.parse(localStorage.getItem('users')) || [];
        if (users.find(user => user.username === username)) {
            registerError.textContent = 'Username already exists';
            return;
        }

        users.push({ username, password });
        localStorage.setItem('users', JSON.stringify(users));
        window.location.href = 'login.html';
    });
});

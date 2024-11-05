document.addEventListener('DOMContentLoaded', (event) => {
    checkUserLoggedIn();
});

function checkUserLoggedIn() {
    const isLoggedIn = localStorage.getItem('isLoggedIn');
    if (!isLoggedIn) {
        showLoginModal();
    } else {
        document.getElementById('mainContent').style.display = 'block';
    }
}

function showLoginModal() {
    document.getElementById('loginModal').style.display = 'block';
}

function showSignUp() {
    document.getElementById('loginModal').style.display = 'none';
    document.getElementById('signUpModal').style.display = 'block';
}

function showLogin() {
    document.getElementById('signUpModal').style.display = 'none';
    document.getElementById('loginModal').style.display = 'block';
}

function closeModal() {
    document.getElementById('loginModal').style.display = 'none';
    document.getElementById('signUpModal').style.display = 'none';
    document.getElementById('mainContent').style.display = 'block';
    localStorage.setItem('isLoggedIn', 'true');
}

document.getElementById('loginForm').addEventListener('submit', function(event) {
    event.preventDefault();
    closeModal();
});

document.getElementById('signUpForm').addEventListener('submit', function(event) {
    event.preventDefault();
    closeModal();
});

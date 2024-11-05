document.getElementById('profile-form').addEventListener('submit', function(e) {
    e.preventDefault();
    
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const phone = document.getElementById('phone').value;
    const address = document.getElementById('address').value;
    const city = document.getElementById('city').value;
    const pincode = document.getElementById('pincode').value;

    fetch('/update-profile', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: new URLSearchParams({ name, email, phone, address, city, pincode, username: 'currentUsername' })
    })
    .then(res => res.text())
    .then(data => alert(data))
    .catch(err => console.error(err));
});

document.addEventListener("DOMContentLoaded", function() {
    const form = document.getElementById('profile-form');
    const HomeButton = document.getElementById('Home-button');
    const saveButton = document.getElementById('save-button');

HomeButton.addEventListener('click', function() {
    window.location.href = 'index.html';
});

saveButton.addEventListener('click', function() {
    const inputs = form.querySelectorAll('input');
    inputs.forEach(input => input.disabled = false);
    editButton.style.display = 'none';
    saveButton.style.display = 'inline-block';
});

form.addEventListener('submit', function(event) {
    event.preventDefault();
    const inputs = form.querySelectorAll('input');
    inputs.forEach(input => input.disabled = true);
    editButton.style.display = 'inline-block';
    saveButton.style.display = 'none';
    console.log("Profile saved!");
});
});

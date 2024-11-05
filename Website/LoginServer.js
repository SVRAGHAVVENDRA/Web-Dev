const express = require('express');
const bcrypt = require('bcryptjs');
const mysql = require('mysql2');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));

// MySQL connection
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'yourpassword',
    database: 'yourdatabase'
});

db.connect((err) => {
    if (err) {
        console.log('Error connecting to MySQL', err);
    } else {
        console.log('Connected to MySQL');
    }
});

// Signup route
app.post('/signup', async (req, res) => {
    const { newUsername, newPassword } = req.body;
    const hashedPassword = await bcrypt.hash(newPassword, 8);

    db.query('INSERT INTO users (username, password) VALUES (?, ?)', [newUsername, hashedPassword], (err, result) => {
        if (err) throw err;
        res.send('User signed up successfully');
    });
});

// Login route
app.post('/login', (req, res) => {
    const { username, password } = req.body;

    db.query('SELECT * FROM users WHERE username = ?', [username], async (err, results) => {
        if (err) throw err;

        if (results.length === 0) {
            return res.status(400).send('User not found');
        }

        const user = results[0];
        const isMatch = await bcrypt.compare(password, user.password);

        if (isMatch) {
            res.send('Login successful');
        } else {
            res.status(400).send('Invalid credentials');
        }
    });
});

// Profile update route
app.post('/update-profile', (req, res) => {
    const { name, email, phone, address, city, pincode, username } = req.body;

    db.query('UPDATE user_profiles SET name = ?, email = ?, phone = ?, address = ?, city = ?, pincode = ? WHERE user_id = (SELECT user_id FROM users WHERE username = ?)', 
    [name, email, phone, address, city, pincode, username], (err, result) => {
        if (err) throw err;
        res.send('Profile updated successfully');
    });
});

// Start the server
app.listen(3000, () => {
    console.log('Server running on port 3000');
});

res.send('Profile updated successfully');

const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = 3000;

app.use(bodyParser.json());
app.use(express.static('public'));

let cart = [];

app.post('/buy', (req, res) => {
    const { product } = req.body;
    // Handle buy logic
    console.log(`Buying product: ${product}`);
    // Redirect to buy confirmation page
    res.redirect('/buy-confirmation.html');
});

app.post('/add-to-cart', (req, res) => {
    const { product } = req.body;
    cart.push(product);
    console.log(`Added ${product} to cart`);
    // Redirect to cart page
    res.redirect('/cart.html');
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}/`);
});

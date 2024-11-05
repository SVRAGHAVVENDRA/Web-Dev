const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = 3000;

// Dummy data for products
const products = [
    { name: 'Apple', price: 1.00, stock: 100, image: 'apple.jpg', url: '/products/apple' },
    { name: 'Banana', price: 0.50, stock: 150, image: 'banana.jpeg', url: '/products/banana' },
    { name: 'Rice', price: 2.00, stock: 200, image: 'rice.avif', url: '/products/rice' },
    { name: 'Wheat', price: 1.50, stock: 180, image: 'wheat.jpeg', url: '/products/wheat' }
];

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Serve static files (like your HTML, CSS, and client-side JavaScript)
app.use(express.static('public'));

// Search endpoint
app.post('/search', (req, res) => {
    const query = req.body.query.toLowerCase();
    const result = products.find(product =>
        product.name.toLowerCase() === query
    );
    if (result) {
        res.json({ success: true, url: result.url });
    } else {
        res.json({ success: false, message: 'Product not found' });
    }
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});

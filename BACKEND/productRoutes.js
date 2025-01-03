const express = require('express');
const authenticateJWT = require('./authMiddleware');

const products = [
    { id: 1, name: 'Product A', price: 9.99, category: 'Books' },
    { id: 2, name: 'Product B', price: 19.99, category: 'Games' },
    { id: 3, name: 'Product C', price: 29.99, category: 'Electronics' }
];

module.exports = (app) => {
    app.get('/products', authenticateJWT, (req, res) => {
        res.json(products);
    });
};
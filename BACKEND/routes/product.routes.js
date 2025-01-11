const { checkJwt } = require('./authMiddleware.js');

module.exports = app => {
    const products = require("../controllers/product.controllers.js");

    let router = require("express").Router();



    router.get("/", checkJwt, products.get);

    app.use('/api/products', router);
};
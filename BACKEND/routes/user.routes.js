const { checkJwt } = require('./authMiddleware.js');

module.exports = app => {
    const user = require("../controllers/user.controllers.js");
    let router = require("express").Router();
    router.post('/add', user.addUser);
    router.post("/login", user.login);
    router.put("/update", checkJwt, user.updateUser);
    router.get("/get", checkJwt, user.getUser);

    app.use('/api/user', router);
};
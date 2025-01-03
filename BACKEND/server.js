const express = require("express");
const cors = require("cors");
const { createProxyMiddleware } = require('http-proxy-middleware');
const exec = require("child_process").exec;
const utilisateurControllers = require("./user.controllers");
const productRoutes = require('./productRoutes');

exec("cd FRONTEND && my-angular-app && ng serve");

const app = express();

// CORS options setup
const corsOptions = {
    origin: "http://localhost:4200",
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    headers: "Content-Type, Authorization",
    exposedHeaders: "Authorization",
};

// Apply JSON and URL-encoded middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Apply CORS middleware
app.use(cors(corsOptions));

// Routes for products and user controllers
app.use('/api', productRoutes);
app.post("/api/login", utilisateurControllers.login);
app.post("/api/register", utilisateurControllers.register);
app.post("/api/disconnect", utilisateurControllers.disconnect);
app.post("/api/updateProfil", utilisateurControllers.updateProfil);

// Finally, setup the proxy middleware at the end of all routes
app.use('*', createProxyMiddleware({
    target: 'http://localhost:4200',
    changeOrigin: true,
    logLevel: 'debug' // Adding debug logs can help diagnose issues with the proxy.
}));

// Start the server
const port = 3000;
app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});
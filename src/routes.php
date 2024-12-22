<?php
use Slim\Routing\RouteCollectorProxy;

$app->group('/api', function (RouteCollectorProxy $group) {
    $group->post('/login', 'AuthController:login');
    $group->get('/users', 'UserController:getUsers');
    $group->post('/users', 'UserController:createUser');  // Correction ici, remplacez `$app` par `$group`
    $group->put('/users/{id}', 'UserController:updateUser');  // Correction ici, remplacez `$app` par `$group`
    $group->get('/products', 'ProductController:getProducts');
});

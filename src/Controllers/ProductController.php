public function getProducts(Request $request, Response $response) {
    $products = Product::getAll(); // Méthode statique pour récupérer tous les produits
    $response->getBody()->write(json_encode($products));
    return $response->withHeader('Content-Type', 'application/json')->withStatus(200);
}

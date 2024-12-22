public function createUser(Request $request, Response $response) {
    $data = $request->getParsedBody();
    $user = new User($data['id'], $data['username'], $data['password'], $data['email']);
    // Logique pour enregistrer l'utilisateur dans la base de données
    $response->getBody()->write(json_encode(["message" => "Utilisateur créé avec succès"]));
    return $response->withHeader('Content-Type', 'application/json')->withStatus(201);
}
public function updateUser(Request $request, Response $response, array $args) {
    $id = $args['id'];  // L'ID de l'utilisateur à modifier
    $data = $request->getParsedBody();
    $user = User::findById($id); // Trouver l'utilisateur par ID
    if ($user) {
        $user->username = $data['username'];
        $user->email = $data['email'];
        // Logique pour mettre à jour l'utilisateur dans la base de données
        $response->getBody()->write(json_encode(["message" => "Utilisateur mis à jour"]));
    } else {
        $response->getBody()->write(json_encode(["message" => "Utilisateur non trouvé"]));
    }
    return $response->withHeader('Content-Type', 'application/json')->withStatus(200);
}

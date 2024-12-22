<?php
namespace Controllers;

use Psr\Http\Message\ResponseInterface as Response;
use Psr\Http\Message\ServerRequestInterface as Request;
use Models\User; // Assurez-vous que le modèle User est bien implémenté
use Firebase\JWT\JWT;

class AuthController {
    public function login(Request $request, Response $response) {
        $data = $request->getParsedBody();
        $username = $data['username'];
        $password = $data['password'];

        $user = User::findByUsername($username); // Supposons que vous avez une méthode pour chercher les utilisateurs par leur nom d'utilisateur

        if (!$user) {
            $response->getBody()->write(json_encode(['message' => 'Utilisateur non trouvé']));
            return $response->withHeader('Content-Type', 'application/json')->withStatus(404);
        }

        if (password_verify($password, $user->password)) { // Assurez-vous que les mots de passe sont stockés de manière sécurisée
            $secretKey  = "VotreCléSecrète"; // Utilisez une clé mieux sécurisée et stockez-la à l'abri
            $issuedAt   = new \DateTimeImmutable();
            $expire     = $issuedAt->modify('+6 hours')->getTimestamp(); // La validité du token
            $serverName = "your.domain.com"; // Mettez le nom de votre serveur

            $data = [
                'iat'  => $issuedAt->getTimestamp(),         // Quand le token a été généré
                'iss'  => $serverName,                       // Émetteur
                'nbf'  => $issuedAt->getTimestamp(),         // Token actif depuis (not before)
                'exp'  => $expire,                           // Date d'expiration
                'data' => [                                  // Données incorporées dans le JWT
                    'userId'   => $user->id,
                    'username' => $user->username
                ]
            ];

            $jwt = JWT::encode($data, $secretKey, 'HS256');
            $response->getBody()->write(json_encode(['token' => $jwt]));
            return $response->withHeader('Content-Type', 'application/json')->withStatus(200);
        } else {
            $response->getBody()->write(json_encode(['message' => 'Mot de passe incorrect']));
            return $response->withHeader('Content-Type', 'application/json')->withStatus(401);
        }
    }
}

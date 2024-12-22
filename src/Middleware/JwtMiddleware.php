<?php
use Psr\Http\Message\ServerRequestInterface as Request;
use Psr\Http\Server\RequestHandlerInterface as RequestHandler;
use Slim\Psr7\Response;
use Firebase\JWT\JWT;

class JwtMiddleware {
    public function __invoke(Request $request, RequestHandler $handler): Response {
        $response = $handler->handle($request);
        return $response;
    }
}

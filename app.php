<?php

use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;

require_once 'vendor/autoload.php';

const HARDCODED_APPLICATION_TOKEN = "e4d909c290d0fb1ca068ffaddf22cbd0";

$app = new Silex\Application();

$app->post('/auth', function (Request $request) {

    $authHeader = $request->headers->get('Authorization');

    $body = json_decode($request->getContent());

    if ($body == null || !isset($body->applicationToken)) {
        return new Response('JSON not valid', 404);
    }

    if ($authHeader != sha1($body->applicationToken)) {
        return new Response('Authorization header is not valid', 403);
    }

    if ($body->applicationToken != HARDCODED_APPLICATION_TOKEN) {
        return new Response('Application token is not valid', 403);
    }

    return new JsonResponse(['clientToken' => sha1(uniqid('', true))], 200);

});

$app->after(function (Request $request, Response $response) {
    $response->headers->set('Access-Control-Allow-Origin', '*');
});

$app->run();
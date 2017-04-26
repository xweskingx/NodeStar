<?php


require __DIR__ . '/vendor/autoload.php';

$provider = new Stevenmaguire\OAuth2\Client\Provider\Keycloak([
    'authServerUrl'         => 'http://' . $_SERVER[HTTP_HOST] . ':8080/auth',
    'realm'                 => 'NodeStar',
    'clientId'              => 'NodeStar',
    'clientSecret'          => '14df1a2c-ba38-4201-862b-44c3215feff3',
    'redirectUri'           => 'http://' . $_SERVER[HTTP_HOST],
]);

$authUrl = $provider->getLogoutUrl();
$_SESSION['oauth2state'] = $provider->getState();
header('Location: '.$authUrl);
?>


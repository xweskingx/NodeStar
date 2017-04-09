<?php
/*
 * Landing page and initial authentication redirect.
 *
 * @Author Mark Boger
 * @Author Wesley King
 */
require __DIR__ . '/vendor/autoload.php';
require_once('NodeStar/DBConnector.php');
require_once('NodeStar/SchemaGen.php');

use NodeStar\DB\Connector;
use NodeStar\Schema\SchemaGen;

$provider = new Stevenmaguire\OAuth2\Client\Provider\Keycloak([
    'authServerUrl'         => 'http://' . $_SERVER[HTTP_HOST] . ':8080/auth',
    'realm'                 => 'NodeStar',
    'clientId'              => 'NodeStar',
    'clientSecret'          => '14df1a2c-ba38-4201-862b-44c3215feff3',
    'redirectUri'           => 'http://' . $_SERVER[HTTP_HOST],
]);

if (!isset($_GET['code'])) {


    // If we don't have an authorization code then get one
    $authUrl = $provider->getAuthorizationUrl();
    $_SESSION['oauth2state'] = $provider->getState();
    header('Location: '.$authUrl);
    exit;


/*
 * Breaks authentication
// Check given state against previously stored one to mitigate CSRF attack
 } elseif (empty($_GET['state']) || ($_GET['state'] !== $_SESSION['oauth2state'])) {

    unset($_SESSION['oauth2state']);
    exit('Invalid state, make sure HTTP sessions are enabled.');
 */
} else {

    // Try to get an access token (using the authorization coe grant)
    try {
        $token = $provider->getAccessToken('authorization_code', [
            'code' => $_GET['code']
        ]);
    } catch (Exception $e) {
        exit('Failed to get access token: '.$e->getMessage());
    }

    // Optional: Now you have a token you can look up a users profile data
    try {

        // We got an access token, let's now get the user's details
        $user = $provider->getResourceOwner($token);

        // Use these details to create a new profile
        printf('Hello %s!', $user->getName());

    } catch (Exception $e) {
        exit('Failed to get resource owner: '.$e->getMessage());
    }

    // Use this to interact with an API on the users behalf
    echo $token->getToken();


    $c = new Connector('db', 'nodestar', 'nodestar', 'nodestar', 'nodestar');
    $s = new SchemaGen($c);
    $c->create();

    $c->place_node('mnist', '/templates/mnist.py');
    $c->place_node('softmax', '/templates/softmax.py');
    $c->place_node('dense', '/templates/dense.py');
    $c->place_node('output', '/templates/output.py');


    echo $s->make_network('{ "network" : ["mnist", "dense", "softmax", "output"]}');
}

?>

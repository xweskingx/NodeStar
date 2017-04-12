<?php

function reloadPage() {
  header('Location: '.$_SERVER['REQUEST_URI']);
}

require __DIR__ . '/vendor/autoload.php';

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
      reloadPage();
    }

    // Optional: Now you have a token you can look up a users profile data
    try {
        // We got an access token, let's now get the user's details
        $user = $provider->getResourceOwner($token);
    } catch (Exception $e) {
      reloadPage();
    }
}
?>


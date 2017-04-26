<?php
/*
 * Landing page and initial authentication redirect.
 *
 * @Author Mark Boger
 * @Author Wesley King
 */
/* require __DIR__ . '/vendor/autoload.php'; */
require_once('DBConnector.php');
require_once('SchemaGen.php');

use NodeStar\DB\Connector;
use NodeStar\Schema\SchemaGen;

$c = new Connector('db', 'nodestar', 'nodestar', 'nodestar', 'nodestar');
$s = new SchemaGen($c);

echo $s->make_network($_POST['network']);
?>

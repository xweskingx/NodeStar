<?php
/*
 * Pass the constructed network to the shema gen
 *
 * @Author Mark Boger
 * @Author Wesley King
 */
require_once('connector/DBConnector.php');
require_once('gen/SchemaGen.php');

use NodeStar\DB\Connector;
use NodeStar\Schema\SchemaGen;

$c = new Connector('db', 'nodestar', 'nodestar', 'nodestar', 'nodestar');

$c->place_node('start', '/templates/start.py');
$c->place_node('end', '/templates/end.py');

$s = new SchemaGen($c);

echo $s->make_network($_POST['network']);
?>

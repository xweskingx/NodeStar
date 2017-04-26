<?php
require_once('connector/DBConnector.php');
require_once('gen/SchemaGen.php');

use NodeStar\DB\Connector;
use NodeStar\Schema\SchemaGen;

$c = new Connector('db', 'nodestar', 'nodestar', 'nodestar', 'nodestar');
$s = new SchemaGen($c);

echo $s->load_schema($_POST);
?>

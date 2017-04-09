<?php
/*
 * Main file, this is mostly acting just as a way to help test that functions
 * are behaving as expected with buttons
 *
 * @Author Mark Boger
 */
require_once('NodeStar/DBConnector.php');
require_once('NodeStar/SchemaGen.php');

use NodeStar\DB\Connector;
use NodeStar\Schema\SchemaGen;

//
$c = new Connector('db', 'nodestar', 'nodestar', 'nodestar', 'nodestar');

$s = new SchemaGen($c);
$c->delete();
$c->create();

$c->place_node('huh', '/templates/test.py');
echo $c->list_nodes();
echo $c->get_node('huh');

?>

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

$c->place_node('mnist', '/templates/mnist.py');
$c->place_node('softmax', '/templates/softmax.py');
$c->place_node('dense', '/templates/dense.py');
$c->place_node('output', '/templates/output.py');

echo $s->make_network('{ "network" : ["mnist", "dense", "softmax", "output"]}');
?>

<?php
/*
 * Main file, this is mostly acting just as a way to help test that functions
 * are behaving as expected with buttons
 *
 * @Author Mark Boger
 */
require_once('NodeStar/DBConnector.php');

use NodeStar\DB\Connector;

$c = new Connector('db', 'nodestar', 'nodestar', 'nodestar', 'nodestar');

$c->create();

$hmm = $c->get_node("fasd");
$heh = $c->list_nodes();

echo $heh;
echo "<br/>";
echo $hmm;
?>

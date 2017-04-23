<?php

namespace NodeStar\connector;

/**
 * Interface SchemaConnector
 *
 * Any connectors should be made using this interface to ensure that the
 * SchemaGen class is able to use the passed connector
 *
 * @author Mark Boger
 */
interface SchemaConnector {
    public function get_node(String $node_name);

    public function place_node(String ...$params);

    public function list_nodes();
}

?>

<?php
namespace NodeStar\Schema;

class SchemaGen {

    private $conn;

    public function __construct($connector) {
        // Doing it this way so that we can just change the connector
        // if we need to
        $this->conn = $connector;
    }

    public function make_network($json) {
        $decoded = json_decode($json);
        $all     = '';

        foreach($decoded->network as $layer) {
            $all .= $this->conn->get_node($layer);
        }

        return $all;
    }

    public function get_nodes() {
        return json_encode($this->conn->list_nodes());
    }

    public function add_node() {

    }
}

?>

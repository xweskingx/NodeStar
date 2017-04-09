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

    }
}

?>

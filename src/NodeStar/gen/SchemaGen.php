<?php
namespace NodeStar\Schema;
require_once(__DIR__.'/../connector/IConnector.php');

class SchemaGen {

    private $conn;

    public function __construct($connector) {
        // Doing it this way so that we can just change the connector
        // if we need to
        if(!($connector instanceof \NodeStar\connector\SchemaConnector)){
            throw new \Exception('Connector must implement SchemaConnector');
        }
        $this->conn = $connector;
    }

    public function make_network($json) {
        $all     = '';

        foreach($json as $layer) {
            $all .= $this->conn->get_node($layer);
        }

        return json_encode("{schema : {$all} }");
    }

    public function get_nodes() {
        return json_encode($this->conn->list_nodes());
    }

    public function add_node() {

    }
}

?>

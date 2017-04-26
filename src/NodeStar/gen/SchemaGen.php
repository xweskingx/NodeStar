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
        $all = '';

        foreach($json as $network) {
            foreach ($network as $layer => $values) {
                $l_str = $this->conn->get_node($layer);
                $all  .= $this->insert_options($l_str, $values);
            }
        }

        return $all;
    }

    private function insert_options($string, $opts) {
        $repl = '';

        $patterns = [
            '/INPUT_DIMS/',
            '/OUTPUT_DIMS/',
            '/INPUT_TYPE/',
            '/OUTPUT_TYPE/'
        ];

        return preg_replace($patterns, $opts, $string);
    }

    public function get_nodes() {
        return json_encode($this->conn->list_nodes());
    }

    public function save_schema($schema) {
        $save_file = hash('tiger192,3', schema['name']);

        $log = fopen("log.log", "w");

        $f = fopen('/templates/'.$save_file, "w");

        fwrite($f, json_encode($schema['network']));
        fwrite($log, json_encode($schema));
        fclose($f);
        fclose($log);

        $this->conn->place_node($schema['name'], $save_file);
    }

    public function load_schema($name) {
        return json_encode($this->conn->get_node($name));
    }
}

?>

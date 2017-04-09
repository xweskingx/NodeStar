<?php
namespace NodeStar\DB;

class Connector {

    private $conn     = null;
    private $db_addr  = '';
    private $db_user  = '';
    private $db_pass  = '';
    private $db_name  = '';
    private $db_table = '';


    public function __construct($db_addr, $db_user, $db_pass, $db_name, $db_table) {

        $this->db_addr  = $db_addr;
        $this->db_user  = $db_user;
        $this->db_pass  = $db_pass;
        $this->db_name  = $db_name;
        $this->db_table = $db_table;
        $this->conn     = $this->connect($db_addr, $db_user, $db_pass, $db_name);
        }

    private function connect($db_addr, $db_user, $db_pass, $db_name) {

        $connection = new \mysqli($db_addr, $db_user, $db_pass, $db_name);

        if($connection->connect_error) {
            throw new \Exception($connection->error());
        }

        return $connection;
    }

    private function con_do($sql) {
        $res = $this->conn->query($sql);

        if(!$res) {
            throw new \Exception($this->conn->error);
        }

        return $res;
    }

    public function use_table($db_table) {
        $this->db_table = $db_table;
    }

    public function create() {
        $this->con_do("create table if not exists {$this->db_table}" .
            " (name varchar(20), " .
            " file_path varchar(100))");
    }

    public function delete() {
        $this->con_do("drop table {$this->db_table}");
    }

    public function place_node(String ...$params) {
        $temp_arr = [];

        foreach ($params as $param) {
            // Need to place single quotes arround everything
            array_push($temp_arr, "'{$param}'");
        }

        $param_str = implode(', ', $temp_arr);

        $this->con_do("insert into {$this->db_table} (name, file_path)" .
            " values ({$param_str})");
    }

    public function list_nodes() {
        $q_res = $this->con_do("select name from {$this->db_name}");
        $r_str = '';

        while($node = $q_res->fetch_assoc()) {
            $r_str .= $node["name"] . " ";
        }

        return $r_str;
    }

    public function get_node($node_name) {
        $q_res = $this->con_do("select * from {$this->db_name}".
            " where name='{$node_name}'")->fetch_assoc();

        $f_path = $q_res["file_path"];

        $file = fopen($f_path, "r");

        $template = fread($file, filesize($f_path));

        fclose($file);

        return $template;
    }

    function __invoke($node_name) {
        return $this->get_node($node_name);
    }

}
?>

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
            " (name varchar(20), id int primary key not null auto_increment)");
    }

    public function delete() {
        $this->con_do("drop table {$this->db_table}");
    }

    public function place_node($params) {
        $this->con_do("insert into {$this->db_table} (name) values ('{$params}')");
    }

    private function name_op($sql) {
        $q_res = $this->con_do($sql);
        $r_str = '';

        while($node = $q_res->fetch_assoc()) {
            $r_str .= $node["name"] . " ";
        }

        return $r_str;
    }

    public function list_nodes() {
        return $this->name_op("select name from {$this->db_name}");
    }

    public function get_node($node_name) {
        return $this->name_op("select * from {$this->db_name}".
            " where name='{$node_name}'");
    }

    function __invoke($node_name) {
        return $this->get_node($node_name);
    }

}
?>

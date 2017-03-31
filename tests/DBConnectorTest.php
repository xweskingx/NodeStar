<?php
use PHPUnit\Framework\TestCase;

class DBConnectorTest extends TestCase {

    var $USER = 'nodestar';
    var $PASS = 'nodestar';
    var $DB   = 'nodestar';
    var $ADDR = 'db';

    public function getConnect() {
        $sql = new mysqli($ADDR, $USER, $PASS, $DATA);
    }
}

?>

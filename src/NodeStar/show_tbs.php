<?php

$servername = "db";
$username   = "nodestar";
$password   = "nodestar";
$dbname     = "nodestar";

$conn = new mysqli($servername, $username, $password, $dbname);

if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

$show = "SHOW TABLES";
$result = $conn->query($show);
echo "<h1>Tables:</h1>";
while($tableName = $result->fetch_row())
{
    $table = $tableName[0];
    echo '<h3>' ,$table, '</h3>';
    $result2 = $conn->query("SHOW COLUMNS from ".$table.""); //$result2 = conn_query($table, 'SHOW COLUMNS FROM') or die("cannot show columns");
    if($result2)
    {
        echo '<table class "db-table">';
        echo '<tr><th>Field</th><th>Type</th><th>Null</th><th>Key</th><th>Default</th><th>Extra</th></tr>';
        while($row2 = $result2->fetch_row())
        {
            echo '<tr>';
            foreach ($row2 as $key=>$value)
            {
                echo '<td>',$value, '</td>';
            }
            echo '</tr>';
        }
        echo '</table><br />';
    }
}
?>

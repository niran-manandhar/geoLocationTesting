<?php
define('parentFile', 1);
require_once('db_include.php');

//	connect to the database
$mysql = mysql_connect(DATABASE_SERVER, DATABASE_USERNAME, DATABASE_PASSWORD) or die(mysql_error());

// select the database
mysql_select_db(DATABASE_NAME);


        $tempsql = "SELECT * from geomarkers order by id desc";
        $result  = mysql_query($tempsql);
        if (!$result) {

            $output = '{"RESULT": "FAILED"}';
        } else {

            $alldata       = array();

            while ($row = mysql_fetch_array($result)) {

				array_push($alldata, $row);

            }
}



            $output = '{"RESULT": "SUCCESS","DATA":' . json_encode($alldata) . '}';

    print($output);
?>

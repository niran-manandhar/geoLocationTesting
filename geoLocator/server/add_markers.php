<?php
define('parentFile', 1);
require_once('db_include.php');

//	connect to the database
$mysql = @mysql_connect(DATABASE_SERVER, DATABASE_USERNAME, DATABASE_PASSWORD) or die(mysql_error());

// select the database
mysql_select_db(DATABASE_NAME);




$name=mysql_real_escape_string($_POST["name"]);
$address=mysql_real_escape_string($_POST["address"]);
$lat=mysql_real_escape_string($_POST["lat"]);
$lng=mysql_real_escape_string($_POST["lng"]);
$type=mysql_real_escape_string($_POST["type"]);
$image='12.jpg';

      			$tempsql = "INSERT INTO `geomarkers` ( `name`, `address`, `lat`, `lng`, `type`,image) VALUES ('$name',
'$address',
'$lat',
'$lng',
'$type','$image');";

			 $result  = mysql_query($tempsql);

			//	$new_msg_id=mysql_insert_id();
			 if (!$result) {
           $output = '{"RESULT": "FAILED"}'; }

         else {

				 $output = '{"RESULT": "SUCCESS"}';
            }




    print($output);
?>

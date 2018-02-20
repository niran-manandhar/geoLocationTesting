<?php
defined( 'parentFile' ) or die( 'You Can Not Access This File' );
/*stage
define( "DATABASE_SERVER", "localhost" );
define( "DATABASE_USERNAME", "root" );
define( "DATABASE_PASSWORD", "aa" );
define( "DATABASE_NAME", "niran_gmaps" );

*/


define( "DATABASE_SERVER", "localhost" );
define( "DATABASE_USERNAME", "niran_geolocal" );
define( "DATABASE_PASSWORD", "-@.JdKr5;iq)" );
define( "DATABASE_NAME", "niran_geolocation" );

/*

CREATE TABLE `geomarkers` (
  `id` INT NOT NULL AUTO_INCREMENT PRIMARY KEY ,
  `name` VARCHAR( 60 ) NOT NULL ,
  `address` VARCHAR( 80 ) NOT NULL ,
  `lat` FLOAT( 10, 6 ) NOT NULL ,
  `lng` FLOAT( 10, 6 ) NOT NULL ,
  `type` VARCHAR( 30 ) NOT NULL
) ENGINE = MYISAM ;

*/
?>

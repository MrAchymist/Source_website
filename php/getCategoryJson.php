<?php

/* Display debug informations, to remove on prod
ini_set('display_errors', '1');
ini_set('display_startup_errors', '1');
error_reporting(E_ALL);
*/

$json = json_decode(file_get_contents('../save/' . $_GET["category"] . '.json'));

echo json_encode($json);
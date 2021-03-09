<?php

/* Display debug informations, to remove on prod */
ini_set('display_errors', '1');
ini_set('display_startup_errors', '1');
error_reporting(E_ALL);

$infos = json_decode(file_get_contents('php://input'), true);
$json = json_encode($infos['Updated']);

file_put_contents("../../save/" . $infos['Channel'] . '.json', $json);
echo($json);
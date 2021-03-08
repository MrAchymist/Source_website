<?php

/* Display debug informations, to remove on prod
ini_set('display_errors', '1');
ini_set('display_startup_errors', '1');
error_reporting(E_ALL);
*/

$infos = json_decode(file_get_contents('php://input'), true);

$imagearray = array();

if (!file_exists("./save/" . $infos['channel'] . '.json')) {
    $nfile = new stdClass;
    array_push($imagearray, array('Sauce' => $infos['source'], 'Image' => $infos['image']));

    $nfile->Images = $imagearray;
    $nfile->Hellish = $infos['hell'];
    $enfile = json_encode($nfile);
    
    file_put_contents("./save/" . $infos['channel'] . '.json', $enfile);
}
else
{
    $json = json_decode(file_get_contents("./save/" . $infos['channel'] . '.json'), true);
    $imagearray = $json["Images"];
    
    array_push($imagearray, array('Sauce' => $infos['source'], 'Image' => $infos['image']));
    
    $json["Images"] = $imagearray;
    $newJson = json_encode($json);
    file_put_contents("./save/" . $infos['channel'] . '.json', $newJson);
}
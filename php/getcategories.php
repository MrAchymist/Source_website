<?php

$dirs = new DirectoryIterator('../save');
$allcategories = array();

foreach ($dirs as $fileinfo) {
    if (!$fileinfo->isDir() && !$fileinfo->isDot() && pathinfo($fileinfo)['extension'] === 'json') {
        array_push($allcategories, pathinfo($fileinfo)['filename']);
    }
}
sort($allcategories);
echo json_encode($allcategories);
<?php
require_once($_SERVER['DOCUMENT_ROOT'] . "/php/database_get_data.php");

$arr = json_decode(json_encode(get_all_user_projects($_GET["id"])));
$retrn = array();

if ($arr != null) {
for ($i = 0; $i < count($arr); $i++) { $ret=json_decode(get_project_by_id($arr[$i]->project_id));
    $id = $ret->project_name;

    if (!isset($retrn[$id])) {
    $retrn[$id] = 1; // Initialize count to 1 if project name not found in $retrn
    } else {
    $retrn[$id]++; // Increment count if project name already exists in $retrn
    }
    }
    }

    echo json_encode($retrn);
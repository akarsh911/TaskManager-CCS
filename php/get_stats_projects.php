<?php
require_once($_SERVER['DOCUMENT_ROOT'] . "/php/database_get_data.php");
$arr = array();
$arr = json_decode(json_encode(get_all_user_projects($_GET["id"])));
$retrn = new stdClass();
if ($arr != null)
    for ($i = 0; $i < count($arr); $i++) {
        $ret[$i] = json_decode(get_project_by_id($arr[$i]->project_id));
        $id = $ret[$i]->project_name;
        $retrn->$id++;
    }




echo json_encode($retrn);
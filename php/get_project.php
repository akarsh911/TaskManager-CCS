<?php
require_once($_SERVER['DOCUMENT_ROOT'] . "/php/database_get_data.php");
$arr = json_decode(get_project_by_id($_GET["id"]));
$id = $arr->team_leader;
$arr->team_leader = get_user_name($id);
echo json_encode($arr);
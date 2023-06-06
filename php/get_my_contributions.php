<?php
require_once($_SERVER['DOCUMENT_ROOT'] . "/php/database_get_data.php");
$arr = array();
$arr = json_decode(json_encode(get_user_contributions_by_user_id($_GET["id"])));
for ($i = 0; $i < count($arr); $i++) {
    $user = $arr[$i]->user_id;
    $user = json_decode(get_user_by_id($user));
    $project = json_decode(get_project_by_id($arr[$i]->project_id));
    $arr[$i]->user_name = $user->f_name . " " . $user->l_name;
    $arr[$i]->user_avatar = $user->avatar;
    $arr[$i]->project_name = $project->project_name;
}
echo json_encode($arr);
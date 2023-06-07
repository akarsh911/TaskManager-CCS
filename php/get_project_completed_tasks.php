<?php
require_once($_SERVER['DOCUMENT_ROOT'] . "/php/database_get_data.php");
$arr = array();

$arr = json_decode(json_encode(get_user_tasks_by_project_id($_GET["project_id"], 1)));
for ($i = 0; $i < count($arr); $i++) {
    $user = $arr[$i]->user_id;
    $user = json_decode(get_user_by_id($user));
    $project = json_decode(get_project_by_id($arr[$i]->project_id));
    $leader = json_decode(get_user_by_id($arr[$i]->leader_id));
    $arr[$i]->user_name = $user->f_name . " " . $user->l_name;
    $arr[$i]->avatar = $user->avatar;
    $arr[$i]->leader_name = $leader->f_name . " " . $leader->l_name;
    $arr[$i]->project_name = $leader->f_name . " " . $leader->l_name;
    switch ($arr[$i]->status) {
        case 0:
            $arr[$i]->progress = "Assigned";
            break;
        case 1:
            $arr[$i]->progress = "Completed";
            break;
    }
}
echo json_encode($arr);
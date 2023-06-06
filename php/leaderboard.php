<?php
require_once($_SERVER['DOCUMENT_ROOT'] . "/php/database_get_data.php");
$arr = array();
$arr = json_decode(json_encode(get_all_users()));

for ($i = 0; $i < count($arr); $i++) {
    $total = 0;
    $tasks = 0;
    $contributions = 0;
    $user_tasks = json_decode(json_encode(get_user_tasks_by_user_id($arr[$i]->id)));

    $user_contributions = json_decode(json_encode(get_user_contributions_by_user_id($arr[$i]->id)));
    if ($user_tasks != null) {
        for ($j = 0; $j < count($user_tasks); $j++) {
            if ($user_tasks[$j]->status == 1)
                $tasks++;
        }
    }
    if ($user_contributions != null) {
        $contributions = count($user_contributions);
    }

    $arr[$i]->tasks = $tasks;
    $arr[$i]->contributions = $contributions;
    $arr[$i]->total = $tasks + $contributions;
}

usort($arr, function ($a, $b) {
    return strcmp($b->total, $a->total);
});


echo json_encode($arr);
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
    if ($arr[$i]->id == $_GET["id"]) {
        $arr[$i]->f_name = "You";
        $arr[$i]->l_name = ".";
    }

}

usort($arr, function ($a, $b) {
    return strcmp($b->total, $a->total);
});

for ($i = 0; $i < count($arr); $i++) {
    $arr[$i]->position = $i + 1;
}

function get_pos($arr)
{
    for ($i = 0; $i < count($arr); $i++) {
        if ($arr[$i]->id == $_GET["id"]) {
            return $i;
        }
    }
}
$pos = get_pos($arr);
if ($pos < 5 || count($arr) <= 5)
    array_slice($arr, 0, 5);
else {
    $elem = $arr[$pos];
    array_slice($arr, 0, 4);
    $arr[5] = $elem;
}

echo json_encode($arr);
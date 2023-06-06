<?php
require_once($_SERVER['DOCUMENT_ROOT'] . "/php/database_get_data.php");

$retrn = new stdClass();
$assign = 0;
$compl = 0;

$user_tasks = json_decode(json_encode(get_user_tasks_by_user_id($_GET["id"])));
if ($user_tasks != null) {
    for ($j = 0; $j < count($user_tasks); $j++) {
        if ($user_tasks[$j]->status == 1)
            $compl++;
        if ($user_tasks[$j]->status == 0)
            $assign++;
    }
}


$retrn->completed = $compl;
$retrn->pending = $assign;

echo json_encode($retrn);
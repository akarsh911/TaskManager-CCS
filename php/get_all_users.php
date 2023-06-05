<?php
require_once($_SERVER['DOCUMENT_ROOT'] . "/php/database_get_data.php");
$arr=array();
$arr = json_decode(json_encode(get_all_users()));
for ($i = 0; $i < count($arr); $i++) {
    $u = $arr[$i]->user_state;
    if ($u == 1) {
        $arr[$i]->role = "Member";
    }
    if ($u == 2) {
        $arr[$i]->role = "Core";
    }
    if ($u == 3) {
        $arr[$i]->role = "Executive";
    }
    if ($u == 4) {
        $arr[$i]->role = "Site Admin";
    }
    $arr[$i]->joined_on=date("Y");
}
echo json_encode($arr);
<?php
require_once($_SERVER['DOCUMENT_ROOT'] . "/php/database_get_data.php");
$arr=array();
$arr= json_decode(get_projects()) ;
for($i=0;$i<count($arr);$i++)
{
    $id=$arr[$i]->team_leader;
    $arr[$i]->team_leader=get_user_name($id);
}
echo json_encode($arr);
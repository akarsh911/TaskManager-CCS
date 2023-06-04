<?php
require_once($_SERVER['DOCUMENT_ROOT'] . "/php/database_get_data.php");
$arr = get_all_users();
echo json_encode($arr);
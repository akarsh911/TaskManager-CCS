<?php
require_once($_SERVER['DOCUMENT_ROOT'] . "/php/database_get_data.php");
echo json_encode(get_all_project_users($_GET["id"]));
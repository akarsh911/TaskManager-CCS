<?php
require_once($_SERVER['DOCUMENT_ROOT'] . "/php/database_set_data.php");
change_task_status($_GET["id"], 0);
echo "<script>alert('Successfully Reassigned Task');</script>";
echo '<script>window.onload = (event) => {location.replace("../html/dashboard.html")};</script>';
<?php
require_once($_SERVER['DOCUMENT_ROOT'] . "/php/database_set_data.php");
mark_task_complete($_GET["id"]);
echo "<script>alert('Successfully Completed Task');</script>";
echo '<script>window.onload = (event) => {location.replace("../html/dashboard.html")};</script>';
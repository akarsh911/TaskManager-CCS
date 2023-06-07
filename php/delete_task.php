<?php
require_once($_SERVER['DOCUMENT_ROOT'] . "/php/database_set_data.php");
delete_task($_GET["id"]);
echo "<script>alert('Successfully Deleted Task');</script>";
echo '<script>window.onload = (event) => {location.replace("../html/dashboard.html")};</script>';
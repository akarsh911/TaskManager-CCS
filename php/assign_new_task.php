<?php
require_once($_SERVER['DOCUMENT_ROOT'] . "/php/database_set_data.php");
$user_id=$_POST["user_id"];
$project_id= $_POST["project_id"];
$leader_id = $_POST["leader_id"];
$title = $_POST["title"];
$description = $_POST["description"];
$deadline = $_POST["deadline"];
create_task($user_id,$project_id,$leader_id,$title,$description,0,$deadline);
echo "<script>alert('Success Adding Collaborator');</script>";
echo '<script>window.onload = (event) => {location.replace("../html/view_project.html?page=10&id=' . $project_id . '")};</script>';
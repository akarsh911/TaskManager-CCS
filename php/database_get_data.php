<?php
require_once($_SERVER['DOCUMENT_ROOT'] . "../php/database_connect.php");
function check_user_exists($email)
{
    $conn = openCon();
    $sql = "SELECT f_name FROM users WHERE email='$email' || ph_no='$email'";
    $result = $conn->query($sql);

    if ($result->num_rows > 0) {
        while ($row = $result->fetch_assoc()) {
            return 1;
        }
    } else {
        return 0;
    }
}
function get_user_name($user_id)
{
    $conn = openCon();
    $sql = "SELECT f_name,l_name FROM users WHERE id='$user_id' ";
    $result = $conn->query($sql);

    if ($result->num_rows > 0) {
        while ($row = $result->fetch_assoc()) {
            return $row["f_name"]." ". $row["l_name"];
        }
    } else {
        return 0;
    }
}
function get_user_state($email)
{
    $conn = openCon();
    $sql = "SELECT user_state FROM users WHERE email='$email' || ph_no='$email'";
    $result = $conn->query($sql);

    if ($result->num_rows > 0) {
        while ($row = $result->fetch_assoc()) {
            return $row['user_state'];
        }
    } else {
        return 0;
    }
}
function get_all_users()
{
    $conn = openCon();
    $sql = "SELECT * FROM users";
    $result = $conn->query($sql);
    $arr=array();$i=0;
    if ($result->num_rows > 0) {
        while ($row = $result->fetch_assoc()) {
            $arr[$i++]=$row;
        }
    } else {
        return 0;
    }
    return $arr;
}
function get_user_by_id($id)
{
    $conn = openCon();
    $sql = "SELECT * FROM users WHERE id='$id'";
    $result = $conn->query($sql);
    $arr = array();
    $i = 0;
    if ($result->num_rows > 0) {
        while ($row = $result->fetch_assoc()) {
            return $row;
        }
    } else {
        return 0;
    }
    return $arr;
}
function get_email($email)
{
    $conn = openCon();
    $sql = "SELECT email FROM users WHERE email='$email' || ph_no='$email'";
    $result = $conn->query($sql);
    if ($result->num_rows > 0) {
        while ($row = $result->fetch_assoc()) {
            return $row['email'];
        }
    } else {
        return 0;
    }
}
function get_key()
{
    $conn=openCon();; 
    $sql = "SELECT token FROM `keys` LIMIT 1";

    $result = $conn->query($sql);

    if ($result && $result->num_rows > 0) {
        $row = $result->fetch_assoc();
        return $row['token'];
    } else {
        return null;
    }
}
function get_projects()
{
    $conn=openCon();
    $sql = "SELECT * FROM projects";
    $result = $conn->query($sql);
    $projects = array();
    if ($result->num_rows > 0) {
        while ($row = $result->fetch_assoc()) {
            $projects[] = $row;
        }
    }
    return json_encode($projects);
}
function get_project_by_id($id)
{
    $conn = openCon();
    $sql = "SELECT * FROM projects WHERE id='$id'";
    $result = $conn->query($sql);
    $projects="";
    if ($result->num_rows > 0) {
        while ($row = $result->fetch_assoc()) {
            $projects = $row;
        }
    }
    return json_encode($projects);
}
function get_all_project_users($id)
{
    $conn = openCon();
    $sql = "SELECT * FROM project_users WHERE project_id='$id'";
    $result = $conn->query($sql);
    $arr=array();
    $i=0;
    if ($result->num_rows > 0) {
        while ($row = $result->fetch_assoc()) {
            $arr[$i++]=$row;
            
        }
    } else {
        return 0;
    }
   
    return $arr;
}
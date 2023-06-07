<?php
require_once($_SERVER['DOCUMENT_ROOT'] . "/php/database_connect.php");
function create_user($username, $email, $f_name, $l_name, $ph_no, $psw_hash,$github,$avatar,$user_state)
{
    $username = $email;
    $conn = openCon();
    $sql = "INSERT INTO users (username,f_name,l_name,email,ph_no,psw_hash,github,avatar,user_state) VALUES ('$username','$f_name','$l_name','$email','$ph_no','$psw_hash','$github','$avatar','$user_state')";
    if ($conn->query($sql) === TRUE) {
        return 1;
    } else {
        return "Error: " . $sql . "<br>" . $conn->error;
    }
}

function create_project($project_name, $repo_name, $team_leader, $description, $start_date, $update_date, $status, $progress)
{
    $conn = openCon();
    $sql = "INSERT INTO projects (project_name, repo_name, team_leader, description, start_date, update_date, status, progress)
            VALUES ('$project_name', '$repo_name', '$team_leader', '$description', '$start_date', '$update_date', '$status', '$progress')";
    if ($conn->query($sql) === TRUE) {
        $last_id = $conn->insert_id;
        return $last_id;
    } else {
        return "Error: " . $sql . "<br>" . $conn->error;
    }
}

function create_project_user($project_id, $user_id, $role, $tech_stack, $user_type, $github, $avatar, $f_name, $l_name)
{
    $conn = openCon();
    $sql = "INSERT INTO project_users (project_id, user_id, role, tech_stack, user_type, github, avatar, f_name, l_name)
            VALUES ('$project_id', '$user_id', '$role', '$tech_stack', '$user_type', '$github', '$avatar', '$f_name', '$l_name')";
    if ($conn->query($sql) === TRUE) {
        return 1;
    } else {
        return "Error: " . $sql . "<br>" . $conn->error;
    }
}
function delete_project_user($project_id, $user_id)
{
    $conn = openCon();
    $sql = "DELETE FROM project_users WHERE project_id = '$project_id' AND user_id = '$user_id'";
    if ($conn->query($sql) === TRUE) {
        return 1;
    } else {
        return "Error: " . $sql . "<br>" . $conn->error;
    }
}

function create_task($user_id, $project_id, $leader_id, $title, $description, $status, $deadline)
{
    $conn = openCon();
    $sql = "INSERT INTO user_tasks (user_id, project_id, leader_id, title, description, status, deadline) VALUES ('$user_id', '$project_id', '$leader_id', '$title', '$description', '$status', '$deadline')";
    if ($conn->query($sql) === TRUE) {
        return 1;
    } else {
        return "Error: " . $sql . "<br>" . $conn->error;
    }
}
function mark_task_complete($id)
{
    $conn = openCon();
    $completed_on = date("Y-m-d"); // Get current date
    $sql = "UPDATE user_tasks SET completed_on = '$completed_on', status = 1 WHERE id = '$id'";
    if ($conn->query($sql) === TRUE) {
        return 1;
    } else {
        return "Error: " . $sql . "<br>" . $conn->error;
    }
}
function change_task_status($id, $status)
{
    $conn = openCon();

    $sql = "UPDATE user_tasks SET status = '$status' WHERE id = '$id'";

    if ($conn->query($sql) === TRUE) {
        return 1;
    } else {
        return "Error: " . $sql . "<br>" . $conn->error;
    }
}

function delete_task($id)
{
    $conn = openCon();
    $sql = "DELETE FROM user_tasks WHERE id = '$id'";
    if ($conn->query($sql) === TRUE) {
        return 1;
    } else {
        return "Error: " . $sql . "<br>" . $conn->error;
    }
}

function login($email, $psw_hash)
{
    $user_object = new stdClass();
    $conn = openCon();
    $sql = "SELECT * FROM users WHERE (email='$email' || ph_no='$email') && psw_hash='$psw_hash'";
    $result = $conn->query($sql);
    if ($result->num_rows > 0) {
        while ($row = $result->fetch_assoc()) {
            $arr = array(
                
                "username" => $row["username"], "user_id" => $row["id"], "f_name" =>   $row["f_name"], "l_name" => $row["l_name"], "email" => $row["email"], "ph_no" => $row["ph_no"],
                "user_type" => $row["user_state"], "github" => $row["github"], "avatar" => $row["avatar"]
            );
            $json = json_encode($arr);
            return $json;
        }
    } else {
        return "nf";
    }
}
function create_user_contribution($user_id, $project_id, $commit_id, $github,$message)
{
    $conn = openCon();
    $sql = "INSERT INTO user_contributions (user_id, project_id, commit_id, github,message)
            VALUES ('$user_id', '$project_id', '$commit_id', '$github','$message')";
    if ($conn->query($sql) === TRUE) {
        return 1;
    } else {
        return "Error: " . $sql . "<br>" . $conn->error;
    }
}
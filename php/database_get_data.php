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
            return $row["f_name"] . " " . $row["l_name"];
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
    $arr = array();
    $i = 0;
    if ($result->num_rows > 0) {
        while ($row = $result->fetch_assoc()) {
            $arr[$i++] = $row;
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
    return json_encode($arr);
}
function get_user_by_github($id)
{
    $conn = openCon();
    $sql = "SELECT * FROM users WHERE github='$id'";
    $result = $conn->query($sql);
    $arr = array();
    $i = 0;
    if ($result->num_rows > 0) {
        while ($row = $result->fetch_assoc()) {
            return json_encode($row);
            ;
        }
    } else {
        return 0;
    }
    return json_encode($arr);
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
    $conn = openCon();
    ;
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
    $conn = openCon();
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
    $projects = "";
    if ($result->num_rows > 0) {
        while ($row = $result->fetch_assoc()) {
            $projects = $row;
        }
    }
    return json_encode($projects);
}
function get_project_by_repo_name($name)
{
    $conn = openCon();
    $sql = "SELECT * FROM projects WHERE repo_name='$name'";
    $result = $conn->query($sql);
    $projects = "";
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
    $arr = array();
    $i = 0;
    if ($result->num_rows > 0) {
        while ($row = $result->fetch_assoc()) {
            $arr[$i++] = $row;
        }
    } else {
        return 0;
    }

    return $arr;
}
function get_all_user_projects($id)
{
    $conn = openCon();
    $sql = "SELECT * FROM project_users WHERE user_id='$id'";
    $result = $conn->query($sql);
    $arr = array();
    $i = 0;
    if ($result->num_rows > 0) {
        while ($row = $result->fetch_assoc()) {
            $arr[$i++] = $row;
        }
    } else {
        return 0;
    }
    return $arr;

}
function get_user_tasks_for_project($user_id, $project_id)
{
    $conn = openCon();
    $sql = "SELECT * FROM user_tasks WHERE user_id = '$user_id' AND project_id = '$project_id'";
    $result = $conn->query($sql);

    if ($result->num_rows > 0) {
        // Fetch the row data
        $row = $result->fetch_assoc();
        return $row;
    } else {
        return null; // No matching row found
    }
}
function get_user_tasks_by_user_id($user_id)
{
    $conn = openCon();
    $sql = "SELECT * FROM user_tasks WHERE user_id = '$user_id'";
    $result = $conn->query($sql);

    if ($result->num_rows > 0) {
        // Fetch all the rows into an array
        $rows = array();
        while ($row = $result->fetch_assoc()) {
            $rows[] = $row;
        }
        return $rows;
    } else {
        return null; // No matching rows found
    }
}

function get_user_tasks_by_project_id($project_id)
{
    $conn = openCon();
    $sql = "SELECT * FROM user_tasks WHERE project_id = '$project_id'";
    $result = $conn->query($sql);

    if ($result->num_rows > 0) {
        $rows = array();
        while ($row = $result->fetch_assoc()) {
            $rows[] = $row;
        }
        return $rows;
    } else {
        return null; // No matching rows found
    }
}

function does_commit_exist($commit_id)
{
    $conn = openCon();
    $sql = "SELECT COUNT(*) as count FROM user_contributions WHERE commit_id = '$commit_id'";
    $result = $conn->query($sql);

    if ($result && $result->num_rows > 0) {
        $row = $result->fetch_assoc();
        $count = $row['count'];
        return ($count > 0) ? true : false;
    }

    return false;
}
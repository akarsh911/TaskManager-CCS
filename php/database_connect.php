<?php
$servername = "localhost";
$username = "root";
$password = "";
$dbname = "task_manager";
$conn = new mysqli($servername, $username, $password);
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}
$sql = "CREATE DATABASE IF NOT EXISTS $dbname";
if ($conn->query($sql) === TRUE) {
    $conn->select_db($dbname);
    $sql = "CREATE TABLE IF NOT EXISTS users (
        id INT(6) UNSIGNED AUTO_INCREMENT PRIMARY KEY,
        f_name VARCHAR(30) NOT NULL,
        l_name VARCHAR(30) NOT NULL,
        username VARCHAR(30) NOT NULL,
        ph_no VARCHAR(30) NOT NULL,
        email VARCHAR(50) NOT NULL,
        avatar VARCHAR(50) NOT NULL,
        github VARCHAR(50) NOT NULL,
        psw_hash VARCHAR(255) NOT NULL,
        user_state INT(1) NOT NULL,
        dashboard_type INT(1) NOT NULL
    )";
    if ($conn->query($sql) === TRUE) {
        $sql = "CREATE TABLE IF NOT EXISTS projects (
              id INT AUTO_INCREMENT PRIMARY KEY,
              project_name TEXT,
              repo_name TEXT,
              team_leader INT,
              description LONGTEXT,
              start_date DATE,
              update_date DATE,
              status INT,
              progress TEXT
            )";

        // Execute the SQL query
        if ($conn->query($sql) === TRUE) {
            $sql = "CREATE TABLE IF NOT EXISTS project_users (
              id INT AUTO_INCREMENT PRIMARY KEY,
              project_id INT,
              user_id INT,
              role TEXT,
              tech_stack LONGTEXT,
              user_type INT,
              github TEXT,
              avatar TEXT,
              f_name TEXT,
              l_name TEXT
              joined_on DATE DEFAULT CURRENT_DATE
        )";

            // Execute the SQL query
            if ($conn->query($sql) === TRUE) {

                $sql = "CREATE TABLE IF NOT EXISTS `keys` (
                  `token` TEXT
                )";

                // Execute the SQL query
                if ($conn->query($sql) === TRUE) {


                    $sql = "CREATE TABLE IF NOT EXISTS user_contributions (
                     id INT(6) UNSIGNED AUTO_INCREMENT PRIMARY KEY,
                     user_id INT(6) UNSIGNED NOT NULL,
                     project_id INT(6) UNSIGNED NOT NULL,
                     date DATE DEFAULT CURRENT_DATE,
                     time TIME DEFAULT CURRENT_TIME
                     );  ";

                    // Execute the SQL query
                    if ($conn->query($sql) === TRUE) {

                        $sql = "CREATE TABLE IF NOT EXISTS user_tasks (
                        id INT(6) UNSIGNED AUTO_INCREMENT PRIMARY KEY,
                        user_id INT(6) UNSIGNED NOT NULL,
                         project_id INT(6) UNSIGNED NOT NULL,
                         leader_id INT(6) UNSIGNED NOT NULL,
                         title VARCHAR(255) NOT NULL,
                          description TEXT NOT NULL,
                          status VARCHAR(20) NOT NULL,
                          assigned_date DATE DEFAULT CURRENT_DATE,
                          assigned_time TIME DEFAULT CURRENT_TIME,
                         deadline DATE,
                        completed_on DATE
                          );";

                        // Execute the SQL query
                        if ($conn->query($sql) === TRUE) {

                        } else {
                            echo "Error creating table: " . $conn->error;
                        }
                    } else {
                        echo "Error creating table: " . $conn->error;
                    }
                } else {
                    echo "Error creating table: " . $conn->error;
                }
            } else {
                echo "Error creating table: " . $conn->error;
            }
        } else {
            echo "Error creating table: " . $conn->error;
        }
    } else {
        echo "Error creating table: " . $conn->error;
    }
}


function openCon()
{
    $dbhost = "localhost";
    $dbuser = "root";
    $dbpass = "";
    $db = "task_manager";
    $conn = new mysqli($dbhost, $dbuser, $dbpass, $db) or die("Connect failed: %s\n" . $conn->error);
    return $conn;
}
function closeCon($conn)
{
    $conn->close();
}
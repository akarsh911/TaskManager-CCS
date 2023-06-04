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
        )";

            // Execute the SQL query
            if ($conn->query($sql) === TRUE) {

                $sql = "CREATE TABLE IF NOT EXISTS `keys` (
                  `token` TEXT
                )";

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
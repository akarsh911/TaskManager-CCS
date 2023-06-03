<?php
require_once($_SERVER['DOCUMENT_ROOT'] . "/php/database_connect.php");
function create_user($username, $email, $f_name, $l_name, $ph_no, $psw_hash, $user_state)
{
    $username = $email;
    $conn = openCon();
    $sql = "INSERT INTO users (username,f_name,l_name,email,ph_no,psw_hash,user_state) VALUES ('$username','$f_name','$l_name','$email','$ph_no','$psw_hash','$user_state')";
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
                "username" => $row["username"], "f_name" =>   $row["f_name"], "l_name" => $row["l_name"], "email" => $row["email"], "ph_no" => $row["ph_no"],
                "user_type" => $row["user_state"]
            );
            $json = json_encode($arr);
            return $json;
        }
    } else {
        return "nf";
    }
}
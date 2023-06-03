<?php
function check_name($name)
{
    $val = 1;
    if ($name != "" && $name != null && strlen($name) >= 3) {
        if (!preg_match("/^[a-zA-z]*$/", $name)) {
            $val = "Only alphabets and whitespace are allowed";
        }
    } else {
        $val = "Please Enter a valid Name";
    }

    return $val;
}

function check_mail($mail)
{
    $val = 1;
    if ($mail != "" && $mail != null && strlen($mail) >= 6) {
        if (!preg_match('/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/', $mail)) {
            $val = "Please enter a valid Email Id";
        }
    } else {
        $val = "Please enter a valid Email Id";
    }
    return  $val;
}
function check_psw($pwd)
{
    $val = 1;
    if ($pwd != "" && $pwd != null && strlen($pwd) >= 6) {
        if (!preg_match('/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{8,15}$/', $pwd)) {
            $val = "Please enter a password with 7-16 characters , one lower & uppercase & one sp. character";
        }
    } else {
        $val = "Please enter a password with 7-16 characters , one lower & uppercase & one sp. character";
    }
    return  $val;
}
function check_c_psw($psw, $pwd)
{
    $val = 1;
    if ($pwd != "" && $pwd != null && strlen($pwd) >= 6) {
        if (!preg_match('/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{8,15}$/', $pwd)) {
            $val = "Please enter a password with 7-16 characters , one lower & uppercase & one sp. character";
        }
        if ($psw != $pwd) {
            $val = "Confirm Password Should Match";
        }
    } else {
        $val = "Confirm Password Should Match";
    }
    return  $val;
}

function check_ph_no($mob)
{
    if (preg_match("/^\d+\.?\d*$/", $mob) && strlen($mob) == 10) {

        $val = 1;
    } else {

        $val = "Enter valid Phone Number";
    }
    return  $val;
}
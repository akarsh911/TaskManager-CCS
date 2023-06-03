<script>
    function setcookie(name, value, days) {
        if (days) {
            var date = new Date();
            date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000); // ) removed
            var expires = "; expires=" + date.toGMTString(); // + added
        } else
            var expires = "";
        document.cookie = name + "=" + value + expires + ";path=/"; // + and " added
    }
</script>
<?php
//require_once($_SERVER['DOCUMENT_ROOT'] . '/php/database_get_data.php');
require_once($_SERVER['DOCUMENT_ROOT'] . '/php/database_set_data.php');
$username = trim($_POST["username"], '\'"');
$password = trim($_POST["password"], '\'"');
$resp = login($username, $password);
if ($resp == "nf") {
    $err = array();
    $err["val"] = "Invalid Credentials";
    echo "<script> sessionStorage.setItem('err', `" . json_encode($err, JSON_PRETTY_PRINT) . "`);</script>";
    echo '<script>window.onload = (event) => {location.replace("../html/login_page.html")};</script>';
} else {
    echo $resp;
    echo "<script> localStorage.setItem('user_data', `" . $resp . "`);</script>";
    echo '<script>window.onload = (event) => {location.replace("../html/dashboard.html")};</script>';
}

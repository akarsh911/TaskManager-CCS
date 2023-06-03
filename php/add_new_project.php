<?php
require_once($_SERVER['DOCUMENT_ROOT'] . "/php/database_get_data.php");
$accessToken = get_key();

$url = 'https://api.github.com/user/repos';
$headers = array(
    'Accept: application/vnd.github+json',
    'Authorization: Bearer ' . $accessToken,
    'X-GitHub-Api-Version: 2022-11-28',
    'User-Agent: My-GitHub-App' 
);
$data = array(
    'name' => $_POST["repo_name"],
    'description' => $_POST["desc"],
    'homepage' => 'https://github.com',
    'private' => false,
    'is_template' => false
);

$ch = curl_init();

curl_setopt($ch, CURLOPT_URL, $url);
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
curl_setopt($ch, CURLOPT_POST, true);
curl_setopt($ch, CURLOPT_POSTFIELDS, json_encode($data));
curl_setopt($ch, CURLOPT_HTTPHEADER, $headers);

$response = curl_exec($ch);

curl_close($ch);

// Process the response
if ($response === false) {
    echo 'Error: ' . curl_error($ch);
} else {
    echo $response;
    require_once($_SERVER['DOCUMENT_ROOT'] . "/php/database_set_data.php");
    if(create_project($_POST["name"],strtolower($_POST["repo_name"]),$_POST["team_leader_id"],$_POST["desc"],date("Y-m-d h:i"),date("Y-m-d h:i"), 1,"Just Started"))
    {
        echo "<script>alert('Success Creating Project');</script>";
      //   echo '<script>window.onload = (event) => {location.replace("/html/dashboard.html")};</script>';
    }
    
}
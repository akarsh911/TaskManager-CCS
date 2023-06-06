<?php
require_once($_SERVER['DOCUMENT_ROOT'] . "/php/database_get_data.php");
$accessToken = get_key();
remove_contributor($accessToken);
function remove_contributor($accessToken)
{
    require_once($_SERVER['DOCUMENT_ROOT'] . "/php/database_set_data.php");

    $id = $_POST["project_id"];
    $repo = json_decode(get_project_by_id($id))->repo_name;
    $user = get_user_by_id($_POST["user_id"]);
    $user= json_decode(json_encode(json_decode($user)));
    $url = 'https://api.github.com/repos/ccs-tiet-task/' . $repo . '/collaborators/' . $user->github;

    $headers = array(
        'Accept: application/vnd.github+json',
        'Authorization: Bearer ' . $accessToken,
        'X-GitHub-Api-Version: 2022-11-28',
        'user-agent: github'
    );

    $ch = curl_init();

    curl_setopt($ch, CURLOPT_URL, $url);
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
    curl_setopt($ch, CURLOPT_CUSTOMREQUEST, 'DELETE'); // Use DELETE method
    curl_setopt($ch, CURLOPT_HTTPHEADER, $headers);
    curl_setopt($ch, CURLOPT_HTTP_VERSION, CURL_HTTP_VERSION_1_1);
    $response = curl_exec($ch);
    curl_close($ch);

    if ($response === false) {
        echo 'Error: ' . curl_error($ch);
    } else {
        // Process the response as needed
        require_once($_SERVER['DOCUMENT_ROOT'] . "/php/database_set_data.php");
        delete_project_user($_POST["project_id"], $_POST["user_id"]);
        echo "<script>alert('Success Removing Collaborator');</script>";
      echo '<script>window.onload = (event) => {location.replace("../html/view_project.html?page=3&id=' . $id . '");};</script>';
    }
}
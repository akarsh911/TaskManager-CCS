<?php
require_once($_SERVER['DOCUMENT_ROOT'] . "/php/database_get_data.php");
$accessToken = get_key();
add_contributor($accessToken);







function add_contributor($accessToken)
{
    require_once($_SERVER['DOCUMENT_ROOT'] . "/php/database_set_data.php");

    $id = $_POST["project_id"];
    $repo = json_decode(get_project_by_id($id))->repo_name;
    $user = json_decode(json_encode(get_user_by_id($_POST["user_id"])));
    // echo $user->github;


    $url = 'https://api.github.com/repos/ccs-tiet-task/' . $repo . '/collaborators/' . $user->github;
    //$url = 'https://api.github.com/repos/ccs-tiet-task/akarsh_test_21/collaborators/akarsh911';
    //echo $url . "<br>";

    $headers = array(
        'Accept: application/vnd.github+json',
        'Authorization: Bearer ' . $accessToken,
        'X-GitHub-Api-Version: 2022-11-28',
        'user-agent: github'
    );

    $data = array('permission' => 'push'); // Modify the data payload

    $ch = curl_init();

    curl_setopt(
        $ch,
        CURLOPT_URL,
        $url
    );
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
    curl_setopt($ch, CURLOPT_CUSTOMREQUEST, 'PUT'); // Use PUT method
    curl_setopt($ch, CURLOPT_POSTFIELDS, json_encode($data));
    curl_setopt($ch, CURLOPT_HTTPHEADER, $headers);
    curl_setopt($ch, CURLOPT_HTTP_VERSION, CURL_HTTP_VERSION_1_1);
    $response2 = curl_exec($ch);
    curl_close($ch);
    //echo $response2;
    if ($response2 === false) {
        echo 'Error: ' . curl_error($ch);
    } else if (json_decode($response2)->id != "") {
        create_project_user($id, $_POST["user_id"], $_POST["role"], $_POST["tech_stack"], 0, $user->github, $user->avatar, $user->f_name, $user->l_name);
        echo "<script>alert('Success Adding Collaborator');</script>";
        echo '<script>window.onload = (event) => {location.replace("../html/view_project.html?page=3&id="' . $id . ')};</script>';
    }
}
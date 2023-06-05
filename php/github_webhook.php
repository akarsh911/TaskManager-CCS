<?php
require_once($_SERVER['DOCUMENT_ROOT'] . "/php/database_set_data.php");
require_once($_SERVER['DOCUMENT_ROOT'] . "/php/database_get_data.php");
$response = fetch_response($_GET["repo"]);
$data = json_decode($response);
if (does_commit_exist($data[0]->sha) == false) {
    $user = json_decode(get_user_by_github($data[0]->author->login));
    $project = json_decode(get_project_by_repo_name($_GET["repo"]));
    $user_id = $user->id;
    $repo_id = $project->id;
    create_user_contribution($user_id, $repo_id, $data[0]->sha, $data[0]->author->login, $data[0]->commit->message);
    echo "Success";
} else {
    echo "Failed Commit already exists";
}

function fetch_response($repo)
{

    $owner = 'PromtEngineer';
    $ch = curl_init('https://api.github.com/repos/' . $owner . '/' . $repo . '/commits');
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
    curl_setopt($ch, CURLOPT_HTTPGET, true);
    //curl_setopt($ch, CURLOPT_POSTFIELDS, $data_string);
    curl_setopt(
        $ch,
        CURLOPT_HTTPHEADER,
        array(
            'Accept: application/vnd.github+json',
            'X-GitHub-Api-Version: 2022-11-28',
            'Content-Type: application/json',
            'user-agent: github'
        )
    );
    curl_setopt($ch, CURLOPT_HTTP_VERSION, CURL_HTTP_VERSION_1_1);
    $response = curl_exec($ch);
    curl_close($ch);

    if (json_decode($response)[0]->sha != "") {
        return $response;
    } else {
        echo "Failed to create webhook.";
        echo $response;
    }
}
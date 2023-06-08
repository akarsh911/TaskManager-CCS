<?php
require_once($_SERVER['DOCUMENT_ROOT'] . "/php/database_set_data.php");
require_once($_SERVER['DOCUMENT_ROOT'] . "/php/database_get_data.php");
//$response = fetch_response($_GET["repo"]);
$request_body = file_get_contents('php://input');
//echo $request_body;
$data = json_decode($request_body);
$commits=$data->commits;
if (does_commit_exist($commits[0]->id) == false) {
    $user = json_decode(get_user_by_github($data->sender->login));
    $project = json_decode(get_project_by_repo_name($_GET["repo"]));
    $user_id = $user->id;
    $repo_id = $project->id;
    $msg = sanitizeText($commits[0]->message);
    create_user_contribution($user_id, $repo_id, $commits[0]->id, $data->sender->login, $msg);
    echo "Success";
} else {
    echo "Failed Commit already exists";
}
function sanitizeText($text)
{
    $text = str_replace("'", "", $text);
    $text = str_replace('"', '', $text);
    return $text;
}

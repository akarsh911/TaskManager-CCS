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
echo $response;
// Process the response
if ($response === false) {
    echo 'Error: ' . curl_error($ch);
} else if (json_decode($response)->id != "") {
    //  echo $response;
    add_contributor($accessToken);
}


function add_contributor($accessToken)
{
    require_once($_SERVER['DOCUMENT_ROOT'] . "/php/database_set_data.php");

    $id = create_project($_POST["name"], strtolower($_POST["repo_name"]), $_POST["team_leader_id"], $_POST["desc"], date("Y-m-d h:i"), date("Y-m-d h:i"), 1, "Just Started");
    $user = json_decode(json_encode(get_user_by_id($_POST["team_leader_id"])));
    // echo $user->github;


    $url = 'https://api.github.com/repos/ccs-tiet-task/' . strtolower($_POST["repo_name"]) . '/collaborators/' . $user->github;
    //$url = 'https://api.github.com/repos/ccs-tiet-task/akarsh_test_21/collaborators/akarsh911';
    echo $url . "<br>";

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

    if ($response2 === false) {
        echo 'Error: ' . curl_error($ch);
    } else if (json_decode($response2)->id != "") {
        webhook_query($accessToken, strtolower($_POST["repo_name"]));
        // echo $response2;
        create_project_user($id, $_POST["team_leader_id"], "Team Leader", "", 1, $user->github, $user->avatar, $user->f_name, $user->l_name);
    }
}

function webhook_query($token, $repo)
{

    $owner = 'ccs-tiet-task';


    $data = array(
        'name' => 'web',
        'active' => true,
        'events' => array('push'),
        'config' => array(
            'url' => 'http://getnode.xyz:49160/php/github_webhook.php?repo=' . $repo,
            'content_type' => 'json',
            'insecure_ssl' => '1'
        )
    );

    $data_string = json_encode($data);

    $ch = curl_init('https://api.github.com/repos/' . $owner . '/' . $repo . '/hooks');
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
    curl_setopt($ch, CURLOPT_POST, true);
    curl_setopt($ch, CURLOPT_POSTFIELDS, $data_string);
    curl_setopt(
        $ch,
        CURLOPT_HTTPHEADER,
        array(
            'Accept: application/vnd.github+json',
            'Authorization: Bearer ' . $token,
            'X-GitHub-Api-Version: 2022-11-28',
            'Content-Type: application/json',
            'user-agent: github'

        )
    );

    $response = curl_exec($ch);
    curl_close($ch);

    if (json_decode($response)->id != "") {
        echo "Webhook created successfully.";
        echo "<script>alert('Success Creating Project');</script>";
        echo '<script>window.onload = (event) => {location.replace("/html/dashboard.html")};</script>';

    } else {
        echo "Failed to create webhook.";
    }

}
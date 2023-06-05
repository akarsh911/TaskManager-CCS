<?php
require_once($_SERVER['DOCUMENT_ROOT'] . "/vendor/autoload.php");
require_once($_SERVER['DOCUMENT_ROOT'] . "/php/database_get_data.php");

if ($_POST["pass"] == get_key()) {
    $accessToken = get_key();
    $username = 'ccs-tiet-task';

    // Fetch all repositories
    $client = new GuzzleHttp\Client();
    $response = $client->get("https://api.github.com/user/repos", [
        'auth' => [$username, $accessToken],
    ]);

    $repositories = json_decode($response->getBody());

    // Delete repositories
    foreach ($repositories as $repository) {
        $repoName = $repository->name;
        $response = $client->delete("https://api.github.com/repos/$username/$repoName", [
            'auth' => [$username, $accessToken],
        ]);

        if ($response->getStatusCode() === 204) {
            echo "Repository $repoName deleted successfully." . PHP_EOL;
        } else {
            echo "Failed to delete repository $repoName." . PHP_EOL;
        }
    }
}
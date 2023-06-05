<?php

// GitHub Webhook Secret
$secret = 'hello';

// Path to your repository on the server
$repoPath = 'D:\ApacheServer';

// Headers
$signature = $_SERVER['HTTP_X_HUB_SIGNATURE'];
if (!isset($signature)) {
    header('HTTP/1.0 403 Forbidden');
    die('Access denied.');
}

// Verify the signature
list($algo, $hash) = explode('=', $signature, 2);
$payload = file_get_contents('php://input');
$calculatedHash = hash_hmac($algo, $payload, $secret);
if ($hash !== $calculatedHash) {
    header('HTTP/1.0 403 Forbidden');
    die('Invalid signature.');
}
$repoPath = getcwd();
$branch = 'master';

$command = "cd ".$repoPath ."&& git pull origin ".$branch;

exec($command, $output, $returnCode);

if ($returnCode !== 0) {
    echo "Error: Git command failed";
    // Handle the error as needed
} else {
    echo "Git pull successful";
    // Handle the success as needed
}
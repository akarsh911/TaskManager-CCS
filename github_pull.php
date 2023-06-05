<?php
$secret = 'hello';
$signature = $_SERVER['HTTP_X_HUB_SIGNATURE'];
if (!isset($signature)) {
    header('HTTP/1.0 403 Forbidden');
    die('Access denied.');
}


list($algo, $hash) = explode('=', $signature, 2);
$payload = file_get_contents('php://input');
$calculatedHash = hash_hmac($algo, $payload, $secret);
if ($hash !== $calculatedHash) {
    header('HTTP/1.0 403 Forbidden');
    die('Invalid signature.');
}
$repoPath = getcwd();
$branch = 'master';
echo "Return code: " . $returnCode . "\n";
$command = "cd ".$repoPath ."&& git pull origin ".$branch;

exec($command, $output, $returnCode);

if ($returnCode !== 0) {
    echo "Error: Git command failed";
} else {
    echo "Git pull successful";
}
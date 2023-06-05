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

$command = "cd ".$repoPath ."&& git pull origin ".$branch;

exec($command, $output, $returnCode);
echo "Output: " . implode("\n", $output) . "\n";
echo "Return code: " . $returnCode . "\n";
if ($returnCode !== 0) {
    echo "Error: Git command failed";
} else {
    echo "Git pull successful";
}
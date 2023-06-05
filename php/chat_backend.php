<?php
// Establish database connection
$servername = "localhost";
$username = "root";
$password = "";
$dbname = "task_manager";

$conn = new mysqli($servername, $username, $password);
$conn->select_db($dbname);
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

// Handle incoming messages
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    
    $user = $_POST['user'];
    $message = $_POST['message'];
    $data=json_encode($message);
    // Save message to database
    $sql = "INSERT INTO chats (user, message, created_at) VALUES ('$data', '$message', NOW())";
    $conn->query($sql);
}

// Fetch chat history
$sql = "SELECT * FROM chats ORDER BY created_at ASC";
$result = $conn->query($sql);

$chatHistory = [];
if ($result->num_rows > 0) {
    while ($row = $result->fetch_assoc()) {
        $chatHistory[] = $row;
    }
}

// Send chat history to the frontend
header('Content-Type: application/json');
echo json_encode($chatHistory);

$conn->close();
?>
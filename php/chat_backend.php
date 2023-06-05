<?php
// Establish database connection
require_once($_SERVER['DOCUMENT_ROOT'] . "../php/database_connect.php");
require_once($_SERVER['DOCUMENT_ROOT'] . "../php/database_get_data.php");
$conn=openCon();
// Fetch chat history
$sql = "SELECT * FROM chats ORDER BY created_at ASC";
$result = $conn->query($sql);

$chatHistory = [];
if ($result->num_rows > 0) {
    while ($row = $result->fetch_assoc()) {
        $arr=json_decode(get_user_by_id($row["user"]));
        $row["user_name"]=$arr->f_name." ".$arr->l_name;
        $chatHistory[] = $row;
    }
}

// Send chat history to the frontend
header('Content-Type: application/json');
echo json_encode($chatHistory);


?>
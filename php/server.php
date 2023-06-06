<?php
require_once ("../vendor/autoload.php");

use Ratchet\MessageComponentInterface;
use Ratchet\ConnectionInterface;
use Ratchet\Server\IoServer;
use Ratchet\Http\HttpServer;
use Ratchet\WebSocket\WsServer;

class Chat implements MessageComponentInterface
{
    protected $clients;
    protected $conn;

    public function __construct()
    {
        $this->clients = new \SplObjectStorage;
    }

    public function onOpen(ConnectionInterface $conn)
    {
        $this->clients->attach($conn);
        $this->conn = $conn;
        echo "New connection! ({$conn->resourceId})\n";
    }

    public function onMessage(ConnectionInterface $from, $msg)
    {
        $message = json_decode($msg);
        $servername = "localhost";
        $username = "root";
        $password = "";
        $dbname = "task_manager";
        $conn = new mysqli($servername, $username, $password);
        $conn->select_db($dbname);
        echo json_encode($message);
        $sql = "INSERT INTO chats (user, message,project_id) VALUES ('$message->user', '$message->message','$message->project_id')";
        $conn->query($sql);
        // Broadcast the received message to all connected clients
        foreach ($this->clients as $client) {
            $client->send(json_encode($message));
        }
    }

    public function onClose(ConnectionInterface $conn)
    {
        $this->clients->detach($conn);
        echo "Connection {$conn->resourceId} has disconnected\n";
    }

    public function onError(ConnectionInterface $conn, \Exception $e)
    {
        echo "An error has occurred: {$e->getMessage()}\n";
        $conn->close();
    }
}

$server = IoServer::factory(
    new HttpServer(
        new WsServer(
            new Chat()
        )
    ),
    8080
);

$server->run();
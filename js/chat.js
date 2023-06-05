const socket = io('wss://localhost:8080');

socket.on('connect', () => {
    console.log('Connected to server');
});

socket.on('message', (msg) => {
    appendMessage(msg);
});

document.getElementById('chat-form').addEventListener('submit', (e) => {
    e.preventDefault();
    const messageInput = document.getElementById('message-input');
    const message = messageInput.value.trim();

    if (message !== '') {
        socket.send(message);
        messageInput.value = '';
        appendMessage(message);
    }
});

function appendMessage(msg) {
    const chatMessages = document.getElementById('chat-messages');
    const messageElement = document.createElement('div');
    messageElement.innerText = msg;
    chatMessages.appendChild(messageElement);
    chatMessages.scrollTop = chatMessages.scrollHeight;
}

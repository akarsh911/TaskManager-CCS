const socket = new WebSocket('ws://getnode.xyz:49161');

var sel=0;

socket.addEventListener('message', function (event) {
    if (message.user == JSON.parse(localStorage.getItem("user_data")).user_id) {
        const chatMessage = document.createElement('div');
        chatMessage.classList.add("message-box", "my-message");
        const chatMessagep = document.createElement('p');
        chatMessagep.innerText = `${message.message}`;
        const chatMessageb = document.createElement('br');
        const chatMessagesp = document.createElement('span');
        chatMessagesp.innerText = `${message.created_at}`;
        chatMessage.appendChild(chatMessagep);
        chatMessagep.appendChild(chatMessageb);
        chatMessagep.appendChild(chatMessagesp);
        var chatMessages = document.getElementById('chat_' + `${message.project_id}`);
        chatMessages.appendChild(chatMessage);
        chatMessages.scrollTop = chatMessages.scrollHeight;
    }
    else {
        const chatMessage = document.createElement('div');
        chatMessage.classList.add("message-box", "friend-message");
        const chatMessagep = document.createElement('p');
        const chatMessageb = document.createElement('b');
        chatMessageb.innerText = `${message.user_name}`;
        const chatMessagebr = document.createElement('br');
        const chatMessagebr2 = document.createElement('br');
        const chatMessagespan = document.createElement('span');
        chatMessagespan.innerText = `${message.created_at}`;
        const chatMessageText1 = document.createTextNode(`${message.message}`);
        const chatMessageText2 = document.createTextNode(" ");
        chatMessage.appendChild(chatMessagep);
        chatMessagep.appendChild(chatMessageb);
        chatMessagep.appendChild(chatMessagebr);
        chatMessagep.appendChild(chatMessageText1);
        chatMessagep.appendChild(chatMessagebr2);
        chatMessagep.appendChild(chatMessagespan);
        var chatMessages = document.getElementById('chat_' + `${message.project_id}`);
        chatMessages.appendChild(chatMessage);
        chatMessages.scrollTop = chatMessages.scrollHeight;
    }
});


document.getElementById('chat-form').addEventListener('submit', function (event) {
    event.preventDefault();

    const user = JSON.parse(localStorage.getItem("user_data"));
    const message = document.getElementById('message').value;
    
    // Send message to backend
    const data = {
        user: user,
        message: message,
        project_id:sel
    };

    socket.send(JSON.stringify(data));

    // Clear input field
    document.getElementById('message').value = '';
});

function load_projects()
{
    $.ajax({
        url: '../php/get_project_users.php?=' + JSON.parse(localStorage.getItem("user_data")).user_id,
        method: 'GET',
        dataType: 'json',
        success: function (projects) {
            // Iterate over each project
            projects.forEach(function (project) {
                // Create the HTML content for the project
                var htmlContent = `<div class="chat-box" id="tab_${project.id}"
                        <div class="chat-details">
                            <div class="text-head">
                                <h4> ${project.project_name}</h4>
                            </div>
                        </div>
                    </div> `;

                // Append the HTML content to the app_container element
                $('.chat_list').append(htmlContent);

                var chatBox = `  <div class="chat-container" style="display:none;" id="chat_${project.id}"></div>`
            });
            load_chats();
        },
        error: function (xhr, status, error) {
            console.error(error);
        }
    });

}

function load_chats()
{
    fetch('../php/chat_backend.php')
        .then(response => response.json())
        .then(messages => {
            

            messages.forEach(message => {
                if (message.user == JSON.parse(localStorage.getItem("user_data")).user_id)
                {
                    const chatMessage = document.createElement('div');
                    chatMessage.classList.add("message-box","my-message");
                    const chatMessagep = document.createElement('p');
                    chatMessagep.innerText = `${message.message}`;
                    const chatMessageb = document.createElement('br');
                    const chatMessagesp = document.createElement('span');
                    chatMessagesp.innerText = `${message.created_at}`;
                    chatMessage.appendChild(chatMessagep);
                    chatMessagep.appendChild(chatMessageb);
                    chatMessagep.appendChild(chatMessagesp);        
                    var chatMessages = document.getElementById('chat_' + `${message.project_id}`);  
                    chatMessages.appendChild(chatMessage);
                    chatMessages.scrollTop = chatMessages.scrollHeight;
                }
                else{
                    const chatMessage = document.createElement('div');
                    chatMessage.classList.add("message-box", "friend-message");
                    const chatMessagep = document.createElement('p');
                    const chatMessageb = document.createElement('b');
                    chatMessageb.innerText = `${message.user_name}`;
                    const chatMessagebr = document.createElement('br');
                    const chatMessagebr2 = document.createElement('br');
                    const chatMessagespan = document.createElement('span');
                    chatMessagespan.innerText = `${message.created_at}`;
                    const chatMessageText1 = document.createTextNode(`${message.message}`);
                    const chatMessageText2 = document.createTextNode(" ");
                    chatMessage.appendChild(chatMessagep);
                    chatMessagep.appendChild(chatMessageb);
                    chatMessagep.appendChild(chatMessagebr);
                    chatMessagep.appendChild(chatMessageText1);
                    chatMessagep.appendChild(chatMessagebr2);
                    chatMessagep.appendChild(chatMessagespan);
                    var chatMessages = document.getElementById('chat_' + `${message.project_id}`);    
                    chatMessages.appendChild(chatMessage);
                    chatMessages.scrollTop = chatMessages.scrollHeight;
                }                
            });
           
        });
}
addEventListener("load", (event) => { });

onload = (event) => {
    load_projects();
    load_chats();

};


const socket = new WebSocket('ws://getnode.xyz:49161');

var sel = 0;
var count = 0;
socket.addEventListener('message', function (event) {
    const message = JSON.parse(event.data);
    console.log(message);
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
        const chatMessageb = document.createElement('b1');
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
        console.log('chat_' + `${message.project_id}`)
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
        user: user.user_id,
        message: message,
        project_id: sel,
        user_name: user.f_name + " " + user.l_name,
        created_at: new Date().toLocaleString()
    };

    socket.send(JSON.stringify(data));

    // Clear input field
    document.getElementById('message').value = '';
});

function load_projects() {
    $.ajax({
        url: '../php/get_user_projects.php?id=' + JSON.parse(localStorage.getItem("user_data")).user_id,
        method: 'GET',
        dataType: 'json',
        success: function (projects) {
            // Iterate over each project
            projects.forEach(function (project) {
                count++;
                // Create the HTML content for the project
                var htmlContent = `<div class="chat-box" id="tab_${project.id}" onclick="load(${project.id});">
                        <div class="chat-details">
                            <div class="text-head">
                                <h4> ${project.project_name}</h4>
                            </div>
                        </div>
                    </div> `;

                // Append the HTML content to the app_container element
                $('#chat_list').append(htmlContent);

                var card = document.createElement('div');
                card.setAttribute('id', "chat_" + project.id);
                card.classList.add("chat-container", "invis");


                document.getElementById('chats').appendChild(card);
            });

        },
        error: function (xhr, status, error) {
            console.error(error);
        }
    });

}
function load_admin_message() {
    $.ajax({
        url: '../php/get_user_projects.php?id=' + JSON.parse(localStorage.getItem("user_data")).user_id,
        method: 'GET',
        dataType: 'json',
        success: function (projects) {
            // Iterate over each project
            var count2 = 0;
            projects.forEach(function (project) {
                count2++;
                // Create the HTML content for the project
                var message = `  <div class="message-box friend-message">
            <p>
              <b1>Admin</b1>(visible only to you)<br>Welcome <b1>${JSON.parse(localStorage.getItem("user_data")).f_name}</b1>! This is <b>${project.project_name}</b> Chat Server Please be Cautious of your language! And keep conversations Relevant to Project<br><span>now</span>
            </p>
          </div>`;
                var chatMessages = document.getElementById('chat_' + project.id);
                chatMessages.innerHTML += message;
                chatMessages.scrollTop = chatMessages.scrollHeight;
            });

        },
        error: function (xhr, status, error) {
            console.error(error);
        }
    });
    var message = `  <div class="message-box friend-message">
            <p>
              <b1>Admin</b1>(visible only to you)<br>Welcome <b1>${JSON.parse(localStorage.getItem("user_data")).f_name}</b1>! This is General Chat Server Please be Cautious of your language! <br><span>now</span>
            </p>
          </div>`;
    var chatMessages = document.getElementById('chat_0');
    chatMessages.innerHTML += message;
    chatMessages.scrollTop = chatMessages.scrollHeight;

}
function load_chats() {
    fetch('../php/chat_backend.php')
        .then(response => response.json())
        .then(messages => {


            messages.forEach(message => {
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
                    const chatMessageb = document.createElement('b1');
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
                    console.log(chatMessages)
                    chatMessages.appendChild(chatMessage);
                    chatMessages.scrollTop = chatMessages.scrollHeight;
                }
            });
            load_admin_message();
        });
}
function load(id) {

change(id);


}

function change(id) {
    $.ajax({
        url: '../php/get_user_projects.php?id=' + JSON.parse(localStorage.getItem("user_data")).user_id,
        method: 'GET',
        dataType: 'json',
        success: function (projects) {
            // Iterate over each project
            var count2 = 0;
            projects.forEach(function (project) {
              document.getElementById("chat_" + project.id).style.display = "none";
                document.getElementById("chat_" + id).style.display = "block";
                document.getElementById("tab_" + sel).classList.remove("selected");
                document.getElementById("tab_" + id).classList.add("selected");
                sel = id;
            });

        },
        error: function (xhr, status, error) {
            console.error(error);
        }
    });
}
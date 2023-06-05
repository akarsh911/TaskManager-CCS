var project_id = getParameterByName('id');
var page = getParameterByName('page');


if (page == 1) {
   
    document.getElementById("about").style.display ="block";
    var xhr = new XMLHttpRequest();

    // Define the URL and request method
    var url = '../php/get_project.php?id=' + project_id;
    xhr.open('GET', url, true);

    // Set the response type to JSON
    xhr.responseType = 'json';

    // Define the callback function to handle the AJAX response
    xhr.onload = function () {
        if (xhr.status === 200) {
            var response = xhr.response;
            console.log(response)
            // Update the HTML elements with the received data
            document.getElementById('project_name').innerHTML = response.project_name;
            document.getElementById('team_leader_id').innerHTML = response.team_leader;
            document.getElementById('Progress').innerHTML = response.progress;
            document.getElementById('startDate').innerHTML = response.start_date;
            document.getElementById('updateDate').innerHTML = response.update_date;
            document.getElementById('repo_url').innerHTML = "https://github.com/ccs-tiet-task/" + response.repo_name;
            document.getElementById('url').href = "https://github.com/ccs-tiet-task/" + response.repo_name;
            document.getElementById('descripton').innerHTML = response.description;
            $(document).ready(function () { /* code here */  load_chart(response.repo_name); });

        }
    };

    // Send the AJAX request
    xhr.send();
}
if(page==3)
{
    document.getElementById("team").style.display = "block";
    getProjectUsers();
}




function getParameterByName(name, url = window.location.href) {
    name = name.replace(/[\[\]]/g, '\\$&');
    var regex = new RegExp('[?&]' + name + '(=([^&#]*)|&|#|$)'),
        results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, ' '));
}


function load_chart(repoName) {
    var repoOwner = 'akarsh911';
    repoName='adb-dino-skinned';
    var apiUrl = 'https://api.github.com/repos/' + repoOwner + '/' + repoName + '/stats/commit_activity';

    var xhr = new XMLHttpRequest();
    xhr.open('GET', apiUrl);
    xhr.setRequestHeader('Accept', 'application/vnd.github+json');

    xhr.setRequestHeader('X-GitHub-Api-Version', '2022-11-28');
    xhr.onreadystatechange = function () {
        if (xhr.readyState === XMLHttpRequest.DONE && xhr.status === 200) {
            var response = JSON.parse(xhr.responseText);
            var data = response.map(function (week) {
                return week.days.map(function (day) {
                    return day;
                });
            });

            var heatmapContainer = document.querySelector('.heatmap-container');
            data.forEach(function (week, weekIndex) {
                week.forEach(function (contributions, dayIndex) {
                    var heatmapBlock = document.createElement('div');
                    heatmapBlock.classList.add('heatmap-block');
                    heatmapBlock.style.backgroundColor = getHeatmapColor(contributions);
                    heatmapBlock.title = getDateString(weekIndex, dayIndex) + ": " + contributions + " contributions";
                    if(contributions!=0)
                    {
                        document.getElementById('updateDate').innerHTML = getDateString(weekIndex, dayIndex);
                    }
                    heatmapContainer.appendChild(heatmapBlock);
                });
            });
        }
    };
    xhr.send();
}

function getHeatmapColor(contributions) {
    var color = '#ebedf0'; // Default color for no contributions

    if (contributions > 0 && contributions <= 10) {
        color = '#9be9a8';
    } else if (contributions > 10 && contributions <= 20) {
        color = '#40c463';
    } else if (contributions > 20 && contributions <= 30) {
        color = '#30a14e';
    } else if (contributions > 30 && contributions <= 40) {
        color = '#216e39';
    } else if (contributions > 40) {
        color = '#0a532e';
    }

    return color;
}

function getDateString(weekIndex, dayIndex) {
    var startDate = new Date();
    startDate.setDate(startDate.getDate() - (52 * 7 - (weekIndex * 7 + dayIndex)));
    var day = startDate.getDate();
    var month = startDate.getMonth() + 1;
    var year = startDate.getFullYear();
    if(day<10)
    day="0"+day;
    if (month< 10)
        month = "0" + month;
    return year + '-' + month + '-' + day;
}

// Create a function to make the AJAX call
function getProjectUsers() {
    // Create a new XMLHttpRequest object
    var xhr = new XMLHttpRequest();

    // Set up the request
    xhr.open('GET', '../php/get_project_users.php?id='+project_id, true);

    // Set the response type
    xhr.responseType = 'json';

    // Set up the onload function to handle the response
    xhr.onload = function () {
        // Check if the request was successful
        if (xhr.status === 200) {
            // Get the response data
            var responseData = xhr.response;

            // Get the card holder element
            var cardHolder = document.getElementById('card_holder');

            // Iterate over the response data
            responseData.forEach(function (user) {
                // Create a new card element
                var card = document.createElement('div');
                card.className = 'card';

                // Create the card content
                var cardContent = `
          <div class="card_left">
            <img class="card_avatar" id="avatar" src="${user.avatar}"/>
            <div class="card_name_block">
              <div class="card_name" id="card_name">${user.f_name} ${user.l_name}</div>
              <div><b1>Github:</b1><a id="card_github" href="https://github.com/${user.github}">https://github.com/${user.github}</a></div>
            </div>
          </div>
          <div>
            <div><b1>Role:</b1> <span id="startDate">${user.role}</span></div>
            <div><b1>Tech Stack:</b1> <span id="updateDate">${user.tech_stack}</span></div>
          </div>
          <div>
            <div><b1>Joined On:</b1> <span id="startDate">${user.joined_on}</span></div>
            <div><b1>Last Contribution On:</b1> <span id="updateDate"></span></div>
          </div>
        `;

                // Set the card content
                card.innerHTML = cardContent;

                // Append the card to the card holder
                cardHolder.appendChild(card);
            });
        }
    };

    // Send the request
    xhr.send();
}

// Call the function to fetch project users and populate the card holders

window.onload=function()
{
    for (var i = 1; i <= 6; i++) {
        var temp = document.getElementById(i);
        var url = '../html/view_project.html?page=' + i + '&id=' + project_id;
        temp.href=url;

    }
}
var project_id = getParameterByName('id');
var page = getParameterByName('page');
var key = "";
$.ajax({
    url: "../php/get_keys.php",
    type: "GET",
    success: function (data) {
        key = data;
    }
});


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
    repoName = "taskmanager-ccs";
    var apiUrl = 'https://api.github.com/repos/' + repoOwner + '/' + repoName + '/stats/commit_activity';

    var xhr = new XMLHttpRequest();
    xhr.open('GET', apiUrl);
    xhr.setRequestHeader('Accept', 'application/vnd.github+json');
    xhr.setRequestHeader('Authorization', 'Bearer ' + key);
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
                    if (contributions != 0) {
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
    const currentDate = new Date();
    const currentYear = currentDate.getFullYear();
    const currentMonth = currentDate.getMonth();
    const currentDay = currentDate.getDate();
    const currentDayOfWeek = currentDate.getDay();
    const firstDayOfYear = new Date(currentYear, 0, 1);

    // Calculate the offset for the first day of the week
    const firstDayOfWeekOffset = (7 + currentDayOfWeek - 1) % 7;

    // Calculate the number of days to subtract to get the first day of the week
    const daysToSubtract = (currentDayOfWeek + 7 - dayIndex) % 7;

    // Calculate the date of the first day of the target week
    const firstDayOfTargetWeek = new Date(
        currentYear,
        currentMonth,
        currentDay - firstDayOfWeekOffset - daysToSubtract + 1
    );

    // Calculate the date of the target day within the target week
    const targetDate = new Date(
        firstDayOfTargetWeek.getFullYear(),
        firstDayOfTargetWeek.getMonth(),
        firstDayOfTargetWeek.getDate() + (weekIndex * 7) + dayIndex
    );

    return targetDate;
}

function get_contributions(repo) {
    var owner = 'akarsh911';
    repo = "taskmanager-ccs";
    // const repo = 'taskmanager-ccs';
    const apiUrl = `https://api.github.com/repos/${owner}/${repo}/contributors`;
    fetch(apiUrl, {

    })
        .then(response => response.json())
        .then(data => {
            const labels = data.map(contributor => contributor.login);
            const values = data.map(contributor => contributor.contributions);
            const chart = new Chart('chart', {
                type: 'bar',
                data: {
                    labels: labels,
                    datasets: [{
                        label: 'Contributions',
                        data: values,
                        backgroundColor: 'rgba(75, 192, 192, 0.6)',
                        borderColor: 'rgba(75, 192, 192, 1)',
                        borderWidth: 1
                    }]
                },
                options: {
                    scales: {
                        y: {
                            beginAtZero: true
                        }
                    }
                }
            });
        })
        .catch(error => console.error(error));
    const twoWeeksAgo = new Date();
    twoWeeksAgo.setDate(twoWeeksAgo.getDate() - 14);

    // Create an array to store daily commit data
    const dailyCommitData = Array.from({ length: 14 }, () => 0);

    const apiUrl2 = `https://api.github.com/repos/${owner}/${repo}/stats/commit_activity`;
    fetch(apiUrl2, {})
        .then(response => response.json())
        .then(data => {
            // Extract week labels and commit counts for the last two weeks
            const lastTwoWeeksData = data.slice(-2); // Get the last two elements from the data array
            const labels = lastTwoWeeksData.map(weekData => {
                const startDate = new Date(weekData.week * 1000);
                const endDate = new Date((weekData.week + 6 * 24 * 60 * 60) * 1000);
                return `${startDate.toLocaleDateString()} - ${endDate.toLocaleDateString()}`;
            });
            const values = lastTwoWeeksData.map(weekData => weekData.total);

            // Create a line chart
            const chart = new Chart('chart2', {
                type: 'line',
                data: {
                    labels: labels,
                    datasets: [
                        {
                            label: 'Commit Activity',
                            data: values,
                            fill: false,
                            borderColor: 'rgba(75, 192, 192, 1)',
                            borderWidth: 1,
                        },
                    ],
                },
                options: {
                    scales: {
                        y: {
                            beginAtZero: true,
                        },
                    },
                },
            });
        })
        .catch(error => console.error(error));


    const apiUrl3 = `https://api.github.com/repos/${owner}/${repo}/stats/code_frequency`;

    // Fetch code frequency data
    fetch(apiUrl3, {

    })
        .then(response => response.json())
        .then(data => {
            // Extract week labels and additions/deletions counts
            const labels = data.map(weekData => {
                const date = new Date(weekData[0] * 1000);
                return `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;
            });
            const additions = data.map(weekData => weekData[1]);
            const deletions = data.map(weekData => -weekData[2]); // Convert deletions to negative values for the chart

            // Create a line chart
            const chart = new Chart('chart3', {
                type: 'line',
                data: {
                    labels: labels,
                    datasets: [
                        {
                            label: 'Additions',
                            data: additions,
                            fill: false,
                            borderColor: 'rgba(75, 192, 192, 1)',
                            borderWidth: 1
                        },
                        {
                            label: 'Deletions',
                            data: deletions,
                            fill: false,
                            borderColor: 'rgba(255, 99, 132, 1)',
                            borderWidth: 1
                        }
                    ]
                },
                options: {
                    scales: {
                        y: {
                            beginAtZero: true
                        }
                    }
                }
            });
        })
        .catch(error => console.error(error));
    const apiUrl4 = `https://api.github.com/repos/${owner}/${repo}/languages`;

    // Fetch language data
    fetch(apiUrl4, {
        headers: {
            'Accept': 'application/vnd.github+json',
            'X-GitHub-Api-Version': '2022-11-28'
        }
    })
        .then(response => response.json())
        .then(data => {
            // Extract language names and their respective bytes of code
            const labels = Object.keys(data);
            const values = Object.values(data);

            // Create a pie chart
            const chart = new Chart('chart4', {
                type: 'doughnut',
                data: {
                    labels: labels,
                    datasets: [{
                        data: values,
                        backgroundColor: [
                            'rgba(255, 99, 132, 0.6)',
                            'rgba(54, 162, 235, 0.6)',
                            'rgba(255, 206, 86, 0.6)',
                            'rgba(75, 192, 192, 0.6)',
                            'rgba(153, 102, 255, 0.6)',
                            'rgba(255, 159, 64, 0.6)',
                            'rgba(245, 66, 222, 0.6)'
                        ]
                    }]
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: true
                }
            });
        })
        .catch(error => console.error(error));


}
// Create a function to make the AJAX call
function getProjectUsers() {
    // Create a new XMLHttpRequest object
    var xhr = new XMLHttpRequest();

    // Set up the request
    xhr.open('GET', '../php/get_project_users.php?id=' + project_id, true);

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

window.onload = function () {
    for (var i = 1; i <= 10; i++) {
        var temp = document.getElementById(i);
        var url = '../html/view_project.html?page=' + i + '&id=' + project_id;
        temp.href = url;

    }
    if (page == 1) {

        document.getElementById("about").style.display = "block";
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
    if (page == 3) {
        document.getElementById("team").style.display = "block";
        getProjectUsers();
    }
    if (page == 2) {
        var xhr = new XMLHttpRequest();
        document.getElementById("stats").style.display = "block";
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
                /*document.getElementById('project_name').innerHTML = response.project_name;
                document.getElementById('team_leader_id').innerHTML = response.team_leader;
                document.getElementById('Progress').innerHTML = response.progress;
                document.getElementById('startDate').innerHTML = response.start_date;
                document.getElementById('updateDate').innerHTML = response.update_date;
                document.getElementById('repo_url').innerHTML = "https://github.com/ccs-tiet-task/" + response.repo_name;
                document.getElementById('url').href = "https://github.com/ccs-tiet-task/" + response.repo_name;
                document.getElementById('descripton').innerHTML = response.description;*/
                $(document).ready(function () { /* code here */
                    get_contributions(response.repo_name);
                });

            }
        };

        // Send the AJAX request
        xhr.send();

    }

    if (page == 4) {
        document.getElementById("tasks").style.display = "block";
        load_my_assigned_tasks();
    }

    if (page == 7) {

        document.getElementById("add_team").style.display = "block";
        find_all_users();
    }
    if (page == 8) {

        document.getElementById("remove_team").style.display = "block";
        // find_all_users();
        find_all_users2();
    }
    if (page == 9) {

        document.getElementById("assign_task").style.display = "block";
        // find_all_users();
        //find_all_users2();
        find_all_users3();
    }
}


function filterFunction() {
    document.getElementById("myDropdown").classList.toggle("show");
    var input, filter, ul, li, a, i;
    input = document.getElementById("myInput");
    filter = input.value.toUpperCase();
    div = document.getElementById("myDropdown");
    a = div.getElementsByTagName("a");
    for (i = 0; i < a.length; i++) {
        txtValue = a[i].textContent || a[i].innerText;
        if (txtValue.toUpperCase().indexOf(filter) > -1) {
            a[i].style.display = "";
        } else {
            a[i].style.display = "none";
        }
    }
}

function find_all_users() {

    fetch('../php/get_all_users.php')
        .then(response => response.json())
        .then(users => {
            users.forEach(user => {

                const card = document.createElement('a');
                card.setAttribute('id', "user_id_" + user.id);
                card.onclick = function () {
                    select_user(card.id, card.innerText);
                }
                card.textContent = `${user.f_name} ${user.l_name}`;
                document.getElementById("myDropdown").appendChild(card);
            });
        })
        .catch(error => {
            console.error('Error:', error);
        });
}

function select_user(id, text) {
    filterFunction();
    //  alert(id);
    document.getElementById("myInput").value = text;
    document.getElementById("user_params").style.display = "block";
    document.getElementById("user_id").value = id.substr(8);
    document.getElementById("project_id").value = project_id;
    // 
}

function filterFunction2() {
    document.getElementById("myDropdown2").classList.toggle("show");
    var input, filter, ul, li, a, i;
    input = document.getElementById("myInput2");
    filter = input.value.toUpperCase();
    div = document.getElementById("myDropdown2");
    a = div.getElementsByTagName("a");
    for (i = 0; i < a.length; i++) {
        txtValue = a[i].textContent || a[i].innerText;
        if (txtValue.toUpperCase().indexOf(filter) > -1) {
            a[i].style.display = "";
        } else {
            a[i].style.display = "none";
        }
    }
}

function find_all_users2() {

    fetch('../php/get_project_users.php?id=' + project_id)
        .then(response => response.json())
        .then(users => {
            users.forEach(user => {

                const card = document.createElement('a');
                card.setAttribute('id', "dser_id_" + user.user_id);
                card.onclick = function () {
                    delete_user(card.id, card.innerText);
                }
                card.textContent = `${user.f_name} ${user.l_name}`;
                document.getElementById("myDropdown2").appendChild(card);
            });
        })
        .catch(error => {
            console.error('Error:', error);
        });
}

function delete_user(id, text) {
    filterFunction2();
    //  alert(id);
    document.getElementById("myInput2").value = text;
    document.getElementById("user_id2").value = id.substr(8);
    document.getElementById("project_id2").value = project_id;
    // 
}

function filterFunction3() {
    document.getElementById("myDropdown3").classList.toggle("show");
    var input, filter, ul, li, a, i;
    input = document.getElementById("myInput3");
    filter = input.value.toUpperCase();
    div = document.getElementById("myDropdown3");
    a = div.getElementsByTagName("a");
    for (i = 0; i < a.length; i++) {
        txtValue = a[i].textContent || a[i].innerText;
        if (txtValue.toUpperCase().indexOf(filter) > -1) {
            a[i].style.display = "";
        } else {
            a[i].style.display = "none";
        }
    }
}

function find_all_users3() {

    fetch('../php/get_project_users.php?id=' + project_id)
        .then(response => response.json())
        .then(users => {
            users.forEach(user => {

                const card = document.createElement('a');
                card.setAttribute('id', "lser_id_" + user.user_id);
                card.onclick = function () {
                    task_user(card.id, card.innerText);
                }
                card.textContent = `${user.f_name} ${user.l_name}`;
                document.getElementById("myDropdown3").appendChild(card);
            });
        })
        .catch(error => {
            console.error('Error:', error);
        });
}

function task_user(id, text) {
    filterFunction3();
    //  alert(id);
    document.getElementById("myInput3").value = text;
    document.getElementById("user_id3").value = id.substr(8);
    document.getElementById("project_id3").value = project_id;
    document.getElementById("leader_id3").value = JSON.parse(localStorage.getItem("user_data")).user_id;
    // 
}

function load_my_assigned_tasks() {
    const cardHolder1 = document.getElementById('card_holders');
    console.log(cardHolder1);
    // Make an API call to retrieve the data
    fetch('http://localhost/php/get_my_tasks_project.php?user_id=1&project_id=1')
        .then(response => response.json())
        .then(responseData => {


            for (let i = 0; i < responseData.length; i++) {
                const task = responseData[i];
                const card = document.createElement('div');
                card.classList.add('card');
                const cardContent1 = document.createElement('div');
                const cardName = document.createElement('div');
                cardName.classList.add('card_name');
                cardName.innerText = task.title;
                cardContent1.appendChild(cardName);
                const description = document.createElement('div');
                description.innerHTML = `<b1>Description:</b1>${task.description}`;
                cardContent1.appendChild(description);
                card.appendChild(cardContent1);
                const cardContent2 = document.createElement('div');
                const assignedOn = document.createElement('div');
                assignedOn.innerHTML = `<b1>Assigned On:</b1> <span>${task.assigned_date}</span>`;
                cardContent2.appendChild(assignedOn);
                const deadline = document.createElement('div');
                deadline.innerHTML = `<b1>Deadline:</b1> <span>${task.deadline}</span>`;
                cardContent2.appendChild(deadline);
                const assignedBy = document.createElement('div');
                assignedBy.innerHTML = `<b1>Assigned By:</b1> <span>${task.leader_name}</span>`;
                cardContent2.appendChild(assignedBy);
                card.appendChild(cardContent2);
                const cardContent3 = document.createElement('div');
                const markTaskDoneLink = document.createElement('a');
                markTaskDoneLink.href = `../php/mark_task_done.php?id=${task.id}`;
                const doneButton = document.createElement('button');
                doneButton.classList.add('done');
                const icon = document.createElement('i');
                icon.classList.add('fa', 'fa-check');
                doneButton.appendChild(icon);
                markTaskDoneLink.appendChild(doneButton);
                cardContent3.appendChild(markTaskDoneLink);
                card.appendChild(cardContent3);
                cardHolder1.appendChild(card);
            }
        })
        .catch(error => {
            console.error('Error:', error);
        });


}
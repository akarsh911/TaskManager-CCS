$(document).ready(function () {
    $.ajax({
        url: '../php/get_project_users.php?='+JSON.parse(localStorage.getItem("user_data")).user_id,
        method: 'GET',
        dataType: 'json',
        success: function (projects) {
            // Iterate over each project
            projects.forEach(function (project) {
                // Create the HTML content for the project
                var htmlContent = `
          <div class="app_container" style="border-color: ${getStatusColor(project.status)};">
            <div class="app_wrapper">
                <div class="app_data"><span class="app_title">Project Name: </span>
                    ${project.project_name}
                </div>
                <div class="app_data"><span class="app_title">Repository Name: </span>
                    ${project.repo_name}
                </div>
                <div class="app_data"><span class="app_title">Team Leader: </span>
                    ${project.team_leader}
                </div>
            </div>
            <div class="app_wrapper_left">
                <div class="app_data"><span class="app_title">Project Description: </span>
                    ${project.description}
                </div>
            </div>
            <div class="app_wrapper">
                <div class="app_data"><span class="app_title">Start Date: </span>
                    ${project.start_date}
                </div>
                <div class="app_data"><span class="app_title">Last Update: </span>
                    ${project.update_date}
                </div>
                <div class="app_data"><span class="app_title">Status: </span>
                    ${project.status}
                </div>
            </div>
            <hr>
            <div class="app_wrapper_right">
                    <button class="incomplete_bt" onclick="javascript:location.href='../html/view_project.html?page=1&id=${project.id}';">View Project</button>
            </div>
        </div>
        `;

                // Append the HTML content to the app_container element
                $('.app_box').append(htmlContent);
            });
        },
        error: function (xhr, status, error) {
            console.error(error);
        }
    });
});

function getStatusColor(status) {
    if (status === '1') {
        return '#002B5B';
    } else if (status === '2') {
        return '#05BFDB';
    } else if (status === '0') {
        return '#00FFCA';
    } else {
        return 'black'; // Default color if status is not recognized
    }
}

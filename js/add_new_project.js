var names = document.getElementById("name");
var repo_name = document.getElementById("repo_name");
var desc = document.getElementById("desc");
var team_leader = document.getElementById("team_leader_id");

const isValidGitHubRepo = (repoName) => {
    const regex = /^[a-zA-Z0-9._-]+$/;
    return regex.test(repoName);
};


function name_key() {
    if (names.value == "") {
        var msg = "Enter a Project Name";
        var err_msg = document.getElementById("name_err_msg");
        err_msg.innerHTML = msg;
        things_bad("name", names);
        names.setCustomValidity(msg);
        return;
    }
    else {
        set_team_leader()
        things_good("name", names);
        names.setCustomValidity("");
        var err_msg = document.getElementById("name_err_msg");
        err_msg.innerHTML = "";
    }
}
function repo_name_key() {
    if(repo_name.value=="")
    {
        var msg = "Enter a valid repo name";
        var err_msg = document.getElementById("repo_name_err_msg");
        err_msg.innerHTML = msg;
        things_bad("repo", repo_name);
        repo_name.setCustomValidity(msg);
        return;
    }
    if (isValidGitHubRepo(repo_name.value)) {
        $.ajax({
            url: "https://api.github.com/repos/ccs-tiet-task/" + repo_name.value,
            type: "GET",
            headers: {
                'Accept': 'application/vnd.github+json',
                'X-GitHub-Api-Version': '2022-11-28'
            },
            success: function (data) {
                console.log(data)
                if (data.id == "") {
                    things_good("repo", repo_name);
                    set_team_leader();
                    return;
                }
                else {
                    var msg = "This Repo Name has Already been used";
                    var err_msg = document.getElementById("repo_name_err_msg");
                    err_msg.innerHTML = msg;
                    things_bad("repo", repo_name);
                    repo_name.setCustomValidity(msg);
                    return;
                }
            },
            error: function (XMLHttpRequest, textStatus, errorThrown) {
                things_good("repo", repo_name);
                repo_name.setCustomValidity("");
                var err_msg = document.getElementById("repo_name_err_msg");
                err_msg.innerHTML = "";
                return;
            }
        });

    }
    else {
        var msg = "Not a valid Github Repository Name";
        var err_msg = document.getElementById("repo_name_err_msg");
        err_msg.innerHTML = msg;
        things_bad("repo", repo_name);
        repo_name.setCustomValidity(msg);
        return;
    }
}
function set_team_leader() {
    team_leader.value = JSON.parse(localStorage.getItem("user_data")).user_id;
}
function desc_key() {
    if (desc.value.length < 30) {
        var msg = "Give a valid description greater than 30 characters";
        var err_msg = document.getElementById("desc_err_msg");
        err_msg.innerHTML = msg;
        things_bad("desc", desc);
        desc.setCustomValidity(msg);
        return;
    }
    else {
        things_good("desc", desc);
        desc.setCustomValidity("");
        var err_msg = document.getElementById("desc_err_msg");
        err_msg.innerHTML = "";
        set_team_leader();
        return;
    }
}
function things_good(id, elem) {
    elem.classList.remove("error");
    var err_key = document.getElementById(id + "_err");
    console.log(err_key);
    err_key.classList.remove("fa-exclamation-circle");
    err_key.classList.add("fa-circle-check");
    err_key.classList.add("fa-solid");
    err_key.classList.add("good");
    elem.classList.add("all_good");

}
function things_bad(id, elem) {
    var err_key = document.getElementById(id + "_err");
    elem.classList.remove("all_good");
    err_key.classList.add("fa-exclamation-circle");
    err_key.classList.remove("fa-circle-check");
    err_key.classList.remove("fa-solid");
    err_key.classList.remove("good");
    err_key.style.visibility = "visible";
    console.log(err_key);
    elem.classList.add("error");
}

var names = document.getElementById("name");
var repo_name = document.getElementById("repo_name");
var desc = document.getElementById("desc");
var key = "";
$.ajax({
    url: "../php/get_keys.php",
    type: "GET",
    success: function (data) {
        key = data;
    }
});
function name_key() {
    if (names.value == "") {
        var msg = "Enter a Project Name";
        var err_msg = document.getElementById("name_err_msg");
        err_msg.innerHTML = msg;
        things_bad("email", names);
        names.setCustomValidity(msg);
        return;
    }
    else {
        things_good("email", names);
        names.setCustomValidity("");
        var err_msg = document.getElementById("names_err_msg");
        err_msg.innerHTML = "";
    }
}
function repo_name_key() {
    if (isValidGitHubRepo(repo_name.value)) {
        $.ajax({
            url: "https://api.github.com/repos/ccs-tiet-task/" + repo_name.value,
            type: "GET",
            headers: {
                'Accept': 'application/vnd.github+json',
                'Authorization': 'Bearer '+key,
                'X-GitHub-Api-Version': '2022-11-28'
            },
            success: function (data) {
                console.log(data)
                if (data.id == "") {
                    things_good("email", repo_name);
                    return;
                }
                else {
                    var msg = "This Repo Name has Already been used";
                    var err_msg = document.getElementById("repo_name_err_msg");
                    err_msg.innerHTML = msg;
                    things_bad("email", repo_name);
                    repo_name.setCustomValidity(msg);
                    return;
                }
            },
            error: function (XMLHttpRequest, textStatus, errorThrown) {
                things_good("email", repo_name);
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
        things_bad("email", repo_name);
        repo_name.setCustomValidity(msg);
        return;
    }
}
function desc_key() {
    if (desc.value.length < 30) {
        var msg = "Give a valid description greater than 30 characters";
        var err_msg = document.getElementById("desc_err_msg");
        err_msg.innerHTML = msg;
        things_bad("email", desc);
        desc.setCustomValidity(msg);
        return;
    }
    else {
        things_good("email", desc);
        desc.setCustomValidity("");
        var err_msg = document.getElementById("desc_err_msg");
        err_msg.innerHTML = "";
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
const isValidGitHubRepo = (repoName) => {
    const regex = /^[a-zA-Z0-9._-]+$/;
    return regex.test(repoName);
};

var data = sessionStorage.getItem("err");
if (data != "" && data != null) {

    data = JSON.parse(data);
    if (data.val != null && data.val != "") {
        document.getElementById("password_error").innerText = data.val;
        document.getElementById("password_error").style.visibility = "visible";
    }
}
function change_pwd() {
    var chng = document.getElementById("chng");
    var but = document.getElementById("pwd");
    if (but.type == "password") {
        chng.innerHTML = '<i class="fa-solid fa-eye-slash"></i>';
        but.type = "text";
    }
    else {
        chng.innerHTML = '<i class="fa fa-eye"></i>';
        but.type = "password";
    }
}


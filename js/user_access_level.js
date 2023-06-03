let data3 = JSON.parse(window.localStorage.getItem('user_data'));
if (data3 != null) {
    var user = data3.user_type;
    console.log(data3);
    if (user == 0) {
        document.getElementById("pbr").style.display = "none";
        document.getElementById("doc").style.display = "none";
        document.getElementById("pbr").style.display = "none";
        document.getElementById("ambu").style.display = "none";
        document.getElementById("log").style.display = "none";
        document.getElementById("pbr").style.display = "none";
        document.getElementById("ambu").style.display = "none";
        document.getElementById("log").style.display = "none";
        document.getElementById("doc").style.display = "none";
        document.getElementById("ip2").style.display = "none";
        document.getElementById("ip3").style.display = "none"
    }
    else if (user == 2) {
        document.getElementById("pbr").style.visibility = "collapse";
        document.getElementById("log").style.visibility = "collapse";
        document.getElementById("doc").style.visibility = "collapse";
        document.getElementById("ambu").style.visibility = "collapse";
        document.getElementById("pbr").style.display = "none";
        document.getElementById("ambu").style.display = "none";
        document.getElementById("log").style.display = "none";
        document.getElementById("doc").style.display = "none";
        document.getElementById("ip2").style.display = "none";
        document.getElementById("ip3").style.display = "none"
    }
    else if (user == 3) {
        document.getElementById("pbr").style.visibility = "collapse";
        document.getElementById("log").style.visibility = "collapse";
        document.getElementById("ambu").style.visibility = "collapse";
        document.getElementById("pbr").style.display = "none";
        document.getElementById("ambu").style.display = "none";
        document.getElementById("log").style.display = "none";
        document.getElementById("ip2").style.display = "none";
        document.getElementById("ip3").style.display = "none"
    }
    else if (user == 1) {
        document.getElementById("pbr").style.visibility = "collapse";
        document.getElementById("doc").style.visibility = "collapse";
        document.getElementById("pbr").style.display = "none";
        document.getElementById("doc").style.display = "none";
        document.getElementById("ip2").style.display = "none";
        document.getElementById("ip3").style.display = "none"
    }
}
else {
    document.getElementById("bar").style.visibility = "hidden";
    document.getElementById("ip1").style.display = "none";
    document.getElementById("ip2").style.display = "none";
    document.getElementById("ip3").style.display = "block"
}

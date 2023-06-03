function fetch() {
    $.ajax({
        url: "https://api.github.com/user/repos",
        type: "GET",
        headers: {
            'Accept': 'application/vnd.github+json',
            'Authorization': 'Bearer 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',
            'X-GitHub-Api-Version': '2022-11-28'
        },
        success: function (msg) {
            if (msg != null) {
                alert(msg.toString());
            }
        }
    });
}
fetch();
$("body").on("click", ".share_else", function share_a() {
    console.log(token)
    $.ajax({
        url: "",
        type: "post",
        data: {
            "****": "***",
        
        },
        async: true,
        success: function (result) {
            alert(msg);
        },
        error: function () {
            return false;
        }
    });
});

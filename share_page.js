$("body").on("click", ".success_share", function share_a() {
    console.log(token)
    $.ajax({
        url: "http://192.168.4.53/index.php?m=invform&c=phone&a=index",
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

$(document).ready(function () {
    $(".yaoqing_span1").html($('#name').val() + ",邀请您参加");
    $(".banner2").css("margin-top", " 20px")

})
var share_id =null;
$(document).ready(function () {
$.get('http://192.168.4.53/index.php?m=invform&c=phone&a=index',function(msg){
    share_id= msg.id
})    
})
$(document).ready(function () {
    $.ajax({
        type: 'post',
        url: 'http://192.168.4.53/index.php?m=invform&c=phone&a=index',
        dataType: "json",
        data:{
            "share_id":share_id
        },
        success: function () {
            
        }, error: function () {
            return false;
        }
    })      
})

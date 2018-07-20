$('.info_share').click(function sendMessage() {
  
    var username = $('.username').val();
    var phonenum = $('.phone_num1').val();
    $.ajax({
        type: "post",
        dataType: "json",
        url: 'http://192.168.4.50/index.php?m=invform&c=phone&a=logon',
        data: {
            "user_name": username,
            "phonenum": phonenum,

        },
        error: function () {
            return false;
        },
        success: function (msg) {
           
           

        }
    });
});

// 获取token转化为cookie

function setCookie(c_name, value, expiredays) {
    var exdate = new Date()
    exdate.setDate(exdate.getDate() + expiredays)
    document.cookie = c_name + "=" + escape(value) +
        ((expiredays == null) ? "" : "; expires=" + exdate.toGMTString())
}


function getCookie(c_name) {
    if (document.cookie.length > 0) {
        c_start = document.cookie.indexOf(c_name + "=")
        if (c_start != -1) {
            c_start = c_start + c_name.length + 1
            c_end = document.cookie.indexOf(";", c_start)
            if (c_end == -1) c_end = document.cookie.length
            return unescape(document.cookie.substring(c_start, c_end))
        }
    }
    return ""
}

var token = null;
var share_id = null;
var id = null;
var name = null;
var title = null;
var s_phone = null;
var share_id1 = null
$(document).ready(function () {
    token = getCookie("token");
    var url3 = window.location.href;
    var share_id = url3.split("share_id=")[1];
    if (share_id !== null) {
        $.ajax({
            type: 'POST',
            async: true,
            url: 'http://192.168.4.53/index.php?m=invform&c=phone&a=index',
            data: {
                'token': token,
                'share_id': share_id

            },
            dataType: 'json',

            error: function () {

                return false;
            },
            success: function (msg) {
                // if(msg.code==10002){}
                id = msg.id;
                name = msg.name;
                if (msg.state == 1) {
                    $(".form2").show();
                    $(".form1").hide();
                    $(".form3").hide();
                    share_id = msg.share_id;
                    id = msg.id;
                    console.log(msg.name)

                    s_phone = msg.phone;
                } else if (msg.state == 2) {
                    $(".form1").show();
                    $(".form2").hide();
                    $(".form3").hide();
                } else if (msg.state == 3) {
                    $(".form1").show();
                    $(".form2").hide();
                    $(".form3").hide();
                }
                $(".h1_1").html(msg.h1);
                $(".h1_2").html(msg.h2);

                $("#loading1").remove();
                $(".max_box").css("display", "block");
                setCookie("token", msg.token);
            }
        });
    } else {
        $.ajax({
            type: 'POST',
            async: true,
            url: 'http://192.168.4.53/index.php?m=invform&c=phone&a=index',
            data: {
                token: token,
                "share_id": share_id,
            },
            dataType: 'json',
            error: function () {
                return false;
            },
            success: function (msg) {
                // if(msg.code==10002){}
                id = msg.id;
                name = msg.name;
                if (msg.state == 1) {
                    $(".form2").show();
                    $(".form1").hide();
                    $(".form3").hide();
                    share_id = msg.share_id;
                    id = msg.id;
                    console.log(msg.name)

                    s_phone = msg.phone;
                } else if (msg.state == 2) {
                    $(".form1").show();
                    $(".form2").hide();
                    $(".form3").hide();
                } else if (msg.state == 3) {
                    $(".form1").show();
                    $(".form2").hide();
                    $(".form3").hide();
                }
                $("#loading1").remove();
                $(".max_box").css("display", "block");
                setCookie("token", msg.token);
            }
        });
    }

});
//获取验证码
$("body").on("click", ".ames", function click1() {
    var url1 = window.location.href;
    var str = url1.split("share_id=")[1];
    var phonename = $("#name1").val();
    var phone = $("#phone1").val();
    var idlogon = $('#idlogo1').val();
    token = getCookie("token");
    // console.log(str);
    $.ajax({
        url: 'http://192.168.4.53/index.php?m=invform&c=phone&a=send_mes',
        type: 'POST',
        data: {
            'name': phonename,
            'phone': phone,
            'token': token,
            'share_id': str
        },
        dataType: 'json',
        success: function (msg) {
            if (msg.state == 1) {
                $(".form2").show();
                $(".form1").hide();
                $(".form3").hide();
                share_id = msg.share_id;
                id = msg.id;
                console.log(msg.name)

                s_phone = msg.phone;
            } else if (msg.state == 2) {
                $(".form1").show();
                $(".form2").hide();
                $(".form3").hide();
            } else if (msg.state == 3) {
                $(".form1").show();
                $(".form2").hide();
                $(".form3").hide();
            }
            if (msg.code == 10005) {
                var time1 = 60;
                $(".ames").removeClass;
                $(".ames").html("(" + time1 + "秒)");
                setTime = setInterval(
                    function () {
                        if (time1 > 0) {
                            time1--;
                            $(".ames").html("(" + time1 + "秒)");
                            $(".ames").unbind("click", click1);
                        } else {
                            $(".ames").bind("click", click1);
                            $(".ames").text("重新获取");
                            $(".ames").removeAttr("disabled");
                            clearInterval(setTime);
                        }
                    }, 1000);
                alert(msg.message)
            } else if (token !== null) {
                alert(msg.message);
                return false;
            }
        },
        error: function (msg) {
            return false;
        }
    });
});

//点击报名
$(".submit1").bind("click", function sendMessage() {
    var phonename = $("#phone1").val();
    var idlogon = $('#idlogo1').val();
    $.ajax({
        type: "post",
        dataType: "json",
        url: 'http://192.168.4.53/index.php?m=invform&c=phone&a=logon',
        data: {
            "phone": phonename,
            "code": idlogon,
            "token": token,
        },
        error: function () {
            return false;
        },
        success: function (msg) {
            if (msg.code == 10009) {
                id = msg.id;
                name = msg.name;
                $(".form1").hide();
                $(".form2").show();
            }
            alert(msg.message);
        }
    });
});

//页面1分享预览
$("body").on("click", ".share_else", function share_a() {
    var phonename = $("#name1").val();
    var phone = $("#phone1").val();
    var idlogon = $('#idlogo1').val();
    var url2 = window.location.href;
    var str1 = url2.split("id=")[1];
    $.ajax({
        url: "http://192.168.4.53/index.php?m=invform&c=phone&a=share_others_one",
        type: "post",
        dataType: "json",
        data: {
            'id': id,
            'name': phonename,
            'idlogon': idlogon,
            'phone': phone,

        },
        async: true,
        success: function (msg) {
            id = msg.id;
            if (msg.code == 10015) {
                $(".form1").hide();
                $(".form2").hide();
                $(".form3").show();
                $(".h1_1").css("margin-top", "20px");
                $(".submit1").css("width", "60%");
                $(".yaoqing_span").html(msg.name + ",邀请您参加");
                var url = $('url').value;
                window.history.pushState({}, 0, 'http://' + window.location.host + window.location.pathname + "?share_id=" + msg.id);
            } else if (msg.code == 10014) {
                alert(msg.message);
                $(".form2").hide();
                $(".form3").css("display", "none");
            } else {
                alert(msg.message)
            }
        },
        error: function () {
            return false;
        }
    });
});
//页面2分享预览
$("body").on("click", ".success_share", function share_a() {
    var phonename = $("#name1").val();
    var phone = $("#phone1").val();
    var idlogon = $('#idlogo1').val();
    var url2 = window.location.href;
    var str1 = url2.split("id=")[1];
    $.ajax({
        url: "http://192.168.4.53/index.php?m=invform&c=phone&a=share_others_two",
        type: "post",
        dataType: "json",
        data: {
            'id': id,
            'name': phonename,
        },
        async: false,
        success: function (msg) {
            $(".form1").hide();
            $(".form2").hide();
            $(".form3").show();
            $(".h1_1").css("margin-top", "20px");
            $(".submit1").css("width", "60%")
            $(".yaoqing_span").html(msg.name + ",邀请您参加");
            var url = $('url').value;
            window.history.pushState({}, 0, 'http://' + window.location.host + window.location.pathname + "?share_id=" + id);
            // window.location.href = "invite.html?" + share_id;     // $(".share_else").attr("href", "http://192.168.4.53/index.php?m=invform&c=phone&a=index?" + share_id)
        },
        error: function () {
            return false;
        }
    });

});


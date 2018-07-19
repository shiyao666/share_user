var name = $("#phone");
name = name.replace(/（/g, '(');
name = name.replace(/）/g, ')');
name = name.replace(/ /g, '');
function phone1($phoneInput) {
    var iphonenum = /^[1][3,4,5,7,8][0-9]{10}$/;
    if (!iphonenum.test($phoneInput.val())) {
        return false;
    } else {
        return true;
    }
}

function check_user_name(name) {
    var str2 = "合法";
    if (name == "") {
        str2 = "用户名为空";
        return str2;
    }
    else if ((name.length > 4) && (name.length < 8)) {
        str2 = "用户名长度不足";
        return str2;
    }
    else if (check_other_char(name)) {
        str2 = "不能含有特殊字符";
        return str2;
    }
    return str2;
}

function check_other_char(name) {
    var arr = ["&", "\\", "/", "*", ">", "<", "@", "!"];
    for (var i = 0; i < arr.length; i++) {
        for (var j = 0; j < name.length; j++) {
            if (arr[i] == name.charAt(j)) {
                return true;
            }
        }
    }
    return false;
}

$("body").on("click",".ames",function click1(){ 
    var phonename = $("#name").val();
    var phone = $("#phone").val();
    $.ajax({
        url: 'http://192.168.4.53/index.php?m=invform&c=phone&a=send_mes',
        type: 'POST',
        data: {
            'name': phonename,
            'phone': phone
        },
        dataType: 'json',
        success: function (msg) {

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
            } else {
                alert(msg.message);
            }
        },
        error: function (msg) {
            return false;
        }
    });
});


$(".submit1").bind("click",function sendMessage(){

    var uid = $('#phone').val();
    var idlogon = $('#idlogo').val();
    $.ajax({
        type: "post",
        dataType: "json",
        url: 'http://192.168.4.53/index.php?m=invform&c=phone&a=logon',
        data: {
            "phone": uid,
            "code": idlogon,
        },
        error: function () {
            return false;
        },
        success: function (msg) {
            if (msg.code == 10009) {
                $(".form").empty();
                $("#newform").addClass("newform1"),
                $("#newform").append("报名成功")
            }
            alert(msg.message);
        }
    });
});


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

$(document).ready(function () {

    setTimeout(function () {
        token = getCookie("token");
        $.ajax({
            type: 'POST',

            async: false,
            url: 'http://192.168.4.53/index.php?m=invform&c=phone&a=index',
            dataType: "json",
            data: {
                "token": token
            },
            error: function () {
                return false;
            },
            success: function (msg) {
                //
                setCookie("token", msg.token);
                // document.cookie = "token=" + msg.token + "; expire=" + exp.toGMTString();

            }

        });
    }, 5300);
});
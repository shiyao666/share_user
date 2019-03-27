// 获取url以及数据的 array
var address_data = new Array(["a", 2, "s"])
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
// global var
var token_user = null;
var share_id = null;
var id = null;
var name = null;
var title = null;
var s_phone = null;
var share_id1 = null;
var form_id = null;
var msg = null;
var state = null;
// 展示page1 隐藏其他
function show1() {
    $(".form1").show();
    $(".form2").hide();
    $(".form3").hide();

}
// 展示page2 隐藏其他
function show2() {
    console.log("dada");
    $(".form2").show();
    $(".form1").hide();
    $(".form3").hide();

}
// 展示page3 隐藏其他
function show3() {
    $(".form1").css("display", "none");
    $(".form2").css("display", "none");
    $(".form3").css("display", "block");
}
// 后台获取data数据 common js
function getcommon(msg, lead, lead, start_time, address, price, content, data, state) {
    if (msg.data.state == 1) {
        // 状态为1 显示page2 隐藏其他
        show2();
        share_id = msg.data.id;
        id = msg.data.id;
        s_phone = msg.data.phone;
    } else if (msg.data.state == 2) {
        // 状态为2 显示page1 隐藏其他
        show1();
        if (msg.code == 10021) {
            $('.yaoqing_span').html(msg.data.name + "邀请你参加");
            $(".span_1").html(msg.data.start_time);
            $(".span_2").html(msg.data.address);
            $(".span_3").html(msg.data.price);
            $(".content").html(msg.data.content);
            $(".h1_1").html(msg.data.lead);
        }
        if (msg.code == 10022) {
            $('.yaoqing_span').html(msg.data.lead);
            $(".span_1").html(msg.data.start_time);
            $(".span_2").html(msg.data.address);
            $(".span_3").html(msg.data.price);
            $(".content").html(msg.data.content);
            $(".h1_1").html(msg.data.lead);
        }
    } else if (msg.data.state == 3) {
        // 状态为3 显示page3 隐藏其他
        show3();
    }
}
// var str = window.location.href.split("share_id=")[1].split("&")[0];
// console.log(str);
// 获取token发送给index
$(document).ready(function () {
    token_user = getCookie("token_user");
    var url3 = window.location.href;
    if (url3.indexOf("share_id=") != -1) {
        var str = url3.split("share_id=")[1].split("&")[0];
    }
    var form_id = url3.split("form_id=")[1];
    // if条件判断是否存在share_id 
    if (token_user !== null && token_user !== undefined) {
        // 存在share_id
        $.ajax({
            type: 'POST',
            async: true,
            url: 'http://192.168.4.53/index.php?m=invform&c=phone&a=index',
            data: {
                'token_user': token_user,
                'share_id': str,
                'form_id': form_id
            },
            dataType: 'json',
            error: function () {
                return false;
            },  
            success: function (msg) {
                if (msg.code == 3) {
                    alert(msg.msg);
                    window.history.go(-1);
                }
                id = msg.data.id;
                name = JSON.stringify(msg.data.name);
                getcommon(msg);
                getCookie(msg.data.token_user);
                $("#loading1").remove();
                $(".max_box").css("display", "block");
                if (msg.data.token_user !== null && msg.data.token_user !== undefined) {
                    setCookie("token_user", msg.data.token_user);
                };
                $('.yaoqing_span').html(msg.data.name + "邀请您参加");
                $('.span_1').html(msg.data.start_time);
                $('.span_2').html(msg.data.address);
                $('.span_3').html(msg.data.price);
                $(".logo_img1").attr('src', msg.data.image);
                $(".max_box").css("background-image", 'url(' + msg.data.bg_image + ')');
            }
        });


    }
});
//获取验证码


$("body").on("click", ".ames", function click1() {
    token_user = getCookie('token_user');
    var url1 = window.location.href;
    if (url1.indexOf("share_id=") !== -1) {
        var str7 = url1.split("share_id=")[1].split("&")[0];
    }
    var str2 = url1.split("form_id=")[1];
    var phonename = $("#name1").val();
    var phone = $("#phone1").val();
    // 获取token_user
    token_user = getCookie("token_user");
    $.ajax({
        url: 'http://192.168.4.53/index.php?m=invform&c=phone&a=send_mes',
        type: 'POST',
        data: {
            'name': phonename,
            'phone': phone,
            'token_user': token_user,
            'share_id': str7,
            'form_id': str2
        },
        dataType: 'json',
        success: function (msg) {
            if (msg.code == 3) {
                alert(msg.msg);
                window.history.go(-1);
            }
            if (msg.data != null) {
                if (msg.data.state == 1) {
                    if (msg.code == 10004) {
                        show2();
                        share_id = msg.data.id;
                        id = msg.data.id;
                        s_phone = JSON.stringify(msg.data.phone);
                    }
                }
                else if (JSON.stringify(msg.data.state) == 2) {
                    show1();
                } else if (JSON.stringify(msg.data.state) == 3) {
                    show3();
                } else if (msg.code = 10003) {
                    alert(msg.msg);
                }
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
                alert(msg.msg)

            } else {
                alert(msg.msg)
            }
            // } else if (token_user !== null) {
            //     alert(msg.msg);

            // }
        },
        error: function (msg) {
            return false;
        }
    });
});

//点击报名
$(".submit2").bind("click", function sendMessage() {
    var phonename = $("#phone1").val();
    var idlogon = $('#idlogo1').val();
    var url1 = window.location.href;
    var str3 = url1.split("form_id=")[1];
    if (url1.indexOf("share_id=") != -1) {
        var str6 = url3.split("share_id=")[1].split("&")[0];
    }
    $.ajax({
        type: "post",
        dataType: "json",
        url: 'http://192.168.4.53/index.php?m=invform&c=phone&a=logon',
        data: {
            "phone": phonename,
            "code": idlogon,
            "token_user": token_user,
            'form_id': str3,
            'share_id': str6
        },
        error: function () {
            return false;
        },
        success: function (msg) {
            if (msg.code == 3) {
                alert(msg.msg);
                window.history.go(-1);
            }
            if (msg.code == 10009) {
                id = msg.data.id;
                name = JSON.stringify(msg.data.name);
                $(".form1").hide();
                $(".form2").show();
            }
            alert(msg.msg);
        }
    });
});

//页面1分享预览
$("body").on("click", ".share_else", function share_a() {
    var phonename = $("#name1").val();
    var phone = $("#phone1").val();
    var idlogon = $('#idlogo1').val();
    var url2 = window.location.href;
    var str1 = url2.split("form_id=")[1];
    if (url1.indexOf("share_id=") !== -1) {
        var str8 = url1.split("share_id=")[1].split("&")[0];
    }
    $.ajax({
        url: "http://192.168.4.53/index.php?m=invform&c=phone&a=share_others_one",
        type: "post",
        dataType: "json",
        data: {
            'id': id,
            'name': phonename,
            'idlogon': idlogon,
            'phone': phone,
            'form_id': str1,
            'share_id': str8
        },
        async: true,
        success: function (msg) {
            if (msg.code == 3) {
                alert(msg.msg);
                window.history.go(-1);
            }
            id = msg.data.id;
            if (msg.code == 10015) {
                show3();
                $(".h1_1").css("margin-top", "20px");
                $(".submit2").css("width", "60%");
                $(".yaoqing_span").html(JSON.stringify(msg.data.name) + ",邀请您参加");
                var url = $('url').value;
                window.history.pushState({}, 0, 'http://' + window.location.host + window.location.pathname + "?share_id=" + msg.data.id + "&form_id=" + str1);
            } else if (msg.code == 10014) {
                alert(msg.msg);
                $(".form2").hide();
                $(".form3").css("display", "none");
            } else {
                alert(msg.msg)
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
    var str1 = url2.split("form_id=")[1];
    if (url2.indexOf("share_id=") != -1) {
        var str5 = url2.split("share_id=")[1].split("&")[0];
    }
    $.ajax({
        url: "http://192.168.4.53/index.php?m=invform&c=phone&a=share_others_two",
        type: "post",
        dataType: "json",
        data: {
            'id': id,
            'name': phonename,
            'form_id': str1,
            'share_id': str5
        },
        async: false,
        success: function (msg) {
            if (msg.code == 3) {
                alert(msg.msg);
                window.history.go(-1);
            }
            $('.form2').hide();
            $('.form3').show();
            $(".h1_1").css("margin-top", "20px");
            $(".submit2").css("width", "60%")
            $(".yaoqing_span").html(msg.data.name + ",邀请您参加");
            var url = $('url').value;
            window.history.pushState({}, 0, 'http://' + window.location.host + window.location.pathname + "?share_id=" + msg.data.id + "&form_id=" + str1);
        },
        error: function () {
            return false;
        }
    });

});
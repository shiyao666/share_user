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
var token = null;
var share_id = null;
var id = null;
var name = null;
var title = null;
var s_phone = null;
var share_id1 = null;
var form_id = null;
var msg = null;
var state = null;

function getcommon(msg, lead, lead, start_time, address, price, content, data, state) {
    if (JSON.stringify(msg.data.state) == 1) {
        $(".form2").show();
        $(".form1").hide();
        $(".form3").hide();
        share_id = msg.data.id;
        id = msg.data.id;
        s_phone = msg.data.phone;
    } else if (JSON.stringify(msg.data.state) == 2) {
        $(".form1").show();
        $(".form2").hide();
        $(".form3").hide();
        if (msg.code == 10021) {
            $('.yaoqing_span').html(JSON.stringify(msg.data.name) + "邀请你参加")
        }
        if (msg.code == 10022) {
            $('.yaoqing_span').html(msg.data.lead)
            $(".span_1").html(msg.data.start_time);
            $(".span_2").html(msg.data.address);
            $(".span_3").html(msg.data.price);
            $(".content").html(msg.data.content)
        }
    } else if (JSON.stringify(msg.data.state) == 3) {
        $(".form1").show();
        $(".form2").hide();
        $(".form3").hide();
    }
}
function show1() {
    $(".form1").show();
    $(".form2").hide();
    $(".form3").hide();

}
function show2() {
    $(".form2").show();
    $(".form1").hide();
    $(".form3").hide();
}

function show3() {
    $(".form1").css("display","none");
    $(".form2").css("display","none");
    $(".form3").css("display","block");
}

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
                'share_id': share_id,
                'form_id': 1,

            },
            dataType: 'json',

            error: function () {

                return false;
            },
            success: function (msg) {
                // if(msg.code==10002){}

                id = msg.data.id;
                name = JSON.stringify(msg.data.name);
                getcommon(msg);
                // $(".h1_1").html(msg.state.h1);
                // $(".h1_2").html(msg.state.h2);
                $("#loading1").remove();
                $(".max_box").css("display", "block");
                setCookie("token", msg.data.token);
            }
        });
    } else {
        $.ajax({
            type: 'POST',
            async: true,
            url: 'http://192.168.4.53/index.php?m=invform&c=phone&a=index',
            data: {
                'token': token,
                'share_id': share_id,
                'form_id': 1
            },
            dataType: 'json',
            error: function () {
                return false;
            },
            success: function (msg) {
                // if(msg.code==10002){}
                id = msg.data.id;
                name = JSON.stringify(msg.data.name);
                getcommon(msg);
                // $(".h1_1").html(msg.data.h1);
                // $(".h1_2").html(msg.h2);
                $("#loading1").remove();
                $(".max_box").css("display", "block");
                setCookie("token", msg.data.token);
            }
        });
    }

});
function common() {
    console.log("我是公共函数");
}

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
            'share_id': str,
            'form_id': 1

        },
        dataType: 'json',
        success: function (msg) {
            if (msg.data != null) {
                if (JSON.stringify(msg.data.state) == 1) {
                    show2;
                    getcommon(msg);

                    share_id = msg.data.id;
                    id = msg.data.id;
                    s_phone = JSON.stringify(msg.data.phone);
                }
                else if (JSON.stringify(msg.data.state) == 2) {
                    show1;

                } else if (JSON.stringify(msg.data.state) == 3) {
                    show3;
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
            } else if (token !== null) {
                alert(msg.msg);
                return false;
            }
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
    $.ajax({



        type: "post",
        dataType: "json",
        url: 'http://192.168.4.53/index.php?m=invform&c=phone&a=logon',
        data: {
            "phone": phonename,
            "code": idlogon,
            "token": token,
            'form_id': 1
        },
        error: function () {
            return false;
        },
        success: function (msg) {
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
            'form_id': 1
        },
        async: true,
        success: function (msg) {
            id = msg.data.id;
            if (msg.code == 10015) {
                show3;
                $(".h1_1").css("margin-top", "20px");
                $(".submit2").css("width", "60%");
                $(".yaoqing_span").html(JSON.stringify(msg.data.name) + ",邀请您参加");
                var url = $('url').value;
                window.history.pushState({}, 0, 'http://' + window.location.host + window.location.pathname + "?share_id=" + msg.data.id);
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
    var str1 = url2.split("id=")[1];
    $.ajax({
        url: "http://192.168.4.53/index.php?m=invform&c=phone&a=share_others_two",
        type: "post",
        dataType: "json",
        data: {
            'id': id,
            'name': phonename,
            'form_id': 1
        },
        async: false,
        success: function (msg) {
            $('.form2').hide();
            $('.form3').show();
            $(".h1_1").css("margin-top", "20px");
            $(".submit2").css("width", "60%")
            $(".yaoqing_span").html(msg.data.name + ",邀请您参加");
            var url = $('url').value;
            window.history.pushState({}, 0, 'http://' + window.location.host + window.location.pathname + "?share_id=" + id);
            // window.location.href = "invite.html?" + share_id;     // $(".share_else").attr("href", "http://192.168.4.53/index.php?m=invform&c=phone&a=index?" + share_id)
        },
        error: function () {
            return false;
        }
    });
  
});
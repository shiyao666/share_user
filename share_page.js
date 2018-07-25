$(".max_box").css("display", "block");
var url = window.location.href;
var str = url.split("id=")[1];
console.log(str);// var num = url.indexOf("?");
// var str = url.substr(num + 1);
// var arr = str.split("&");
// var name = "";
// var value = "";
$(document).ready(function () {
    $.ajax({
        type: 'POST',
        async: true,
        url: 'http://192.168.4.53/index.php?m=invform&c=phone&a=index',
        dataType: "json",
        data: {
            "token": token
        },
        error: function () {
            return false;
        },
        success: function (msg) {
            if (msg.name !== null && msg.id !== null) {
                window.location.href = "success.html";
            }

        }
    })
});
// function getQueryString() {

//     for (var i = 0; i < arr.length; i++) {
//             name = arr[i].substring(0, num);
//             value = arr[i].substr(num + 1);
//             // this[name] = value;
//     }
// console.log(value);
// console.log(name);

// }

// console.log(name);



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
    $.ajax({
        type: 'POST',
        async: true,
        url: 'http://192.168.4.53/index.php?m=invform&c=phone&a=index',
        data: {
            token: token,
        },
        dataType: 'json',

        error: function () {

            return false;
        },
        success: function (msg) {
            // if(msg.code==10002){}
            id = msg.id;
            name = msg.name;
            if (msg.state == 2) {
                $(".form2").show();
                $(".form1").hide();
                $(".form3").hide();
                share_id = msg.share_id;
                id = msg.id;
                name = msg.name;
                s_phone = msg.phone;
            } else {
                $(".form1").show();
                $(".form2").hide();
                $(".form3").hide();
            }
            $("#loading1").remove();
            $(".max_box").css("display", "block");
            // if (msg.name !== null && msg.id !== null) {
            // window.location.href = "success.html";
            // }
            // if (msg.token = undefined || msg.token == null) {
            //     alert("请填写表单");
            //     return false;
            // } 
            //    {
            // if (token == null) {
            setCookie("token", msg.token);
            // }            // setCookie("share_id", msg.share_id);
            // document.cookie = "token=" + msg.token + "; expire=" + exp.toGMTString();
            // }

        }


    });

});
var url1 = window.location.href;
var str = url1.split("id=")[1];

$("body").on("click", ".ames", function click1() {
    var phonename = $("#name1").val();
    var phone = $("#phone1").val();
    var idlogon = $('#idlogo1').val();

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
var id = null;


$(".submit1").bind("click", function sendMessage() {


    var phonename = $("#name1").val();
    var idlogon = $('#idlogo1').val();


    $.ajax({
        type: "post",
        dataType: "json",
        url: 'http://192.168.4.53/index.php?m=invform&c=phone&a=logon',
        data: {
            "phone": phonename,
            "code": idlogon,
            "token": token
        },
        error: function () {
            return false;
        },
        success: function (msg) {
            if (msg.code == 10009) {

                $(".form1").hide();
                $(".form2").show();
            }
            alert(msg.message);
        }
    });
});




$("body").on("click", ".share_else", function share_a() {


    var phonename = $("#name1").val();
    var phone = $("#phone1").val();
    var idlogon = $('#idlogo1').val();
    var url2 = window.location.href;
    var str1 = url2.split("id=")[1];
    $.ajax({
        url: "http://192.168.4.53/index.php?m=invform&c=phone&a=share_others",
        type: "post",
        dataType: "json",
        data: {
            'id': id,
            'name': phonename,
            'phone': phone,
            "share_id": str1,

        },
        async: false,
        success: function (msg) {
            if (msg.code == 10013) {
                $(".form1").hide();
                $(".form2").hide();
                $(".form3").show();
                $(".yaoqing_span").html(phonename + ",邀请您参加");
                var url = $('url').value;
                window.history.pushState({}, 0, 'http://' + window.location.host + window.location.pathname + "?share_id=" + id);

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


$("body").on("click", ".success_share", function share_a() {

    var phonename = $("#name1").val();
    var phone = $("#phone1").val();
    var idlogon = $('#idlogo1').val();
    var url2 = window.location.href;
    var str1 = url2.split("id=")[1];
    $.ajax({
        url: "http://192.168.4.53/index.php?m=invform&c=phone&a=share_others",
        type: "post",
        dataType: "json",
        data: {
            'id1': id,
            'name': phonename,
            'phone': phone,
            "share_id": str1,

        },
        async: false,
        success: function (msg) {

            $(".form1").hide();

            $(".form2").hide();
            $(".form3").show();
            $(".h1_1").css("margin-top", "20px");
            $(".submit1").css("width", "60%")
            $(".yaoqing_span").html(phonename + ",邀请您参加");
            var url = $('url').value;
            window.history.pushState({}, 0, 'http://' + window.location.host + window.location.pathname + "?share_id=" + id);



            // window.location.href = "invite.html?" + share_id;     // $(".share_else").attr("href", "http://192.168.4.53/index.php?m=invform&c=phone&a=index?" + share_id)

        },
        error: function () {
            return false;
        }
    });

});


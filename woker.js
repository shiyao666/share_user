// 展示隐藏common function
var array = new Array();
array[0] = $("#bm1001load");
array[1] = $("#data1001_maxbox");
array[2] = $("#from_listbox");
array[3] = $("#ser1001_content");
array[4] = $("#ide_page");
array[5] = $("#preview_box");
function funceach(index1) {
    $.each(array, function (index, item) {
        this.hide();
        if (index1) {
            array[index1].show();
        }
    });
};
var i = 1;
var list_array = [msg.data.id, msg.data.name, msg.start_time.time, msg.state.price, msg.state.city, msg.state.price];
function list_each() {

    $(".fl1001_bigbox").addClass("fl1001_box fl1001_box" + i++);
    $.each(list_array, function () {
        $(".fl1001_id").append('<span class="fl1001_id" >' + this[0] + "</span>");
        $(".fl1001_name").append('<span class="fl1001_name" >' + this[1] + "</span>");
        $(".fl1001_time").append('<span class="fl1001_time" >' + this[2] + "</span>");
        $(".fl1001_place").append('<span class="fl1001_place" >' + this[3] + "</span>");
        $(".fl1001_city").append('<span class="fl1001_city" >' + this[4] + "</span>");
        $(".fl1001_count").append('<span class="fl1001_count" >' + this[5] + "</span>");
    })
}
// load登录页js

var user_name = $('.user_name').val();
var user_password = $('.password').val();
function checkval(con) {
    var re = /^[\u4E00-\u9FA5a-zA-Z0-9\d^\s]+$/;
    if (re.test(con)) {
        return true;
    } else {
        alert("用户名非法")
        return false;
    }
}
$(".bm1001_submit").click(function () {

    if ($('.user_name').val().length == 0) {

        alert("用户名格式不正确");
    } else if ($('.password').val().length == 0) {
        alert("密码不能为空");

    } else if ($('.user_name').val().length < 2 || $('.user_name').val().length > 10) {
        alert("用户名长度不合法");

    } else if ($(".password").val().length < 6 || $('.password').val().length > 18) {
        alert("密码长度不合法");

    }

    checkval(user_name);

    $.ajax({
        type: 'post',
        dataType: 'json',
        url: 'http://192.168.4.53/index.php?m=invform&c=phone&a=index',
        data: {
            'user_name': user_name,
            'user_password': user_password
        },
        success: function (msg) {
            if (msg.code == 10070) {
                alert(msg.msg);
            } else if (msg.code = 10071) {
                alert(msg.msg);
            } else if (msg.code = 10072) {

            }

        },
        error: function () {
            return false;
        }
    })

})
$('.bm1001_zhuce').click(function () {


})

// 表单列表js
$(".fl1001_info").click(function () {
    funceach(1);
})
$(".fl1001_edi").click(function () {
    funceach(4);
})
$(".fl1001_look").click(function () {
    funceach(5);
})
$(".fl1001_addinfo").click(function () {
    funceach(4);
})


// 编辑页js
$("#logo_set").bind('input propertychange', function () {
    var title_top1 = $(this).val();
    $(".top_img").attr("src", title_top1);
});

$("#top_set").bind('input propertychange', function () {
    var title_top1 = $(this).val();
    $(".yaoqing_span").html(title_top1);
});
$("#title_top").bind('input propertychange', function () {
    var title_top1 = $(this).val();
    $(".h1_1").html(title_top1);
});
$("#title_bottom").bind('input propertychange', function () {
    var title_top1 = $(this).val();
    $(".h1_2").html(title_top1);
});

$("#input_time").bind('input propertychange', function () {
    var title_top1 = $(this).val();
    $(".span_1").html(title_top1);
});
$("#input_place").bind('input propertychange', function () {
    var title_top1 = $(this).val();
    $(".span_2").html(title_top1);
});
$("#input_isfree").bind('input propertychange', function () {
    var title_top1 = $(this).val();
    $(".span_3").html(title_top1);
});
$("#input_name").bind('input propertychange', function () {
    var title_top1 = $(this).val();
    $(".user").attr("placeholder", title_top1);
});
$("#input_phonenum").bind('input propertychange', function () {
    var title_top1 = $(this).val();
    $("#phone").attr("placeholder", title_top1);
});
$("#input_btn").bind('input propertychange', function () {
    var title_top1 = $(this).val();
    $(".submit1").html(title_top1);
});
$("#input_btn").bind('input propertychange', function () {
    var title_top1 = $(this).val();
    $(".submit1").html(title_top1);
});







var lead = $("#top_set").val();
var price = $("#input_isfree").val();
var start_time = $("#input_time").val();
var adress = $("#input_place").val();
$(".img_select").click(function () {
    $.ajax({
        type: 'post',
        async: true,
        dataType: 'json',
        url: 'http://192.168.4.53/index.php?m=invform&c=phone&a=index',
        data: {
            'image': 5

        },
        success: function () {

        },
        error: function () {
            return false;
        }
    })
})
$
$("#save_revise").click(function () {
    funceach(2);
    var creat_fl_names = $(".fl1001_name");
    if (creat_fl_names) {
        for (var i = 0; i < creat_fl_names.length; i++) {
            var new_flnames = creat_fl_names[i];

        }
    }
    $.ajax({
        type: 'post',
        async: true,
        dataType: 'json',
        url: 'http://192.168.4.53/index.php?m=invform&c=phone&a=index',
        data: {
            'image': 5,
            'lead': lead,
            'price': price,
            'start_time': start_time,
            'adress': adress,
            'content': 3,
            'bg_image': 5,
            'add_id': 6
        },
        success: function (msg) {
            if (msg.data.state == 2) {

            }
        },
        error: function () {
            return false;
        }
    })
});

var iframeWindow = $(".h1_1").prop('contentWindow');
var element = $(iframeWindow).find('.fl1001_name');
// 预览页面
$("#preview_back").click(function () {
    funceach(2);
})
// 数据页面
$("#data1001_back").click(function () {
    funceach(2);
})



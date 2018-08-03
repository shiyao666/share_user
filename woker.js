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
var flbox_length = $(".fl1001_box").length;
// 后台添加数据行
function list_each(msg) {
    var list_array = [msg.data.id, msg.data.name, msg.data.start_time, msg.state.price, msg.state.city, msg.state.price];
    $(".fl1001_box").addClass("fl1001_box");
    var fl1001_newid = $(".fl1001_box").attr("id", "flbox+" + flbox_length++)
    $.each(list_array, function () {
        fl1001_newid.append('<span class="fl1001_id" >' + this[0] + "</span>");
        fl1001_newid.append('<span class="fl1001_name" >' + this[1] + "</span>");
        fl1001_newid.append('<span class="fl1001_time" >' + this[2] + "</span>");
        fl1001_newid.append('<span class="fl1001_place" >' + this[3] + "</span>");
        fl1001_newid.append('<span class="fl1001_city" >' + this[4] + "</span>");
        fl1001_newid.append('<span class="fl1001_count" >' + this[5] + "</span>");
        fl1001_newid.append('<a href="#" class="data1001_dela">删除</a>');
        fl1001_newid.attr('id', 'data1001_del' + flbox_length++)
    })
}
// load登录页js


var re = /^[\u4E00-\u9FA5a-zA-Z0-9\d^\s]+$/;
function checkval(con) {
    if (re.test(con)) {
        return true;
    } else if (!(re.test(con))) {
        alert("用户名或者密码非法")
        return false;
    }
}
var user_name = null;
var user_password = null;
// 登录校验
$(".bm1001_submit").click(function () {
    user_name = $('.user_name').val();
    user_password = $('.password').val();

    if ($('.user_name').val().length == 0) {
        alert("用户名不能为空");
        return false;
    } else if ($('.password').val().length == 0) {
        alert("密码不能为空");
        return false;
    } else if ($('.user_name').val().length < 2 || $('.user_name').val().length > 10) {
        alert("用户名长度不合法");
        return false;
    } else if ($(".password").val().length < 6 || $('.password').val().length > 18) {
        alert("密码长度不合法");
        return false;
    } else if (checkval(user_name)) {
        
    } else if (checkval(user_password)) {

    }


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

            } else if (msg.code = 10071) {

            } else if (msg.code = 10072) {
            }
        },
        error: function () {
            return false;
        }
    })

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
// 编辑页格式随着input改变
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
    $("#phone1").attr("placeholder", title_top1);
});
$("#input_btn").bind('input propertychange', function () {
    var title_top1 = $(this).val();
    $(".submit1").html(title_top1);
});
$("#input_btn").bind('input propertychange', function () {
    var title_top1 = $(this).val();
    $(".submit1").html(title_top1);
});
$("#lines").bind('input propertychange', function () {
    var title_top1 = $(this).val();
    $(".left_content").html(title_top1);
});
// 图片后台获取修改
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
// 保存发送修改内容
$("#save_revise").click(function () {
    var lead = $("#top_set").val();
    var price = $("#input_isfree").val();
    var start_time = $("#input_time").val();
    var adress = $("#input_place").val();
    funceach(2);
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

// 预览页面
$("#preview_back").click(function () {
    funceach(2);
})
// 数据页面
$("#data1001_back").click(function () {
    funceach(2);
})
// 删除数据表单
$(".data1001_dela").click(function () {
    var click_id = $(this).attr('id');
    $.ajax({
        type: 'POST',
        dataType: 'json',
        url: 'http://192.168.4.53/index.php?m=invform&c=phone&a=index',
        data: {
            'del_id': click_id
        },
        success: function (msg) {

        },
        error: function () {
            return false;
        }
    })
})
// 用户名获取
$(document).ready(function () {
    var data1001_UserName = $(".data1001_UserName").val();
    var manager_name = $(".manager_name").val();
    var preview_username = $(".preview_username").val();
    var data1001_ActiveName = $(".data1001_ActiveName").val();
    var preview_actname_span = $(".preview_actname_span").val();
    $.ajax({
        type: 'POSt',
        dataType: 'json',
        url: 'http://192.168.4.53/index.php?m=invform&c=phone&a=index',
        data: {
            'get': name
        },
        success: function (msg) {
            data1001_UserName = msg.data.name;
            manager_name = msg.data.name;
            preview_username = msg.data.name;
            data1001_ActiveName = msg.data.actname;
            preview_actname_span = msg.data.actname;
        },
        error: function () {
            return false;
        }
    })
})

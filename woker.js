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
var i = 0;
function list_each(msg) {
    var list_array = [msg.data.id, msg.data.image, msg.data.lead, msg.data.price, msg.data.start_time, msg.data.city];
    $(".fl1001_box").clone("class", "fl1001_box");
    var fl1001_newid = $(".fl1001_box").attr("id", "flbox+" + add_id);
    $.each(list_array, function () {
        fl1001_newid.append('<span class="fl1001_id" >' + this[0] + "</span>");
        fl1001_newid.append('<span class="fl1001_name" >' + this[1] + "</span>");
        fl1001_newid.append('<span class="fl1001_time" >' + this[2] + "</span>");
        fl1001_newid.append('<span class="fl1001_place" >' + this[3] + "</span>");
        fl1001_newid.append('<span class="fl1001_city" >' + this[4] + "</span>");
        fl1001_newid.append('<span class="fl1001_count" >' + this[5] + "</span>");
        fl1001_newid.append('<a href="#" class="fl1001_info" >数据</a>').attr('id', add_id);
        fl1001_newid.append('<a href="#" class="fl1001_edi"  >编辑</a>').attr('id', add_id);
        fl1001_newid.append('<a href="#" class="fl1001_look" >预览</a>').attr('id', add_id);
        fl1001_newid.append('<a href="#" class="fl1001_look" >删除</a>').attr('id', add_id);
        console.log(this[0]);
    })
}
// 声明变量token
var token = null;
// load登录页js
var re = /^[\u4E00-\u9FA5a-zA-Z0-9\d]+$/;
function checkval(con) {
    if (re.test(con)) {
        return true;
    } else if (!(re.test(con))) {
        return false;
    }
}
// 声明创建id并赋值
var add_id = 1;
// 登录校验
$(".bm1001_submit").click(function () {
    var user_name = $('.user_name').val();
    var user_password = $('.password').val();

    if ($('.user_name').val().length == 0) {
        alert("用户名不能为空");
        return false;
    } else if ($('.password').val().length == 0) {
        alert("密码不能为空");
        return false;
    } else if ($('.user_name').val().length < 2 || $('.user_name').val().length > 20) {
        alert("用户名长度不合法");
        return false;
    } else if ($(".password").val().length < 6 || $('.password').val().length > 18) {
        alert("密码长度不合法");
        return false;
    } else if (checkval(user_name) == false) {
        alert("用户名不合法");
        return false;
    } else if (checkval(user_password) == false) {
        alert("密码不合法");
        return false;
    }
    $.ajax({
        type: 'post',
        url: 'http://192.168.4.53/index.php?m=invform&c=admin_page_user&a=login_user ',
        data: {
            'user_name': user_name,
            'user_password': user_password
        },
        success: function (msg) {

            if (msg.code == 10075) {
                'token' == msg.token;
                funceach(2);
                token = getCookie('token');
            }
            else if (msg.code == 10076) {
                alert(msg.msg)
            }
        }, error: function () {
            return false;
        }
    })
});
// 当前页面为列表页
$(document).ready(function () {
    $.ajax({
        type: 'POST',
        async: true,
        url: 'http://192.168.4.53/index.php?m=invform&c=admin_page_user&a=page_index',
        data: {
            'add_id': add_id
        },
        dataType: 'json',
        success: function (msg) {
            if (msg.code == 10029) {
                list_each(msg);
            }
        }, error: function () {
            return false;
        }
    });
});

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
        url: 'http://192.168.4.53/index.php?m=invform&c=admin_page_user&a=look_page',
        data: {
            'add_id': add_id
        },
        success: function () {
            if (msg.code == 10034) {
                alert(msg.msg);
            } else if (msg.code = 10036) {
                alert(msg.msg);
            }
        },
        error: function () {
            return false;
        }
    })
})
// $(document).bind(click, ".fl1001_del", function () {
//     $.ajax({
//         type:'POSt',
//         dataType:'json',
//         url:'http://192.168.4.53/index.php?m=invform&c=admin_page_user&a=delete_page',
//         data:{

//         }
//     })
// })
// 保存发送修改内容
$("#save_revise").click(function () {
    var set_img = $("#img_select").val();
    var lead = $("#top_set").val();
    var price = $("#input_isfree").val();
    var start_time = $("#input_time").val();
    var adress = $("#input_place").val();
    var logo_set = $("#logo_set").val();
    var set_content = $("#set_content").val();
    funceach(2);
    $.ajax({
        type: 'post',
        async: true,
        dataType: 'json',
        url: 'http://192.168.4.53/index.php?m=invform&c=admin_page_user&a=index',
        data: {
            'image': logo_set,
            'lead': lead,
            'price': price,
            'start_time': start_time,
            'adress': adress,
            'content': set_content,
            'bg_image': set_img,
        },
        success: function (msg) {
            if (msg.code == 10034) {
                alert(msg.msg);
            } else if (msg.code == 10037) {
                alert(msg.msg)
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
        url: 'http://192.168.4.53/index.php?m=invform&c=admin_page_user&a=index',
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
        url: 'http://192.168.4.53/index.php?m=invform&c=admin_page_user&a=index',
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

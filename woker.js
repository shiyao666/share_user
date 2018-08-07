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
function ide_content(msg) {
    $(".yaoqing_span").html(msg.data.lead);
    $(".span_1").html(msg.data.start_time);
    $(".span_2").html(msg.data.address);
    $(".span_3").html(msg.data.price);
    $(".left_content").html(msg.data.content);
}
// 后台添加数据行
var i = 0;
var data1 = "数据";
var ide1 = "编辑";
var look1 = "预览";
var delete1 = "删除";
function list_each(msg) {
    var list_array = msg.data;
    var fl1001_newid = $(".fl1001_bigbox");
    $.each(list_array, function () {
        i++;
        if (i = list_array.length) {
            fl1001_newid.append('<div class="fl1001_box"><span class="fl1001_id">'
                + this.id + "</span><span class='fl1001_name' >"
                + this.lead + "</span><span class='fl1001_time' > "
                + this.start_time + " </span> <span class='fl1001_place' >"
                + this.address + "</span><span class='fl1001_city' >"
                + this.state + "</span><span class='fl1001_count' > "
                + this.price + "</span><a href='#' class='fl1001_info' >"
                + data1 + "</a><a href='#' class='fl1001_edi'  >"
                + ide1 + "</a> <a href='#' class='fl1001_look' >"
                + look1 + "</a> <a href='#' class='fl1001_del' >"
                + delete1 + "</a></div>");
        }

        console.log(this);
    })
}
var list_id = null;
function list_each2(msg) {
    var j = 0;
    var list_array1 = msg.data;
    var fl1001_newid1 = $(".data1001_content");
    $.each(list_array1, function () {
        j++;
        if (j = list_array1.length) {
            fl1001_newid1.append('<div class="data1001_list"><span class="data1001_id">'
                + this.id + "</span><span class='data1001_names' >"
                + this.name + "</span><span class='data1001_phone' > "
                + this.phone + " </span> <span class='data1001_qiye' >"
                + this.state + "</span><span class='data1001_work' >"
                + this.ip + "</span><a href='#' class='data1001_dela' >"
                + delete1 + "</a></div>");
        } if (j > list_array1.length) {
            return false;
        }
    })
}
$(".data1001back_div").click(function () {

})
// 当前页面为列表页
// 表单列表js
function add_click_to_databutton() {
    $(".fl1001_info").click(function () {
        data_id = $(this).parent().children(".fl1001_id").html();
        console.log(data_id);

        $.ajax({
            type: 'POST',
            dataType: 'json',
            url: 'http://192.168.4.53/index.php?m=invform&c=admin_page_user&a=record_page',
            data: {
                'token': token,
                'form_id': data_id
            },
            success: function (msg) {
                if (msg.code == 10041) {
                    funceach(1);
                    if (list_each2(msg)) {
                        return false;
                    }
                    list_each2(msg);
                }
            },
            error: function () {
                return false;
            }
        })
    })
}
// 编辑按钮
function ide_btn() {
    $(".fl1001_edi").click(function () {
        data_id = $(this).parent().children(".fl1001_id").html();
        $.ajax({
            type: 'POST',
            dataType: 'json',
            url: 'http://192.168.4.53/index.php?m=invform&c=admin_page_user&a=look_page',
            data: {
                'token': token,
                'form_id': data_id
            },
            success: function (msg) {
                if (msg.code == 10035) {
                    funceach(4);
                    ide_content(msg);
                }
            },
            error: function () {
                return false;
            }
        })

    })
}
$(".fl1001_look").click(function () {
    funceach(5);
})
$(".fl1001_addinfo").click(function () {
    funceach(4);
})
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
var add_id = null;
// 登录校验
$(".bm1001_submit").click(function () {
    token = getCookie("token");
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
            'user_password': user_password,

        },
        success: function (msg) {
            if (msg.code == 10075) {
                token = msg.data.token;
                funceach(2);

                $.ajax({
                    type: 'POST',
                    async: true,
                    url: 'http://192.168.4.53/index.php?m=invform&c=admin_page_user&a=page_index',
                    data: {
                        'token': token,
                    },
                    dataType: 'json',
                    success: function (msg) {
                        if (msg.code == 10029) {
                            setCookie(token);
                            list_each(msg);
                            add_click_to_databutton();
                            ide_btn();
                            look_btn();
                            delete_btn();
                            ide_content(msg);
                        }
                    }, error: function () {
                        return false;
                    }

                });
            }
            else if (msg.code == 10076) {
                alert(msg.msg)
            }
        }, error: function () {
            return false;
        }
    })

});



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
// 预览按钮
function look_btn() {
    $(".fl1001_look").click(function () {
        data_id = $(this).parent().children(".fl1001_id").html();
        $.ajax({
            type: 'POST',
            dataType: 'json',
            url: 'http://192.168.4.53/index.php?m=invform&c=admin_page_user&a=look_page',
            data: {
                'token': token,
                'form_id': data_id
            },
            success: function (msg) {
                if (msg.code == 10041) {
                    funceach(4);
                    list_each2(msg);
                }
            },
            error: function () {
                return false;
            }
        })

    })
}
// 删除按钮
// 预览按钮
function delete_btn() {
    $(".fl1001_del").click(function () {
        data_id = $(this).parent().children(".fl1001_id").html();
        $.ajax({
            type: 'POST',
            dataType: 'json',
            url: 'http://192.168.4.53/index.php?m=invform&c=admin_page_user&a=look_page',
            data: {
                'token': token,
                'form_id': data_id
            },
            success: function (msg) {
                if (msg.code == 10041) {
                    funceach(4);
                    list_each2(msg);
                }
            },
            error: function () {
                return false;
            }
        })

    })
}

// 保存发送修改内容
$("#save_revise").click(function () {
    data_id = $(this).parent().children(".fl1001_id").html();
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
        url: 'http://192.168.4.53/index.php?m=invform&c=admin_page_user&a=updata_page',
        data: {
            'token': token,
            "form_id": data_id,
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
function delete_btn() {
    $(".data1001_dela").click(function () {
        data_id = $(this).parent().children(".fl1001_id").html();
        console.log(data_id);

        $.ajax({
            type: 'POST',
            dataType: 'json',
            url: 'http://192.168.4.53/index.php?m=invform&c=admin_page_user&a=delete_page',
            data: {
                'token': token,
                'form_id': data_id
            },
            success: function (msg) {
                if (msg.code == 10041) {
                    funceach(1);
                    if (list_each2(msg)) {
                        return false;
                    }
                    list_each2(msg);
                }
            },
            error: function () {
                return false;
            }
        })
    })
}
// 用户名获取
// $(document).ready(function () {
//     var data1001_UserName = $(".data1001_UserName").val();
//     var manager_name = $(".manager_name").val();
//     var preview_username = $(".preview_username").val();
//     var data1001_ActiveName = $(".data1001_ActiveName").val();
//     var preview_actname_span = $(".preview_actname_span").val();
//     $.ajax({
//         type: 'POSt',
//         dataType: 'json',
//         url: 'http://192.168.4.53/index.php?m=invform&c=admin_page_user&a=index',
//         data: {
//             'get': name
//         },
//         success: function (msg) {
//             data1001_UserName = msg.data.name;
//             manager_name = msg.data.name;
//             preview_username = msg.data.name;
//             data1001_ActiveName = msg.data.actname;
//             preview_actname_span = msg.data.actname;
//         },
//         error: function () {
//             return false;
//         }
//     })
// })

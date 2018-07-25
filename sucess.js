
// var token = null;
// var share_id;
// $(document).ready(function () {

//     // setTimeout(function () {
//     //     console.log(getCookie("token"));
//     //     $.ajax({
//     //         type: 'POST',
//     //         async: true,
//     //         url: 'http://192.168.4.53/index.php?m=invform&c=phone&a=index',
//     //         dataType: "json",
//     //         data: {
//     //             "token": token
//     //         },
//     //         error: function () {
//     //             return false;
//     //         },
//     //         success: function (msg) {
//     //             if(msg.name!==null&& msg.id!==null){
//     //                 window.location.href = "success.html";
//     //             }
               
//     //         }


//     //     });
//     // }, 5300);
// });

// $(document).ready(function () {

//     $.ajax({
//         url: "http://192.168.4.53/index.php?m=invform&c=phone&a=index",
//         type: "post",
//         datatype:'josn',
//         data: {
//             "token": token,

//         },
//         async: true,
//         success: function (msg) {
//             alert(msg.token);
//         },
//         error: function () {
//             return false;
//         }
//     });
// });

// function getCookie(c_name)
// {
// if (document.cookie.length>0)
//   {
//   c_start=document.cookie.indexOf(c_name + "=")
//   if (c_start!=-1)
//     { 
//     c_start=c_start + c_name.length+1 
//     c_end=document.cookie.indexOf(";",c_start)
//     if (c_end==-1) c_end=document.cookie.length
//     return unescape(document.cookie.substring(c_start,c_end))
//     } 
//   }
// return ""
// }
$(".form1").hide();
$(".form2").hide();
$(".form3").show();
$(".h1_1").css("margin-top","20px");
$(".submit1").css("width","60%")
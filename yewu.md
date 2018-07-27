<!--slide -->
## 页面1
<!--slide -->
### 进入页面 
    - index
    1. 发送phonename 手机号
    2. 发送 idlogon 验证码
    3. 发送token
    4. 当返回code值为10009时候 接收msg.id储存为 id   接收msg.name储存为name 
 <!--slide -->
 5. 检测url中是否有id 如果有的话 储存起来发送给后台
 6. 判断页面进入状态值 1、2、3
 7. 并显示 2（隐藏1、3）
并显示 1（隐藏2、3）
并显示 3（隐藏1、3）
<!--slide -->
### 获取验证码
- send_mes
1. 发送name 姓名
2. 发送phone 手机号
3. 发送token 
4. 发送share_id(如果有的话)
接收 state返回值 1/2/3
并显示 2（隐藏1、3）
并显示 1（隐藏2、3）
并显示 3（隐藏1、3）
5. 根据code校验是否合法或者 验证码是否过期
6. 判断是否token为空、 如果是友情提醒
 <!--slide -->
### 点击报名
- logon
1. 发送手机号 phonename
2. 发送验证码 idlogon
3. 发送tolen  
4. 判断值是否为10009  yes 接收msg.id储存为 id   接收msg.name储存为name 
 <!--slide -->
 ### 页面1 分享预览
 - share_others_one
 1. 发送 id
 2. 发送phonename 
 3. 发送验证码 idlogon
 4. 发送手机号 phone
    <!--slide -->
5. 返回code ==10015 隐藏1、2 form 显示 form3
6. 将获取的 msg.name 显示在页面上
7.  if msg.code == 10014  隐藏form2、form3 alert友情提醒
    <!--slide -->
### 页面2 分享浏览
- share_others_two
1. 发送id
2. name:phonename
3. 设置id添加到url 中展示 form3

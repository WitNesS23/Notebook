# Form

## HTTP基础
---
### 请求(Request)

#### 基础知识

`Server` 响应 → `Client`

`Server` ← 请求 `Client`

#### Request Headers
- 请求行  `GET/POST 路径 HTTP协议版本`
- 请求头  `键值对 直到遇到空行结束`
- 空行
- 消息体

```
GET / HTTP/1.1
Host: www.baidu.com
Accept: text/html
User-Agent: Mozilla/5.0 (Macintosh; Intel Mac OS X 10_11_2) AppleWebKit/601.3.9 (KHTML, like Gecko) Version/9.0.2 Safari/601.3.9
Accept-Language: zh-CN,zh;q=0.8,en;q=0.6,zh-TW;q=0.4
Cookie: BAIDUID=xxxx
```
```
POST /login/email HTTP/1.1
Host: www.zhihu.com
Accept: */*
Content-Type: application/x-www-form-urlencoded; charset=UTF-8
Content-Length: 119
User-Agent: Mozilla/5.0 (Macintosh; Intel Mac OS X 10_11_2) AppleWebKit/601.3.9 (KHTML, like Gecko) Version/9.0.2 Safari/601.3.9
Cookie: _xsrf=e0f0996099f0c4e3e0157d92d65dfe23;

password=zhihu&captcha=mrah&remember_me=true&email=huayiqishi%40qq.com
```

## GET V.S POST
两者都是HTTP动词 表示**HTTP语义**

---
#### GET用于获取资源（读）
1. 在地址栏输入`url`
2. `<img src=...> <script src=...>`
3. 请求外部CSS文件
4. $.get()
5. ...

#### POST用于更新资源（写）
1. <form>提交
2. $.post()

*非幂等操作*
*重复提交POST某些浏览器会提示*

#### 面试题 - GET 与 POST的区别
1. 浏览器的触发方式不同
2. `GET`没有`body`，`POST`有`body` (HTTP 协议中没有这种规定)

   *`Server`的实现中一般不去读`GET`中的`body`*
3. 两者代表的HTTP**语义**不同

## 表单提交
`<form action="" method="">`

---
- `action`表示提交到路径
- `method`表示提交的HTTP动词(GET, POST)
- `target`表示用哪个`window`接收响应

### 细节
- `input`要加`name`，才会被信息收集
- 提交按钮要加`type=submit`
- 表单提交触发条件
  1. 按钮被点击
  2. 在带有`name`属性的`input`中输入回车
- 收集到的表单信息传递方式
  1. `POST`保存在请求的消息体中
  2. `GET`保存在url中
- `target`属性可以跳转`name`值相对应的`iframe`标签(*没有`ajax`的情况下实现局部刷新*)
- `label` 的点击事件：
  1. 其中`for`属性值对应`input`标签的`id`值，对应的标签会被选中
  2. 直接用`label`标签将`input`标签包含起来免去`id`属性

### URL 概念简单了解
- 概念：统一资源定位符
- URI(统一资源标识符/抽象的概念) = URL(通过描述资源的位置来描述资源) + URN(通过名字来识别资源，和位置无关)


## $.post 提交
```
$("form").on("submit", function(e){
    e.preventDefault(); // 放在第一行 下面代码出现错误也能避免默认动作
    var form = this;

    console.log(form.phone.value); // <input name=phone />
    console.log(form.email.value); // <input name=email />

    $.post(form.action, {
        phone: form.phone.value,
        email: form.email.value
    }, function(res){
        console.log(res);
    });
});
```

`$.post`不同于`$.ajax` 没有 Error 

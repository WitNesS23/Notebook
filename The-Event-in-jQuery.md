# What can the `event` in `jQuery` can give us

## Description
here are all the properties of the `event` inherit form `object`

### `event.target` & `event.delegateTarget` & `this`

- `event.currentTarget` 在事件冒泡阶段中当前(最底端)的元素 总是与函数的`this`对象相等,但是在使用诸如`jQuery.proxy`或者其他改变函数执行上下文的函数时,`this`的指向会变成指定的对象;
- `event.relatedTarget` 如果存在的话,记录其它被卷入事件的元素 譬如`mouseout`这个属性记录接下来进入的元素,`mouseover`这个属性记录刚刚离开的元素;
- `event.fromElement` & `element.toElement`也是配合`mouseout`和`mouseover`这两个事件,分别记录动作离开和进入的元素,在许多没有`from-to`操作的事件中,`toElement`元素总是和`target`元素保持一致(`IE8>`中不一定)
- `event.delegateTarget` 当前被执行的`jQuery`事件被绑定的对象 这个函数总是被使用在`.on()`或者`.delegate()`这类函数上面,并且保存的是事件监听被绑定的**祖先元素**;
- `event.target` 触发这个事件的元素对象;
- `event.srcElement` 存疑
```
$("body").delegate("div", "click", function(e){
    console.log(e.currentTarget);   // 'div'
    console.log(e.delegateTarget);  // 'body'
    console.log(e.fromElement);     // null
    console.log(e.relatedTarget);   // null
    console.log(e.target);          // 'span'
    console.log(e.toElement);       // 'span'
    console.log(this);              // 'div'
});
```

### `event.pageX/Y` & `event.offsetX/Y` & `event.clientX/Y`
首先,这些属性的返回值都**没有单位**
- `event.pageX/Y` 点击事件触发时鼠标相对于(当前iframe)的`document`文档左/上边缘的距离 **被遮挡部分也参加计算**
- `event.offsetX/Y` 鼠标与监听对象的左/上边缘的距离 **被遮挡的部分也参加计算**
- `event.clientX/Y` 鼠标与**可见页面大小**左/上边缘的距离 **无视被遮挡的部分**
- `event.screenX/Y` 鼠标与显示器的左/上边缘的距离 *不常用*

#### `event.data`
当前执行的监听事件被声明时赋予的(可选的)参数(被包裹在对象中)
```
<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <title>event.data demo</title>
  <script src="//code.jquery.com/jquery-1.10.2.js"></script>
</head>
<body>

<button> 0 </button>
<button> 1 </button>
<button> 2 </button>
<button> 3 </button>
<button> 4 </button>

<div id="log"></div>

<script>
// in this example, it uses the closure
var logDiv = $( "#log" );

for ( var i = 0; i < 5; i++ ) {
  $( "button" ).eq( i ).on( "click", { value: i }, function( event ) {
    var msgs = [
      "button = " + $( this ).index(),
      "event.data.value = " + event.data.value,
      "i = " + i
    ];
    logDiv.append( msgs.join( ", " ) + "<br>" );
  });
}
</script>

</body>
</html>
```
#### `event.type`
描述所触发的事件的名称 例如`click`
#### `event.which`
对于鼠标/键盘事件来说,记录了
#### `event.result`
除非返回值是`undefined`,否则记录上次由这个动作触发的监听事件的返回值
```
<script>
$( "button" ).click(function( event ) {
  return "hey";
});
$( "button" ).click(function( event ) {
  $( "p" ).html( event.result );
});
// output: "hey"
</script>
```

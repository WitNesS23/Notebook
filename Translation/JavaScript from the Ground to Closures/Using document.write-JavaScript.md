# 学会使用`document.write`
本文原作者:[ilya Kantor](http://javascript.info/users/ilya-kantor)

1. [`document.write`的工作原理]()

2. [在"进行时"使用]()

3. [最佳实践]()

4. [总结]()

通过`document.write`方法,可以直接使页面输出一段字符串(*译者:可以理解成页面输出一句话*)

这是用来对`document`对象直接输出,附加操作的久远方法之一.在现代的浏览器操作中,这个方法已经很少被使用,但是它仍旧有自己独特的使用场景.

## 1 `document.write`的工作原理

**当`document`在加载(*译者:或者翻译成渲染*)的时候,遇到包含`document.write(text)`的`script`标签**,`script`标签可以把`text`内容*插入*到`document`(*译者:文档*)中.其中`text`将被当做写于`HTML`代码中一样进行渲染.

看看下面的例子
```HTML
...
<script>
  document.write('*Hello, there!*')
</script>
...
```

**对于`document.write`其中包含的文本没有特殊的限制**,他不需要被标签包裹,需要闭合或者其他的要求.

下面这个例子,每个`document.write`都输出一部分文本,这些文本都会被添加(*译者:插队渲染*)到页面中.

```HTML
<script> document.write('<style> td { color: #F40 } </style>')</script>
<table>
  <tr>
    <script> document.write('<td>') </script>
    The sun is rising, and I'm happy to welcome it.
    <script> document.write('</td>') </script>
  </tr>
</table>
```

关于这个方法还有个变形`document.writeIn(text)`,区别在于这个方法会在`text`内容之后插入`'\n'`.

## 2 在"进行时"使用

对于`document.write`只有一项限制:

> **`document.write`和`document.writeIn`方法都应该在*未渲染完成*的`document`中使用**

当页面渲染(加载)结束,整个页面都处于一种*关闭状态*.企图在这种*关闭状态*的页面中使用`document.write`将会致使页面渲染(加载)内容消失

# 学会使用`document.write`
本文原作者:[ilya Kantor](http://javascript.info/users/ilya-kantor)

1. [`document.write`的工作原理](user-content-1-documentwrite的工作原理)

2. [在"进行时"中使用](user-content-2-在进行时中使用)

3. [最佳实践](user-content-3-最佳实践)

4. [总结](user-content-4-总结)

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

## 2 在"进行时"中使用

对于`document.write`只有一项限制:

> **`document.write`和`document.writeIn`方法都应该在*未渲染完成*的`document`中使用**

当页面渲染(加载)结束,整个页面都处于一种*关闭状态*.企图在这种*关闭状态*的页面中使用`document.write`将会致使页面渲染(加载)内容消失

> `XHTML`与`document.write`

> `Mozilla`浏览器使用`XML`的格式来解析指定为`Content-Type: application/xhtml+xml` 的文档.通过这种方式,浏览器们按照`XML`的标准来解析文档,速度效率都得到了有效的提升,但是因为这种解析方式的技术局限,`document.write`将失去作用

## 3 最佳实践

大多数情况下,首选使用`DOM`原生的方法来改变页面结构,因为其提供的API方便快捷(*译者:我自己的感受*).同样,`innerHTML`方法提供了几乎同样的方式.

但是`document.write`是**最快**将**脚本生成的文本**添加到页面中的方式.

同样,`document.write`同样被用来添加外部链接的`script`脚本或者是计数占位.

``` HTML
<script>
  var url = 'http://ads.com/buyme?rand=' + Math.random
  document.write('<script src="' + url + '"></scr' + 'ipt>')
</script>
```

- 就像上面代码所示，一串`script URL`链接可以被动态拼接.这样就允许给`URL`添加用户特性的数据,诸如屏幕分辨率和其他通过`JavaScript`可以获取的数据.
- 添加随机询问参数来防止(自动缓存的)代理缓存该资源
- 注意闭合标签`</SCRIPT>`标签是拼接的.尽管这样,浏览器将不会误解这行代码(*译者:意译*).

**说了很多`document.write`方法的优点,但是同样有不好的方面,因为加载`script`文件时会阻塞剩下页面的渲染.尤其是在服务器传输缓慢的情况下.**

尤其是在插入*第三方*(`third-party`)`script`到`HTML`中之前要三思.

这里有个更好的方式插入`script`标签不会阻塞页面,使用`DOM`方法,创建`SCRIPT`标签然后将其添加到`HEAD`中.

``` HTML
var script = document.createElement('script')
script.src = 'http://ads.com/buyme?rand=' + Math.random()

// now append the script into HEAD, it will fetched and executed
document.documentElement.firstChild.appendChild(script)
```

使用`DOM`添加的方式不会阻塞页面加载使得页面的加载速度变快,与此同时对于第三方库的引用更加安全.

## 总结

`document.write`或是`document.writeIn`允许我们直接向`HTML`输出一段文本.如果在页面加载结束之后被调用,这俩方法将会重绘整个页面.

使用`document.write`方法的优势在于:
1. 它可以添加任意数量,畸形,不完整甚至有缺陷的`HTML`片段到`document`文档中;
2. 它非常快,因为浏览器不需要修改现存的`DOM`结构;

> 很少会有`script`是使用`document.write`方法添加.不要使用这种方式来添加`script`,因为剩下的`document`文档会等待`script`加载执行后才继续渲染.

> 如果远程服务器被挂起了,页面将会耗费大量的事件来加载.无论如何,我们都要避免将远程服务器挂起.

> 如果页面拼接条件合适的情况下,尽量使用`DOM`元素方法来代替`document.write`方法.

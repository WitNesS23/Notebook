# 搜索DOM节点
本文原作者:[ilya Kantor](http://javascript.info/users/ilya-kantor)

1. [方法]()
  1. [`document.getElementById`方法]()
    1. [`id`属性产生的隐式变量(对象)]()
  2. [`document/node.getElementsByTagName`方法]()
  3. 限定父代节点的搜索
  4. [`document.getElementsByName`方法]()
  5. [`document/node.getElementsByClassName`方法]()
  6. [`document/node.querySelector.querySelectorAll`方法]()
2. [现代浏览器的`XPath`]()
3. [查询结果是**动态的**]()
4. [练习]()
  1. []()
  2. [数数几个子代节点]()
  3. [更多]()
5. [总结]()

大多数情况下,为了对用户触发的事件给以反应,我们需要在页面上找到并且修改某些节点.

像是`childNodes`,`children`和其他节点链接属性(*译者:感觉这里讲的不是很明白,就是指还有许多节点属性可以获取对应`DOM`节点树上的节点*)在搜索上面很有用,但是它们只能在临近的节点上面作用.

幸运的是,这里有更加系统的方法来查找,搜索`DOM`节点.

## 方法

### `document.getElementById`方法

通过`id`属性来搜索一个节点是最快的方式.

在下面的例子中,在整个`document`文档中搜索一个`id=info`的`div`节点.无论这个结点在`document`文档中的位置,它都会被找到.

``` HTML
<body>
  <div id="info">Info</div>
  <script>
    var div = document.getElementById('info')
    alert( div.innerHTML )
  </script>
</body>
```

值得注意的是，某一`id`只能对应仅仅**某一个结点**.当然,你可以无视这个注意点,在你的页面中放置很多`id`属性相同的节点,但是在这种情景下,`document.getElementById`方法就会变得出现歧义,在不同浏览器中的结果也会变得不尽相同.所以,最佳实践应该是遵守标准,保证一个`id`对应一个节点.

### `id`属性产生的隐式变量(对象)

**所有的浏览器都会给每个`id`属性隐式的生成一个对应的变量.**

举个栗子,运行下面的这段代码.页面将会输出"test",因为`a`变量是`IE`隐式生成的对对应节点的引用.

(*译者:在`IE8`和`Chrome`中测试的结果都**不是输出test**,但是`a`的确是对该节点的引用,特此说明,防止误解*)

```HTML
<div id="a">test</div>
<script>
  alert(a)
  // alert(a.innerHTML) 可以输出"test"
</script>
```

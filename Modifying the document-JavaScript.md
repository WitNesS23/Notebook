# 修改DOM元素
[ilya Kantor](http://javascript.info/users/ilya-kantor)
1. [创建节点](##1)
2. [添加节点](## 添加节点)
3. [移除节点](##3)
4. [任务与实例](## 任务与实例)
5. [总结](## 总结)

DOM结构的变化是动态页面的本质.通过下面即将描述的方法,使得在线(*译者:*[on-the-fly](https://www.zhihu.com/question/21136587))构造,修改页面结构变成可能.

在之前描述的DOM操作方法都是定义于[DOM一级规范]()中.

## 1 创建节点

下面就是在DOM中创建新节点的方法.

#### `document.createElement(tag)`
创建一个新的**元素类型**的节点,譬如一枚`div`节点

  `var div = document.createElement('div')`
#### `document.createTextNode(text)`
创建一个新的**文本类型**的节点,譬如内容是`Ronbin was here`

  `var textEle = document.createTextNode('Ronbin was here')`

`createElement`是最常用的方法之一,不过`createTextNode`也很不错.`createTextNode`创建的的文本类型的节点可以被添加到其他的节点中(*译者:这里没有讲清楚*).

在多数流行浏览器中,对于一个空节点,创建一个新的文本节点然后填充这个操作,要比直接修改空节点的`innerHTML`属性操作**快得多**.

但是`innerHTML`操作更加简单同时支持在内容中**嵌套标签**,所以它们都找到了自己的用武之地.

### 克隆节点
节点同样可以被克隆.

#### `elem.cloneNode(true)`
深度克隆一个节点,克隆这个节点本生还有它的**所有后代节点**.

#### `elem.cloneNode(false)`
克隆一个节点本身以及它的**特性(节点)**,但是不克隆它的后代节点.


## 添加节点

当你想操作某个节点,你需要找到它的**父代节点**,然后调用对应方法.

#### `parentElem.appendChild(ele)`
将`elem`节点添加到`parentElem`的子代节点中

  下面的例子演示了如何创建一个节点同时将它添加到`BODY`(节点)的子节点中(*译者:这里有歧义*)
```HTML
  <div>
    ...
  </div>
  <script>
    var div = document.body.children[0]

    var span = document.createElement('span')
    span.innerHTML = 'A new span!'
    div.appendChild(span)
  </script>
```
**值得注意的是，新添加节点的位置是`parentElem`子代节点中的最后**

> 思考: 对于一个空的DOM节点`node`,下面的两种操作有什么区别?

> `elem.appendChild(document.createTextNode(text))` & `elem.innerHTML = text`

> 解决:
> `createTextNode` escapes node content(*译者: 看不懂啊看不懂*)

> 比较下面两个例子

> `createTextNode` 使得文本内容变成 `<b>tag</b>`

```HTML
  <div></div>
  <script>
    var text = '<b>tag</b>'

    var elem = document.body.children[0]
    elem.appendChild(document.createTextNode(text))
  </script>
```
> `innerHTML`将*html结构*更改成`<b>tag</b>`

```HTML
  <div></div>
  <script>
    var text = '<b>tag</b>'

    var elem = document.body.children[0]
    elem.innerHTML = text
  </script>
```

#### `parentElem.insertBefore(elem, nextSibling)`
将`elem`节点添加到`parentElem`的子代节点中的`elementSibling`节点之前

下面的例子中将一个新节点添加到第一个子代节点之前:
```HTML
<div>
  ...
</div>
<script>
  var div = document.body.children[0]

  var span = document.createElement('span')
  span.innerHTML = 'A new span'
  div.insertBefore(span, div.firstChild)
</script>
```
注意: 使用`insertBefore`方法时传递第二个参数是`null`的情况下,将和`appendChild`执行同样的操作

``` JavaScript
  elem.insertBefore(newElem, null) // 和下面的方法效果一模一样
  elem.appendChild(newElem)
```
**所有添加节点的操作的返回值都是被添加的节点**

## 3 移除节点
有以下两种主要的方式从DOM中移除节点

#### `parentElem.removeChild(elem)`
将`elem`节点从`parentElem`的子代节点中移除

#### `parentElem.replaceChild(elem, currentElem)`
用`elem`节点替换`parentElem`子节点中的`currentElem`

**这两者都返回被移除的节点,这些被移除的节点接下来都可能再次被添加到DOM中去**

> 在你需要移动某个节点的时候,首先要做的事不一定是从父辈节点中移除这个节点

> `elem.appendChild/insertBefore`**自动把**`elem`**从它之前的位置中移除了**

> 下面的例子将最后一枚子代节点移动到了子代元素中的第一个

```HTML
  <div>First div</div>
  <div>Last div</div>
  <script>
    var first = document.body.children[0]
    var last = document.body.children[1]

    document.body.insertBefore(last, first)
  </script>
```
> 当操作某个已经存在父辈的节点的插入(*译者:这里翻译成移动更好些*)方法,将其从之前的父辈节点中移除是被自动执行的.

## 任务与实例
下面的小练习需要你好好理解前面的知识同时仔细阅读题目要求,祝你好运~(*译者:这里完全是自己掰的,大概就是这个意思*)

### 练习1
> 完成一个方法,要求:将一个节点从DOM结构中移除,但是参数中没有其父代节点的引用

> 调用的语法:`remove(elem)`

```HTML
  <div>Very</div>
  <div>Secret</div>
  <div>Child</div>

  <script>
    var elem = document.body.children[0]

    function remove(elem){ /* your code */}
    remove(elem)  // <-- should remove the element
  </script>
```

#### 解决方案
`elem`的父辈节点可以通过`parentNode`这个属性来获取.
最好不要忘记基于兼容性(*译者:翻译成规范*)将这个被移除的节点作为返回值.
所有方法的实现可以像下面这样
```JavaScript
  function remove(elem){
    return elem.parentNode.removeChild(elem)
  }
```

### 练习2
> 完成方法`insertAfter(elem, refElem)`将`elem`节点插入到`refElem`节点**之后**

```HTML
  <div>Very</div>
  <div>Secret</div>

  <script>
    var elem = document.createElement('div')
    elem.innerHTML = '**Child**'

    function insertAfter(elem, refElem){ /* your code */ }

    insertAfter(elem, document.body.firstChild) // <-- should work
    insertAfter(elem, document.body.lastChild) // <-- should work
  </script>
```

#### 解决方法
想要做到在`refElem`之后插入节点,本质上就是在`refElem.nextSibling`节点之前插入这个节点
但是如果`refElem`不存在`nextSibling`节点呢?这就意味着`refElem`就是其父辈节点的最后一枚子代节点,所以我们可以直接使用`appendChild`方法来完成要求
代码如下:
```JavaScript
  function insertAfter(elem, refElem){
    var parent = refElem
    var next = refElem.nextSibling
    if(next){
      return parent.insertBefore(elem, next)
    }else{
      return parent.appendChild(elem)
    }
  }
```
如果了解`insertBefore`第二个参数可以是`null`这个特点,代码可以被简写成如下形式:
```JavaScript
  function insertAfter(elem, refElem){
    return elem.parentNode.insertBefore(elem, refElem.nextSibling)
  }
```
如果`refElem`没有下一个兄弟节点,则传递个`insertBefore`方法的第二个参数就会变成`null`,则`insertBefore(elem, null)`作用效果就和`appendChild`相同

### 练习3
> 完成方法`removeChildren`将给定节点的子代节点全部移除

```HTML
  <div>Very</div>
  <div>Secret</div>
  <div>Children</div>

  <script>
    function removeChildren(elem){ /* ypur code */ }

    removeChildren(document.body) // makes BODY absolutely empty
  </script>
```

#### 解决方法
首先,我们来看看排除一种常见的错误答案:
```JavaScript
  function removeChildren(elem){
    for(var k=0, k<elem.childNodes.length, k++){
      elem.removeChild(elem.childNodes[k])
    }
  }
```
如果你尝试运行上面的方法,你会发现它没有预想中的效果
这是因为`childNodes`总是从0开始的,每次当子代节点被移除时,它会自动重新计算.但是计数器`k`每次循环都会增加`1`.所以从结果上面来看,`k`略过了一半的节点.
正确的写法:
```JavaScript
  function removeChildren(elem){
    while(elem.lastChild){
      elem.removeChild(elem.lastChild)
    }
  }
```
另外一种写法:
```
  function removeChildren(elem){
    elem.innerHTML = ''
  }
```

### 练习4
> 完成一个可以按输入生成列表的页面

> 对于每一条数据来说:

> 1. 提示用户输入信息
> 2. 根据输入信息创建单位然后添加到`ul`中
> 3. 当用户输入`ESC`则生成过程结束

> **所有的节点都必须是动态生成的**

> P.S. 如果用户输入了`ESC`则`prompt`接口返回`null`

#### 解决方案
下面的代码是会自执行的(*译者:猜的*)
```HTML
<!DOCTYPE html>
<html>
  <body>
    <h1>Creation of the list</h1>

    <script>
      var ul = document.createElement('ul')
      document.body.appendChild(ul)

      while(true){
        var data = prompt("Enter the contents for the item", "")

        if(data == null){
          break
        }

        var li = document.createElement('li')
        li.appendChild(document.createTextNode(data))
        ul.appendChild(li)
      }
    </script>
  </body>
</html>
```

[运行效果摸我](http://javascript.info/files/tutorial//browser/dom/createList.html)

值得注意的是这里把判断`null`值作为跳出循环的标志,`prompt`方法只有用户输入`ESC`的情况下返回`null`

`LI`节点内容是通过`document.createTextNode`的方法创建文本节点来填充,这样避免文本内容中可能出现的`<,>`等字符对动态创建节点的影响.


## 总结
创造节点的方法:
- `document.createElement(ele)` - 创建一个新的元素节点
- `document.createTextNode(value)` - 根据传值创建一个新的文本节点
- `elem.cloneNode(deep)` - 克隆节点

由父代节点调用的插入移除节点的方法,它们都返回被操作的节点:
- `parent.appendChild(elem)`
- `parent.insertBefore(elem, nextSibling)`
- `parent.removeChild(elem)`
- `parent.replaceChild(elem, currentElem)`



#### 译者注
`结点` 与 `节点` 按 <<JavaScript高级程序设计>> 翻译为准

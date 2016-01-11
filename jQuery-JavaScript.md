# jQuery 学习笔记

## 思考与基础核心

### 加载模式

|区别|`window.onload`|`$(document).ready()`|
|:-|:-|:-|
|执行时机|必须等待网页全部加载完毕（包括图片等），然后再执行包裹代码|只需要等待网页中的DOM结构加载完毕，就能执行包裹的代码|
|执行次数|只能赋值为一个函数，重复赋值会带来覆盖|只可以被执行（覆盖）多次，第N次都不会带来覆盖|
|简写方案|无|`$(function(){})`|

慕课网的[DOM探索值基础详解篇](http://www.imooc.com/comment/488)有对DOM Ready的一些详细的介绍。

### 对象保存以及解决冲突

下面是`jQuery`对象和原生`JavaScript`DOM对象相互转换的例子：
```JavaScript
$("div").get(0) == $("div")[0] == document.querySelector(".exp");
$(".exp").eq(0) == $(document.querySelector(".exp"));
```
一个项目中引入多个第三方库的时候，由于没有命名空间的约束，会导致对象名称的冲突与覆盖。

`jQuery.noConflict();` ：将$符的所有权剔除。
`var $\$ = jQuery;` ：这样`$\$`就完全体现了原来$函数的功能。

## 选择器

## 元素遍历操作 - Traversing

#### add()

扩展选择器的范围

*参数： jQuery对象，element原生对象， 选择器， 带上下文的选择器， 原生HTML代码*
```JavaScript
  $("li").add("div").css("background", "#999").end(); // this end() return the $("li")
  var pdiv = $( "p" ); pdiv.add( "div" ); // WRONG, pdiv will not change
  $( "li" ).add( "<p id='new'>new paragraph</p>" ).css( "background-color", "red" );
  // although 'p' element has the bg-color but it need to be added to the document
```

#### addBack()

将上一次选择器变动的结果添加到选择结果中

*参数： 选择器*

**tips: understand the realization of this method and the '.end()'**
```JavaScript
// jQuery objects maintain an internal stack that keeps track of changes to the matched set of elements.
// When one of the DOM traversal methods is called, the new set of elements is pushed onto the stack.
// .end() method also use this internal stack. +You can't use it for many times.
$( "li.third-item" ).nextAll().addBack()
  .css( "background-color", "red" );
// .css() method will influence {[<li.third-item>,<li>,<li>,... ]}
```

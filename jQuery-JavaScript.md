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

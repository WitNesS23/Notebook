# JavaScript 模板引擎

### 参考内容

1. [编写一个简单的JavaScript模板引擎 廖雪峰](http://www.liaoxuefeng.com/article/001426512790239f83bfb47b1134b63b09a57548d06e5c5000)
2. [高性能JavaScript模板引擎原理解析 腾讯CDC](http://cdc.tencent.com/?p=5723)
3. [JavaScript模板引擎和实现原理](http://segmentfault.com/a/1190000000432600)
4. [JavaScript模板引擎，几行代码的事儿 Barret Lee](http://www.cnblogs.com/hustskyking/p/principle-of-javascript-template.html)

## 了解原理

1. 对模板的代码进行语法分析
2. 分析后生成原生的JavaScript代码字符串
3. 将生成的代码转为可以重用的Function(Compiled Template)

### - 对模板的代码进行语法分析

常见的模板代码实例，如下面所示

```HTML
<ul>
    <% for(var i in items){ %>
        <li class='<%= items[i].status %>'><%= items[i].text %></li>
    <% } %>
</ul>
```
或者是这样的
```HTML
<h1>Comments</h1>
<div id="comments">
  {{#each comments}}
  <h2><a href="/posts/{{../permalink}}#{{id}}">{{title}}</a></h2>
  <div>{{body}}</div>
  {{/each}}
</div>
```
对于前者模板代码的写法后台的同学比较熟悉，一般`PHP`中的`Smarty`或者`ASP`的语法和这个很类似，下面这个模板代码就是前端中比较流行的`handlebars.js`语法。

比较下两者的写法不难发现，模板代码除去**原生的HTML代码**，剩下的部分大概分为两种：
- **赋值** 顾名思义，就是把值赋值到预设的占位符的位置上面
- **流程控制** 这里可以实现简单的流程控制 譬如上面的 `for(...)`或者`#each` 当然其他`JavaScript`中的`if(...) else{...}`也能实现

我们所实现的模板引擎最起码得实现其中第一项的效果。

## 完善与提升


## 最佳实践
预设的模板引擎代码写在页面的`<script>`标签中，值得注意的是加上`type="text/plain"`。

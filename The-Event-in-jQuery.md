# What can the `event` in `jQuery` can give us

## Description
here are all the properties of the `event` inherit form `object`

### `event.target` & `event.delegateTarget` & `this`

- `event.currentTarget` 在事件冒泡阶段中当前(最底端)的元素 总是与函数的`this`对象相等,但是在使用诸如`jQuery.proxy`或者其他改变函数执行上下文的函数时,`this`的指向会变成指定的对象;
- `event.relatedTarget` 如果存在的话,记录其它被卷入事件的元素 譬如`mouseout`这个属性记录接下来进入的元素,`mouseover`这个属性记录刚刚离开的元素;
- `event.fromElement` & `element.toElement`也是配合`mouseout`和`mouseover`这两个事件,分别记录动作离开和进入的元素,在许多没有`from-to`操作的事件中,`toElement`元素总是和`target`元素保持一致(`IE8>`中不一定)
- `event.delegateTarget` 当前被执行的`jQuery`事件被绑定的对象 这个函数总是被使用在`.on()`或者`.delegate()`这类函数上面,并且保存的是事件监听被绑定的**祖先元素**;
- `event.target` 触发这个事件的元素对象;
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

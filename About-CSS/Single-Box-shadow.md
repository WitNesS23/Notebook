# Box-shadow 学习

## 单边 `box-shadow` 模糊阴影实现方式

```CSS
.container{
  position: relative;
  width: 200px;
  height: 200px;
  overflow: hidden;
  background-color: #fff;
}

.container::before{
  content: "";
  position: absolute;
  background-color: transparent;
  box-shadow: inset 0 0 40px purple;
  left: -40px;
  right: -40px;
  bottom: -40px;
  width: 280px;
  height: 240px;
}
```

在这段代码实现代码中,值得注意的是父容器的`overflow: hidden`,然后是`::before`伪元素中需要根据阴影的扩散来计算最终的宽高和绝对定位偏移量.

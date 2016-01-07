# background 属性

## 总的来说
在目前的css中，一共有如下几个关于`background`的属性

|Attribute|Description|CSS|
|:--|:--|:--:|
|background|set all the description in this.|1|
|background-attachment|fixed or scroll by the page.|1|
|background-clip|the area **background** begin to draw.|3|
|background-color|like the name.|1|
|background-image|like the name, you can some of the others here.|1|
|background-origin|the area **background-image** begin to set.|3|
|background-position|set the **background-image** begin point.|1|
|background-repeat|whether or how to repeat the **background-image**|1|
|background-size|set the size of the **background-image**|3|

从上面的表格中，可以清楚地看到`CSS3`新添加的三个属性：`background-clip`、`background-origin`、`background-size`。下面主要就联系着这三个新属性完整理解下`background`。

## 不简单的老朋友们
`background`这个标签中的CSS1部分，太熟悉太常用了，下面是一些容易被忽略的点：
- 背景图片默认以原尺寸填充，**填充起点**默认是盒模型的`padding`区域，不同于`background-color`的默认填充区域是border区域；
![简单例子]()
- 背景图片默认以左上角为原始位置（0，0），默认按照从左到右、从上到下的顺序**重复填充**，直到填充满整个填充范围；
- 缩写形式：`background: color image position/size repeat origin clip initial|inherit;`
- background 也有层级关系；
- background 不影响盒模型的宽高，不属于盒模型的内容（content）。简单来说，块元素如果没有高度，那么即便指定了背景色/背景图片，也不显示。这里就不同于`<img>`标签的显示效果了，`img`标签作为**可替换**元素是可以根据属性的宽高撑开父容器的。这里某种意义上也可以告诉我们拿到设计图，对着两者的使用选择的根据 - *拿走是不是会改变父容器的布局，或者说是不是必要的布局元素*。提到`img`，不得不提起这个坑，[img白色缝隙]()，链接里面有详细描述，这里就不多赘述了。

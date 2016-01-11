# background 属性

## 总的来说
在目前的css中，一共有如下几个关于`background`的属性

|Attribute|Description|CSS|
|:--|:--|:--:|
|background|set all the description in this.|1|
|background-attachment|fixed or scroll by the page.|1|
|background-clip|the area **background** begin to draw.|3|
|background-color|like the name.|1|
|background-image|like the name, you can set some of the others here.|1|
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
- background 不影响盒模型的宽高，不属于盒模型的内容（content）。简单来说，块元素如果没有高度，那么即便指定了背景色/背景图片，也不显示。
- 这里就不同于`<img>`标签的显示效果了，`img`标签作为**可替换**元素是可以根据属性的宽高撑开父容器的。这里某种意义上也可以告诉我们拿到设计图，对着两者的使用选择的根据 - *拿走是不是会改变父容器的布局，或者说是不是必要的布局元素可以使用background*。提到`img`，不得不提起这个坑，[img的白色缝隙]()，链接里面有详细描述，这里就不多赘述了。

### 讲不清楚的 background-attachment

### 提一下 background-position



## 认识下新朋友

### 背景图片的绘制起点 background-origin

该属性主要用来决定背景图片与元素的对其原点的参考点，默认是**以元素`border`部分与`padding`部分的交界处**开始绘制，这个属性可以改变这个开始绘制的起点。

*tips: 'absolute' 元素相对于'relative' 元素的位置也是从这个点开始计算的*

##### `background-origin` 有三个属性：
- `padding-box`：默认值。背景图片原点与元素的`padding`外边缘（`border`的内边缘）进行对齐；
- `border-box`：背景图片原点与元素的`border`的外边缘进行对齐；
- `content-box`：背景图片的原点和元素`content`外边缘（`padding`内边缘进行对齐）；

##### 浏览器的兼容性：
**ie9+**和现代浏览器都支持，但是使用还需要加上前缀

```CSS
/*old Webkit and Gecko*/
-moz-background-origin: padding || border|| content;
-webkit-background-origin: padding || border|| content;
/*new Webkit and Gecko*/
-moz-background-origin: padding-box || border-box || content-box;
-webkit-background-origin: padding-box || border-box || content-box;
background-origin: padding-box || border-box || content-box; /*w3c标准*/
```

##### Demos:

### 背景的裁切起点 background-clip

##### `background-clip` 有三个取值：
- `border`：（默认值）仅在`border`区域显示背景（边框外边缘）；
- `padding-box`：仅在`padding`区域显示背景（边框内边缘）；
- `content-box`：仅在内容区域显示背景（从padding内边缘）；

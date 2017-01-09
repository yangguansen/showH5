# showH5

项目介绍：<br>
这个项目是自己封装搭建的基于手机端应用的静态展示类H5模板，就像平时在微信朋友圈常见的分享链接，点进去之后可以上下滑动，每一个页面都有单独图片元素产生入场动画，应用于活动推广运营之类。对于有这方面需求的朋友，可以参考此模板中的方法，有哪里写得不好的地方，还望大家指出，便于相互交流学习。<br>
CSS动效库引用的是animate.css，该库封装了丰富的动画效果。也可以自己进行扩展封装。<br>
JS库引用了zepto.js和touch模块，用来监听上下左右滑动和点击事件。如果项目中有需要前后端交互事件，也可以直接使用zepto中的ajax方法。<br>
项目demo：http://cq.sina.com.cn/zt/2016/12/bbnw.html<br>
代码介绍：<br>
1、<br>
首先引入动画类库：<br>
```
<link type="text/css" rel="stylesheet" href="http://chongqing.sinaimg.cn/images/zyhcqr/css/animate.min.css">
```
<br>
然后是该模板的css样式表，也可根据自己需要进行改写：<br>
```
<link rel="stylesheet" href="showH5.css">
```
<br>
接下来是zepto库：<br>
```
<script src="http://apps.bdimg.com/libs/zepto/1.1.4/zepto.min.js"></script>
<script src="http://chongqing.sinaimg.cn/20160616_tgxc/img/js/touch.js"></script>
```
<br>
微信JS库可以用来定义分享的配图和title,目前微信浏览器不支持自动播放音乐，使用微信JS方法可hack自动播放：
<br>
```
WeixinJSBridge.invoke('getNetworkType', {}, function(e) {
    var audio = document.getElementById('theaudio');
    audio.play();
});
```
<br>
最后是自己封装的方法库：<br>
```
<script src="showH5.js"></script>
```
<br>
封装了上下滑动翻页方法，首页图片加载方法，音乐播放等方法。有需要者可根据自己需求进行改写。
<br>
2、<br>
其次编写页面中的html代码：把每一页的图片元素用img标签写入。<br>
```
<img src="p12.png" class="pos_abs animated p12" data-class="bounceIn" data-delay="1.3s">
```
<br>
每个标签class类有3个，`pos_abs`表示绝对定位，每一页的每个元素也都是使用绝对定位，方便高效。<br>
`animated`类表示需要加入动效的元素标签。<br>
`p12`是自己根据需要用来对标签进行样式编写，比如`top` `left`。<br>
`data-class`表示动效名称；<br>
`data-delay`表示**进入此页后**，延时多久出现该元素<br>
2、<br>
```
<div class="page page1 animated fadeIn hide">						
	<img src="p11.png" class="pos_abs animated p11" data-class="bounceInDown" data-delay="0.3s">
    <img src="p12.png" class="pos_abs animated p12" data-class="bounceIn" data-delay="1.3s">
    <img src="p13.png" class="pos_abs animated p13" data-class="fadeInUp" data-delay="2.3s">
    <div class="pos_abs animated p14_parent">
        <img src="p14.png" class="pos_abs animated p14" data-class="fadeInUp" data-delay="3.3s" alt=""> 
    </div>
</div>
```
<br>
以上代码是第一页的所有图片元素，`p14`类比较特别，是因为该图片元素进入页面后，需要改变动效，循环执行下一种动效，就需要用div将其包裹，监听img标签动画执行完毕后，使div添加动画class：
`showH5.AnimationEnd(".p14", "pulse");`第一个参数是被监听图片元素，第二个参数是入场动画完毕后，需要切换的动画类名。
<br>
3、<br>
首先需要加载图片：`showH5.loadImg();`<br>
在手机端如果需要单页禁止滑动，就禁止浏览器默认滑动事件：<br>
```
document.addEventListener('touchmove', function (event) {
    event.preventDefault();
}, false);
```
<br>
PC端显示居中：<br>
```
if(showH5.IsPC()){
    document.body.style.margin = "0px auto";
} 
```
<br>
PC端手机模拟器调试，调整不同机型时的resize事件：<br>
```
window.onresize = function(){
    showH5.viewResize();
}
```
<br>
向上滑动到下一页<br>
```
$("body").swipeUp(function(){ 
    showH5.next();                
})
```
<br>
向下滑动到上一页<br>
```
$("body").swipeDown(function(){ 
    showH5.last();                
});
```
<br>
自动播放音乐：<br>
```
showH5.autoPlayAudio('music3.mp3');
```
<br>
参数为音乐地址。<br>
如果需要为元素绑定点击事件，需用以下绑定方式：<br>
```
$(document).on("tap", ".p11", function(){
	//do something...
})
```
<br>
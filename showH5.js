(function(globle){
    var showH5 = (function(){
        return{
            num: 1,
            total : $(".page").length,
            audio : undefined,
            initHtml : function (){    //初始化class
                var AnimateImg = $($(".page" + this.num)).find(".animated");
                $(AnimateImg).each(function(index, value){
                    var animationStyle = $(this).data("class");
                    $(this).removeClass(animationStyle);
                })  
            },
            next : function(){
                if(this.num < this.total){
                    $(".page" + this.num).addClass("fadeOut hide");
                    this.initHtml();
                    this.num++;
                    this.setAnimation(this.num);
                }
            },                        
            last : function(){
                if(this.num > 1){
                    $(".page" + this.num).addClass("fadeOut hide");
                    this.initHtml();
                    this.num--;
                    this.setAnimation(this.num);
                }
            },           
            setAnimation : function(pageNum){
                $(".page" + pageNum).removeClass("fadeOut hide");
                var AnimateImg = $(".page" + pageNum).find(".animated");
                $(AnimateImg).each(function(index, value){
                    var animationStyle = $(this).data("class");
                    var animationDelay = $(this).data("delay");
                    $(this).addClass(animationStyle).css({
                        "animation-delay":animationDelay,
                        "-webkit-animation-delay":animationDelay
                    });
                })  
            },                            
            loadImg : function(){
                var totalNum = 0;
                var jiazai = 0;
                var imgs = document.getElementsByTagName("img");
                var imgLen = imgs.length;        
                function setBaiNum(bai){
                    $("#baifen_txt").text(bai);
                    if(bai == 100){
                        setTimeout(function(){
                            $(".p1_close").addClass('hide');                                
                            showH5.setAnimation(1);                            
                        }, 500);
                        
                    }
                }
                for(var i = 0; i < imgLen; i++){
                    if(imgs[i].complete){
                        jiazai++;
                        var baifenbi = Math.floor(jiazai/imgLen*100);
                        setBaiNum(baifenbi);
                        continue;
                    }
                    imgs[i].onload = function(){
                        jiazai++;
                        var baifenbi = Math.floor(jiazai/imgLen*100);
                        setBaiNum(baifenbi);
                        
                    }
                }
            },
            IsPC : function (){
                var userAgentInfo = navigator.userAgent;
                var Agents = ["Android", "iPhone", "SymbianOS", "Windows Phone", "iPad", "iPod"];
                var flag = true;
                for (var v = 0; v < Agents.length; v++) {
                    if (userAgentInfo.indexOf(Agents[v]) > 0) {
                        flag = false;
                        break;
                    }
                } 
                return flag;  
            },
            toPage: function(num){
                $(".page" + this.num).addClass('hide');
                ff.initHtml(this.num-1, $(".page" + this.num));
                ff.setAnimation(num);
                ff.num = num;
            },
            AnimationEnd : function(div){
                var divParent = $(div + "_parent");
                var AnimateClass = $(divParent).data('class');
                $(document).on("webkitAnimationEnd", div, function(e){
                    $(divParent).addClass(AnimateClass);
                })                    
            },
            autoView : function (userAgent){
                var screen_w=parseInt(window.screen.width),scale=screen_w/640;
                var head = document.getElementsByTagName('head')[0];        
                if(/Android (\d+\.\d+)/.test(userAgent)){
                    var version=parseFloat(RegExp.$1);
                    head.innerHTML+=(version>2.3?'<meta id="auto_view" name="viewport" content="width=640, initial-scale = '+scale+',user-scalable=1, minimum-scale = '+scale+', maximum-scale = '+scale+', target-densitydpi=device-dpi">':'<meta name="viewport" content="width=640, target-densitydpi=device-dpi">');
                }else{
                    head.innerHTML+=('<meta id="auto_view" name="viewport" content="width=640, initial-scale = '+scale+' ,minimum-scale = '+scale+', maximum-scale = '+scale+', user-scalable=no, target-densitydpi=device-dpi">');
                };                          
            },
            viewResize : function(){
                var screen_w=parseInt(window.screen.width),scale=screen_w/640;
                $("#auto_view").attr("content","width=640, initial-scale = "+scale+",user-scalable=1, minimum-scale = "+scale+", maximum-scale = "+scale);
                if(showH5.IsPC()){
                    document.body.style.margin = "0px auto";
                }
            },
            autoPlayAudio : function (music_src) {                   
                this.playmusic(music_src);             
                try{
                    WeixinJSBridge.invoke('getNetworkType', {}, function(e) {
                        var audio = document.getElementById('theaudio');
                        audio.play();
                    });
                } catch(err){
                    console.log(err);
                }               
            },
            playmusic : function(music_src){
                $('.Vbody').append('<div id="audiobox"><span id="radmark"></span><p class="icon-music" id="start"></p></div>');
                var audio =  document.createElement("audio");
                audio.id = 'theaudio';
                audio.loop = 'loop';
                audio.autoplay='autoplay';
                audio.src = music_src;
                this.audio = audio;
                $('#audiobox').append(audio);
                $('#start').addClass('rotate'); 
                $('#start').bind('tap',function(){
                    showH5.playOrPaused(); 
                });
                 
            },
            playOrPaused : function (){
                if(this.audio.paused){
                    this.audio.play();
                    $('#start').addClass('rotate'); 
                    $('#radmark').addClass('radmark-show');
                    $('#radmark').html('播放');
                    setTimeout(function(){ $('#radmark').removeClass('radmark-show'); },1000);
                    return;
                }
                this.audio.pause();
                $('#start').removeClass('rotate');  
                $('#radmark').addClass('radmark-show');
                $('#radmark').html('暂停');
                setTimeout(function(){ $('#radmark').removeClass('radmark-show'); },1000);
            }
        }
    })();
    globle.showH5 = showH5; 
    showH5.autoView(navigator.userAgent);
    window.addEventListener("load", function(){
        showH5.total = $(".page").length;
    })
})(this);	

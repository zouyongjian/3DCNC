var kefuLink;
(function(window) {
    $.ajax({
        type:"get",
        url: "getQQ.php",
        error:function(err){
            console.log(err.status);
        },
        success:function(data){
            console.log(data);
            if(data == 0){
                kefuLink = "http://wpa.qq.com/msgrd?v=3&uin=3433882064&site=qq&menu=yes";
            }else{
                kefuLink = "http://wpa.qq.com/msgrd?v=3&uin=3068755713&site=qq&menu=yes";
            }
        },
    }).done(function(){
        $.ajax({
            type:"get",
            url: "getQQ.php",
            error:function(err){
                console.log(err.status);
            },
            success:function(data){
                console.log(data);
                if(data == 0){
                    kefuLink = "http://wpa.qq.com/msgrd?v=3&uin=3433882064&site=qq&menu=yes";
                }else{
                    kefuLink = "http://wpa.qq.com/msgrd?v=3&uin=3068755713&site=qq&menu=yes";
                }
            },
        }).done(function(){
            $(".QQkefu").attr("href",kefuLink);
        })
    })
    var theUA = window.navigator.userAgent.toLowerCase();
    if ((theUA.match(/msie\s\d+/) && theUA.match(/msie\s\d+/)[0]) || (theUA.match(/trident\s?\d+/) && theUA.match(/trident\s?\d+/)[0])) {
        var ieVersion = theUA.match(/msie\s\d+/)[0].match(/\d+/)[0] || theUA.match(/trident\s?\d+/)[0];
        if (ieVersion <= 9) {
            window.location.href="browser.html";
        };
    }
    //右侧客服栏
    //链接到QQ群
    $(".linkQQ").click(function(){
        window.location.href="http://shang.qq.com/wpa/qunwpa?idkey=e03b823e009e1c5fc587fe1de86a81766e43d070d617e64abf5d19f877d7da5b";
    });
    //链接到手机客户端
    $(".linkM").click(function(){
        window.location.href = 'http://ke.3dsjw.com/mobile/';
    })
    //链接到客服
    $(".linkService").click(function(){
        //window.location.href = kefuLink;
        openwin(kefuLink);
    });
    if(navigator.userAgent.match(/(iPhone|iPod|Android|ios)/i)){
        //客服位置向上调
        $("#lanren").css("top","50%");
        if(isSafari=navigator.userAgent.indexOf("Safari")>0&&navigator.userAgent.indexOf("Chrome")<0) {
            $("#lanren .number").html("0577-62768008")
        }
        $("html").css("position","relative");
        $(".serviceHover").click(function(ev){
            $("#lanren").stop().animate({"right":"-32px"});
            $("#lanren .pic").hide();
            $(this).children(".pic").show();
            ev.stopPropagation();
        });
        document.addEventListener("touchstart",function(ev){
            $("#lanren .pic").hide();
            $("#lanren").stop().animate({"right":"-65px"});
            ev.stopPropagation();
        });
        for(var i=0;i<document.getElementsByClassName('pic').length;i++){
            document.getElementsByClassName('pic')[i].index = i;
            document.getElementsByClassName('pic')[i].addEventListener("touchstart",function(ev){
                ev.stopPropagation();
            })
        }
    }else{
        $("html").css("position","relative");
        $(".serviceHover").mouseenter(function(){
            var that = $(this)
            $(".serviceHover .pic").hide();
            $(this).children(".pic").show();
            setTimeout(function(){
                $(this).children(".pic").hide();
            },300)
            
        });
        $(".serviceHover .pic").mouseenter(function(){
            $(".serviceHover .pic").hide();
            $(this).show();
            $(".serviceHover").mouseenter(function(){
                return null;
            });
            $(this).mouseout(function(){
                $(this).hide()
            })
        });
        $("#lanren").mouseover(function(){
            var that = $(this);
            $(this).stop().animate({"right":"-32px"});
        });
        $("#lanren").mouseout(function(){
            $(this).stop().animate({"right":"-65px"});
            $(".serviceHover .pic").hide();
        });
        $(".serviceHover .pic").mouseout(function(){
            $("#lanren").mouseout(function(){
                $(".serviceHover .pic").hide();
            })
        })

        //透明度效果
        $(".serviceHover>a").mouseenter(function(){
            $(this).stop().animate({"opacity":"0"});
        })
        $(".serviceHover>a").mouseout(function(){
            $(this).stop().animate({"opacity":"0.4"});
        });
    }
})(window);
$(window).scroll(function(){
	var t = document.documentElement.scrollTop || document.body.scrollTop;
    //console.log(t)
	 if(t>755){
	 	$("nav").css({
	 		"position":"fixed",
	 		"top":"0"
	 	});
	 	$(".chat").show();
	 }else{
	 	$("nav").css({
	 		"position":"relative"
	 	});
	 	$(".chat").hide();
	 }
})
//hiema
//给每个li添上遮罩
$(".service .normal").append("<span class='bg'></span>")
var nodes = document.querySelectorAll('.li_3d'), _nodes = [].slice.call(nodes, 0);
var getDirection = function (ev, obj) {
    var w = obj.offsetWidth, h = obj.offsetHeight, x = ev.pageX - obj.offsetLeft - w / 2 * (w > h ? h / w : 1), y = ev.pageY - obj.offsetTop - h / 2 * (h > w ? w / h : 1), d = Math.round(Math.atan2(y, x) / 1.57079633 + 5) % 4;
    return d;
};
var addClass = function (ev, obj, state) {
    var direction = getDirection(ev, obj), class_suffix = '';
    obj.className = '';
    switch (direction) {
        case 0:
            class_suffix = '-top';
            break;
        case 1:
            class_suffix = '-right';
            break;
        case 2:
            class_suffix = '-bottom';
            break;
        case 3:
            class_suffix = '-left';
            break;
    }
    obj.classList.add(state + class_suffix);
};
_nodes.forEach(function (el) {
    el.addEventListener('mouseover', function (ev) {
        addClass(ev, this, 'in');
    }, false);
    el.addEventListener('mouseout', function (ev) {
        addClass(ev, this, 'out');
    }, false);
});
//视频地址
var aVideoLink = ['<embed src="https://imgcache.qq.com/tencentvideo_v1/playerv3/TPout.swf?max_age=86400&v=20161117&vid=f0506xdx4se&auto=0" allowFullScreen="true" quality="high" width="100%" height="100%" align="middle" allowScriptAccess="always" type="application/x-shockwave-flash"></embed>','<embed src="https://imgcache.qq.com/tencentvideo_v1/playerv3/TPout.swf?max_age=86400&v=20161117&vid=m0505k2rjv9&auto=0" allowFullScreen="true" quality="high" width="100%" height="100%" align="middle" allowScriptAccess="always" type="application/x-shockwave-flash"></embed>','<embed src="https://imgcache.qq.com/tencentvideo_v1/playerv3/TPout.swf?max_age=86400&v=20161117&vid=x05068ryypb&auto=0" allowFullScreen="true" quality="high" width="100%" height="100%" align="middle" allowScriptAccess="always" type="application/x-shockwave-flash"></embed>']
//视频播放
$(".play_btn").click(function(){
	$("#videoBox").show();
	$(this).hide();
    $(".video ul li").eq(1).find("span").addClass("playing").html("正在播放");
	//$(".video video")
})
//右边的视频播放
$(".video ul li").click(function(){
    $(".video ul li span").empty();
    $(this).find("span").addClass("playing").html("正在播放");
    $("#videoBox").empty();
    $("#videoBox").append(aVideoLink[$(this).index()]);
    $(".play_btn").hide();
    $("#videoBox").show();
})

//轮播图
var mySwiper1 = new Swiper('.swiper-container',{
	loop : true,
	autoplay:'2000',
	prevButton:'.swiper-button-prev',
	nextButton:'.swiper-button-next',
	pagination : '.swiper-pagination',
	 paginationClickable :true,
});
var mySwiper2 = new Swiper('.swiper-container',{
	loop : true,
	autoplay:'2000',
	prevButton:'.swiper-button-prev',
	nextButton:'.swiper-button-next',
	pagination : '.swiper-pagination',
	paginationClickable :true,
});


//单辉作品介绍


//课程大纲切换
$(".step li").click(function(){
	var index = $(this).index()+1;
	// $(".step li").css("background-color","#747474");
	// $(this).css("background-color","#2c80f8");
    $(".step li").removeClass("stepnow");
    $(this).addClass("stepnow");
	$(".stepcon").hide();
	$(".step"+index).show();
})


//百度地图
var map = new BMap.Map("mymap");
var point = new BMap.Point(121.012277,28.081299);
map.centerAndZoom(point, 18);
var marker = new BMap.Marker(point);  // 创建标注
map.addOverlay(marker);               // 将标注添加到地图中
marker.setAnimation(BMAP_ANIMATION_BOUNCE); //跳动的动画
map.enableScrollWheelZoom(true);     //开启鼠标滚轮缩放


	//map.centerAndZoom(point, 15);
	var opts = {
	  width : 200,     // 信息窗口宽度
	  height: 100,     // 信息窗口高度
	  title : "" , // 信息窗口标题
	  enableMessage:true,//设置允许信息窗发送短息
	  message:""
	}
	var infoWindow = new BMap.InfoWindow("地址：温州市乐清市经济开发区纬五路188号", opts);  // 创建信息窗口对象 
	marker.addEventListener("click", function(){          
		map.openInfoWindow(infoWindow,point); //开启信息窗口
	});


//图片放大效果
$(".teachImg img").hover(
	function(){
        if($(this).attr("type") == "center"){
            $(this).css("z-index","111").stop().animate({"width":"1000px","left":"-338px"})
        }else{
            $(this).css("z-index","111").stop().animate({"width":"1000px"})
        }
		
	},
	function(){
		$(this).stop().animate({"width":"324px","z-index":"110"});
        if($(this).attr("type") == "center"){
            $(this).css("z-index","111").stop().animate({"width":"324px","left":"0","z-index":"110"})
        }else{
            $(this).css("z-index","111").stop().animate({"width":"324px","z-index":"110"})
        }
	}
)

//总体切换
var nowNavIndex = 0;
var nowScrollTop =[755,755,755,755];
$("#navcon ul li").click(function(){
    nowScrollTop[nowNavIndex] = $(this).offset().top;
    if($(this).index() != nowNavIndex){
        var nowSection = $(this).index();
        $("#navcon li").removeClass("now");
        $(this).addClass("now");
        $("section .section_container").hide();
        $("section .section_container").eq(nowSection).show();
        $("html,body").animate({scrollTop:nowScrollTop[$(this).index()]},500);
        nowNavIndex = $(this).index();
    }	
});
//cha查看详细大纲
$(".dagang .lookmore").click(function(){
    $("#navcon li").removeClass("now");
    $("#navcon li").eq(1).addClass("now");
    $("section .section_container").hide();
    $("#section2").show();
    $("html,body").animate({scrollTop:800},500);
})

//学员回访
//验证学员号码
var verifyNum;
var isClickble = true;
var time = 120;
var phone = /^1\d{10}$/;
$(".getverify .sendverify").click(function(){
    if(!phone.test($("#tel").val())){
        alert("请填写正确的手机号")
    }else if(isClickble){
        $.ajax({
            type:"post",
            url: "smsVerify.php?action=getVerify",
            data:"telNum="+$("#tel").val(),
            error:function(err){
                alert(err.status);
            },
            success:function(data){
                data = JSON.parse(data);
				console.log(data.number);
                res = JSON.parse(data.result);
                console.log(res)
                if(res.res_code == 0){
                    verifyNum = data.number;
                    alert("发送成功");
                }else if(res.res_message == "call_threshold over"){
                    alert("超过获取最多次数拒绝发送");
                }else if(res.res_message == "接收方电话号码非法"){
                    alert("接收方电话号码非法");
                }else{
                    alert("发送失败，请稍后再试");
                }
                console.log(verifyNum);
            },
        });
        isClickble = false;
        var time = 120;
        var timer = setInterval(function(){
            $(".address .verify .sendverify").html("<b>"+time+"</b>s后重新获取");
            time--;
            if(time<=0){
                $(".address .verify .sendverify").html("获取验证码");
            }
        },1000)
    }
});
$(".verify em").click(function(){
    console.log(verifyNum);
    //发送手机号到客服
    if($("#student").val() == ""){
        alert("姓名不能为空");
    }else if(verifyNum == $("#verifyNum").val()){
        //发给第一个人
        $.ajax({
            type:"post",
            url: "saveNum.php?action=getVerify",
            data:"telNum="+$("#tel").val()+"&&student="+$("#student").val(),
            error:function(err){
                alert(err.status);
            },
            success:function(data){
                console.log(data)
                data = JSON.parse(data);
                res = JSON.parse(data.result);
                console.log(res)
                if(res.res_code == 0){
                    alert("发送成功，请耐心等候");
                }else{
                    alert("发送错误，请稍后再试");
                }  
            },
        });
        //发给第二个人
        // $.ajax({
        //     type:"post",
        //     url: "saveNum.php?action=getVerify",
        //     data:"telNum="+$("#tel").val()+"&&student="+$("#student").val(),
        //     error:function(err){

        //     },
        //     success:function(data){
        //         console.log(data)
        //         data = JSON.parse(data);
        //         res = JSON.parse(data.result);
        //         console.log(res)
        //     }
        // });
     }else{
        alert("验证码或手机错误")
     }
});


//判断是哪位客服
var kefuCanChange = false;
$(".QQkefu").click(function(){
    $.ajax({
        type:"get",
        url: "getQQ.php",
        error:function(err){
            console.log(err.status);
        },
        success:function(data){
            console.log(data);
            if(data == 0){
                kefuLink = "http://wpa.qq.com/msgrd?v=3&uin=3433882064&site=qq&menu=yes";
            }else{
                kefuLink = "http://wpa.qq.com/msgrd?v=3&uin=3068755713&site=qq&menu=yes";
            }
        },
    }).done(function(){
        $(".QQkefu").attr("href",kefuLink)
    })
    
});

function openwin(url) {
    var a = document.createElement("a");
    a.setAttribute("href", url);
    a.setAttribute("target", "_blank");
    a.setAttribute("id", "camnpr");
    document.body.appendChild(a);
    a.click();
}


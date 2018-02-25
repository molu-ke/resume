//处理兼容性问题
$().ready(function(){
	$(".fades").css("opacity",0);
	$(".experience_cell").css("opacity",0);
	$(".works_cell").css("opacity",0);
	$(".contactWo").css("opacity",0);
});

$().ready(function(){
	//第一页 动画效果
	var n=1;
	setInterval(function(){
		n++;
		if(n==5){
			n=1;
		}
		$(".bgImg>li").removeClass("myAnination");
		$(`.bgImg>li:nth-child(${n})`).addClass("myAnination");
	},5000);
	
	//第四页 我的经历
	//标题==》圆圈
	$(".work-right>li").on("mouseover","h3",function(){
		$(this).css("color","rgb(107,195,13)");
		var indexLi=$(this).parent().index();
		$(`.work-left>li:nth-child(${indexLi+1}) span`).css({
			"border-width":"8px",
			"top":"-4px",
			"right":"-2px"
		})
	}).on("mouseout","h3",function(){
		$(this).css("color","inherit");
		$(".work-left>li>span").css({
			"border-width":"2px",
			"top":"2px",
			"right":"4px"
			
		})
	})

	//圆圈==》标题
	$(".work-left>li").on("mouseover","span",function(){
		$(this).css({
			"border-width":"8px",
			"top":"-4px",
			"right":"-2px"
		})
		var indexLi=$(this).parent().index();
		$(`.work-right>li:nth-child(${indexLi+1}) h3`).css("color","rgb(107,195,13)")

	}).on("mouseout","span",function(){
		$(this).css({
			"border-width":"2px",
			"top":"2px",
			"right":"4px"
		})
		$(".work-right>li>h3").css("color","inherit");
	})
	
	//第五页 我的作品
	$(".paging").on("click","span",function(){
		$(this).parent().children().removeClass("pitchPaging");
		$(this).addClass("pitchPaging");
		var pagingIndex=$(this).index();
		$(`.works>div`).hide();
		$(`.works>div:nth-child(${pagingIndex+1})`).show();

	})

	//第六页 联系我
	$(".icon>a").hover(
		function(){
			$(this).children().last().fadeIn();
		},
		function(){
			$(this).children().last().fadeOut();
		}
	)
	//音乐播放
	var audio=$("#audio")[0];
	$(".play").hover(
		function(){
			if(audio.paused){
				$(".demoSpan2").css("opacity","1");
			}else{
				$(".demoSpan1").css("opacity","1");
			}
			
		},
		function(){
			if(audio.paused){
				$(".demoSpan2").css("opacity","0");
			}else{
				$(".demoSpan1").css("opacity","0");
			}
			
		}
	);
	$(".play").on("click",function(){
		if(audio.paused){
			 audio.play();
			 $(".demoSpan2").css("opacity","0");
			 $(".demoSpan1").css("opacity","1");
		}else{
			audio.pause();
			$(".demoSpan2").css("opacity","1");
			 $(".demoSpan1").css("opacity","0");
		}
	})
})
//楼层滚动
$().ready(function(){
	var hTop=0;	//滚动高度
	var actualHeight=0;  //楼层离body的高度
	var num=null;//样式下标
	var oLi=$("#menu>ul>li");
	var navHeight=$(".navbar")[0].offsetHeight;//导航条高度
	var sectionHegiht=$(".section1")[0].offsetHeight;//第一个页面的高度
	var isbool=true; //开关 
	
	show();
	window.onscroll=function(){
		show();
	}
	function show(){
		hTop=document.body.scrollTop|| document.documentElement.scrollTop|| window.pageYOffset;
		//导航条固位
		if(sectionHegiht<=hTop){
			$(".navbar").addClass("fixed");
		}else{
			$(".navbar").removeClass("fixed");
		}

		//让导航栏随着楼层的滚动
		if(hTop>=sectionHegiht){
			for(var i=0; i<oLi.length; i++){
				if(hTop +navHeight>= $(".section")[i+1].offsetTop){
					num = i;
				}
			}
			$("#menu>ul>li>a").removeClass("pitch");
			oLi[num].firstElementChild.className="pitch";
			//标签的水平线宽度变化
			$(`#dowebok>.section:nth-child(${num+2}) hr`).css("width","70");
		}
		//第三页技能掌握
		if(num==1){
			$(".fades").addClass("upperClass");
			$(".fades>div:nth-child(1) .left-clip").css("animation","circleHTML 1s linear");
			$(".fades>div:nth-child(2) .left-clip").css("animation","circleCSS 1s linear");
			$(".fades>div:nth-child(3) .left-clip").css("animation","circleJS 1s linear");
			$(".fades>div:nth-child(4) .left-clip").css("animation","circleJQ 1s linear");
		}
		//第四页我的经历
		if(num==2){
			$(".experience_up").addClass("upperClass");
		}
		//第五页我的作品
		if(num==3){
			$(".works").addClass("upperClass");
			$(".works_cell").addClass("upperClass");
		}
		//第六页联系我
		if(num==4){
			$(".contactWo").addClass("upperClass");
			popWrite();
		}
	};
	//第六页 文字弹跳 
	function popWrite(){
		var span=$(".frameCenter>span");
		span[0].style.animation="dap 0.3s linear 1s";
		span[1].style.animation="dap 0.3s linear 1.3s";
		span[2].style.animation="dap 0.3s linear 1.6s";
		span[3].style.animation="dap 0.3s linear 1.9s";
	}
	//点击跳转到对应的页面
	$("#menu").on("click","ul>li>a",function(e){
		e.preventDefault();
		//样式选中
		$("#menu>ul>li>a").removeClass("pitch");
		$(this).addClass("pitch");
		var index=$(this).parent().index();
		var floorHeight=$(`#dowebok>.section:nth-child(${index+2})`)[0];
		//楼层的高度-导航条的高度
		if(index==0){
			actualHeight=floorHeight.offsetTop;
		}else{
			actualHeight=floorHeight.offsetTop-navHeight;
		}
		//过渡效果（存在兼容性问题）
		if(document.body.scrollTop==0){
			//火狐、谷歌61以上版本
			var oTimer = setInterval(function(){
				if(document.documentElement.scrollTop>actualHeight){
					hTop-=10;
					document.documentElement.scrollTop=hTop;
					if(hTop<= actualHeight){
						clearInterval(oTimer)
						document.documentElement.scrollTop = actualHeight;
					}
				}else if(document.documentElement.scrollTop<=actualHeight){
					hTop+=10;
					document.documentElement.scrollTop=hTop;
					if(hTop>= actualHeight){
						clearInterval(oTimer)
						document.documentElement.scrollTop = actualHeight;
					}
				}
			})
		}else{
			//360，谷歌59以下版本
			var oTimer = setInterval(function(){
				if(document.body.scrollTop>actualHeight){
					hTop-=10;
					document.body.scrollTop=hTop;
					if(hTop<= actualHeight){
						clearInterval(oTimer)
						document.body.scrollTop = actualHeight;
					}
				}else if(document.body.scrollTop<=actualHeight){
					hTop+=10;
					document.body.scrollTop=hTop;
					if(hTop>= actualHeight){
						clearInterval(oTimer)
						document.body.scrollTop = actualHeight;
					}
				}
			})
		}
	});
});
//Bootstrap幻灯片轮播图支持触屏左右手势滑动的实现方法
$().ready(function(){
	$(function(){
		var myElement= document.getElementById('ad')
		var hm=new Hammer(myElement);
		hm.on("swipeleft",function(){
		$('#ad').carousel('next')
		})
		hm.on("swiperight",function(){
		$('#ad').carousel('prev')
		})
	})
});




//�������������
$().ready(function(){
	$(".fades").css("opacity",0);
	$(".experience_cell").css("opacity",0);
	$(".works_cell").css("opacity",0);
	$(".contactWo").css("opacity",0);
});

$().ready(function(){
	//��һҳ ����Ч��
	var n=1;
	setInterval(function(){
		n++;
		if(n==5){
			n=1;
		}
		$(".bgImg>li").removeClass("myAnination");
		$(`.bgImg>li:nth-child(${n})`).addClass("myAnination");
	},5000);
	
	//����ҳ �ҵľ���
	//����==��ԲȦ
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

	//ԲȦ==������
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
	
	//����ҳ �ҵ���Ʒ
	$(".paging").on("click","span",function(){
		$(this).parent().children().removeClass("pitchPaging");
		$(this).addClass("pitchPaging");
		var pagingIndex=$(this).index();
		$(`.works>div`).hide();
		$(`.works>div:nth-child(${pagingIndex+1})`).show();

	})

	//����ҳ ��ϵ��
	$(".icon>a").hover(
		function(){
			$(this).children().last().fadeIn();
		},
		function(){
			$(this).children().last().fadeOut();
		}
	)
	//���ֲ���
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
//¥�����
$().ready(function(){
	var hTop=0;	//�����߶�
	var actualHeight=0;  //¥����body�ĸ߶�
	var num=null;//��ʽ�±�
	var oLi=$("#menu>ul>li");
	var navHeight=$(".navbar")[0].offsetHeight;//�������߶�
	var sectionHegiht=$(".section1")[0].offsetHeight;//��һ��ҳ��ĸ߶�
	var isbool=true; //���� 
	
	show();
	window.onscroll=function(){
		show();
	}
	function show(){
		hTop=document.body.scrollTop|| document.documentElement.scrollTop|| window.pageYOffset;
		//��������λ
		if(sectionHegiht<=hTop){
			$(".navbar").addClass("fixed");
		}else{
			$(".navbar").removeClass("fixed");
		}

		//�õ���������¥��Ĺ���
		if(hTop>=sectionHegiht){
			for(var i=0; i<oLi.length; i++){
				if(hTop +navHeight>= $(".section")[i+1].offsetTop){
					num = i;
				}
			}
			$("#menu>ul>li>a").removeClass("pitch");
			oLi[num].firstElementChild.className="pitch";
			//��ǩ��ˮƽ�߿�ȱ仯
			$(`#dowebok>.section:nth-child(${num+2}) hr`).css("width","70");
		}
		//����ҳ��������
		if(num==1){
			$(".fades").addClass("upperClass");
			$(".fades>div:nth-child(1) .left-clip").css("animation","circleHTML 1s linear");
			$(".fades>div:nth-child(2) .left-clip").css("animation","circleCSS 1s linear");
			$(".fades>div:nth-child(3) .left-clip").css("animation","circleJS 1s linear");
			$(".fades>div:nth-child(4) .left-clip").css("animation","circleJQ 1s linear");
		}
		//����ҳ�ҵľ���
		if(num==2){
			$(".experience_up").addClass("upperClass");
		}
		//����ҳ�ҵ���Ʒ
		if(num==3){
			$(".works").addClass("upperClass");
			$(".works_cell").addClass("upperClass");
		}
		//����ҳ��ϵ��
		if(num==4){
			$(".contactWo").addClass("upperClass");
			popWrite();
		}
	};
	//����ҳ ���ֵ��� 
	function popWrite(){
		var span=$(".frameCenter>span");
		span[0].style.animation="dap 0.3s linear 1s";
		span[1].style.animation="dap 0.3s linear 1.3s";
		span[2].style.animation="dap 0.3s linear 1.6s";
		span[3].style.animation="dap 0.3s linear 1.9s";
	}
	//�����ת����Ӧ��ҳ��
	$("#menu").on("click","ul>li>a",function(e){
		e.preventDefault();
		//��ʽѡ��
		$("#menu>ul>li>a").removeClass("pitch");
		$(this).addClass("pitch");
		var index=$(this).parent().index();
		var floorHeight=$(`#dowebok>.section:nth-child(${index+2})`)[0];
		//¥��ĸ߶�-�������ĸ߶�
		if(index==0){
			actualHeight=floorHeight.offsetTop;
		}else{
			actualHeight=floorHeight.offsetTop-navHeight;
		}
		//����Ч�������ڼ��������⣩
		if(document.body.scrollTop==0){
			//������ȸ�61���ϰ汾
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
			//360���ȸ�59���°汾
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
//Bootstrap�õ�Ƭ�ֲ�ͼ֧�ִ����������ƻ�����ʵ�ַ���
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




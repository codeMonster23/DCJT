function carousel(id,interval,speed) {
	var $banner = $(id);
	var $imageListLis = $banner.find(".imageList li");
	// var $leftBtn = $banner.find(".leftBtn");
	// var $rightBtn = $banner.find(".rightBtn");
	var $circles = $banner.find(".circleList li");
	var imageAmount = $imageListLis.length;
	var old;
	var nowimg = 0;

	// $rightBtn.click(rightBtnFunc);	
	function rightBtnFunc(){
		if(!$imageListLis.is(":animated")){
			old = nowimg;
			nowimg ++;
			if(nowimg > imageAmount - 1){
				nowimg = 0;
			}
			
			changePictureAndChangeCircles();
		}
	}	
	// $leftBtn.click(function(){
	// 	if(!$imageListLis.is(":animated")){
	// 		old = nowimg;
	// 		nowimg --;
	// 		if(nowimg < 0){
	// 			nowimg = imageAmount - 1;
	// 		}
			
	// 		changePictureAndChangeCircles();
	// 	}
	// });
	//小圆点
	$circles.click(function(){
		old = nowimg;
		nowimg = $(this).index();
		changePictureAndChangeCircles();
	});

	function changePictureAndChangeCircles(){
		
		$imageListLis.eq(old).stop(true).fadeOut(speed);
		
		$imageListLis.eq(nowimg).stop(true).fadeIn(speed);
		
		$circles.eq(nowimg).addClass("cur").siblings().removeClass("cur");
	}

	//定时器
	var timer = setInterval(rightBtnFunc,interval);

	$banner.mouseenter(function() {
		clearInterval(timer);
	});

	$banner.mouseleave(function() {
		clearInterval(timer);
		timer = setInterval(rightBtnFunc,interval);
	});
}
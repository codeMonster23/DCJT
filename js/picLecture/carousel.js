
function carousel(ele, interval, speed, width) {
    //得到所有元素
    var $picBox = $(ele);
    var $carousel = $picBox.find(".carousel");
    var $imageList = $picBox.find(".imageList");
    var $imageListLis = $picBox.find(".imageList li");
    var $leftBtn = $picBox.find(".leftBtn");
    var $rightBtn = $picBox.find(".rightBtn");
    var $curIndex = $picBox.find(".desc .num .current");
    var $desc = $picBox.find(".desc");
    var imageAmount = $imageListLis.length;
    var nowimg = 0
    if (!width) {
        var windowW = $(window).width();
        if (windowW < 1400) {
            $picBox.css('width', '90%');
        }
        var $picBoxW = $(ele).width();

        $carousel.width($picBoxW - 160);
        $imageListLis.width($picBoxW - 160);

        var carouselW = $carousel.width();
        var carouselH = $carousel.height();
        $('.carousel li').each(function(){
            var img=$(this).find('img');
            var imgW=img.width();
            var imgH=img.height();

            if(imgW>carouselW){
                img.width(carouselW);
            }
            if(imgH>carouselH){
                img.height(carouselH);
            }
            imgW=img.width();
            imgH=img.height();
            $(this).find('.imgWrap').width(imgW);
            $(this).find('.imgWrap').height(imgH);
            img.css({'margin-top':($carousel.height()-imgH)/2})
            
        })
    }
    $desc.width(carouselW)
    $imageListLis.clone().appendTo($imageList);

    var w = width ? width : carouselW;

   
    //右按钮
    $rightBtn.click(function () {
        if (!$imageList.is(":animated")) {
            nowimg++;
            if (nowimg > imageAmount) {
                nowimg = 1;
                $imageList.css("left", 0);
            }
            slide();
        }
    });

    //左按钮
    $leftBtn.click(function () {
        if (!$imageList.is(":animated")) {
            nowimg--;
            if (nowimg < 0) {
                nowimg = imageAmount - 1;
                $imageList.css("left", -w * imageAmount);
            }
            slide();
        }
    });
    function slide() {
        
        $imageList.stop(true).animate({ "left": -w * nowimg }, speed);
        curIndex = nowimg + 1;
        if (nowimg == imageAmount) {
            curIndex = 1;
        }
        
        $curIndex.html(curIndex);
        $imageListLis.eq(curIndex - 1).addClass("cur").siblings().removeClass("cur");

        ////记录本地缓存  给内嵌页传值
        var obj = {};
        if ($imageListLis.eq(curIndex - 1).hasClass("grouplist")) {
            obj.isGroup = true;
            obj.groupId = $imageListLis.eq(curIndex - 1).attr("data-groupid");
        } else {
            obj.isGroup = false;
            obj.picId = $imageListLis.eq(curIndex - 1).attr("data-picid");
        }
        initSsetStorage(obj);
    }
}

function initSsetStorage(obj) {
    console.log(obj);
    setStorageItem("storageSelectPic", JSON.stringify(obj));
}
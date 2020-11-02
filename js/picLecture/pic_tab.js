var $ = $.noConflict();
//ban_qh
$.fn.banqh = function (can) {
    can = $.extend({
        box: null, //总框架
        pic: null, //大图框架
        pnum: null, //小图框架
        prev_btn: null, //小图左箭头
        next_btn: null, //小图右箭头
        prev: null, //大图左箭头
        next: null, //大图右箭头
        pop_prev: null, //弹出框左箭头
        pop_next: null, //弹出框右箭头
        autoplay: false, //是否自动播放
        interTime: 5000, //图片自动切换间隔
        delayTime: 800, //切换一张图片时间
        pop_delayTime: 800, //弹出框切换一张图片时间
        order: 0, //当前显示的图片（从0开始）
        picdire: true, //大图滚动方向（true水平方向滚动）
        mindire: true, //小图滚动方向（true水平方向滚动）
        min_picnum: null, //小图显示数量
        pop_up: false, //大图是否有弹出框
        pop_div: null, //弹出框框架
        pop_pic: null, //弹出框图片框架
        pop_xx: null, //关闭弹出框按钮
        mhc: null, //朦灰层
        num_index: null,
        title_text: null,
        comment_url: null,
    }, can || {});
    //加载弹框
    $('body').append('<div class="poptips" style="display:none;"><div class="mask"></div><div class="modal modal8"><a href="javascript:;" class="close"></a><p>已经到最后一张了！</p><div class="btnGroup"><a href="javascript:;" class="btn_review">再看一遍</a><a href="javascript:;" class="btn2 btn_comment">去评论</a></div></div></div>');
    var picnum = $(can.pic).find('ul li').length;
    var picw = $(can.pic).find('ul li').outerWidth(true);
    var pich = $(can.pic).find('ul li').outerHeight(true);
    var poppicw = $(can.pop_pic).find('ul li').outerWidth(true);
    var picminnum = $(can.pnum).find('ul li').length;
    var picpopnum = $(can.pop_pic).find('ul li').length;
    var picminw = $(can.pnum).find('ul li').outerWidth(true);
    var picminh = $(can.pnum).find('ul li').outerHeight(true);
    var curNum = $(can.cur_num);
    var totalNum = $(can.total_num);
    var pictime;
    var tpqhnum = 0;
    var xtqhnum = 0;
    var popnum = 0;
    var xteu = 0;
    totalNum.html(picnum);


    //点击小图切换大图
    $(can.pnum).find('li').click(function () {
        tpqhnum = xtqhnum = $(can.pnum).find('li').index(this);
        show(tpqhnum);
        minshow(xtqhnum, false);
    }).eq(can.order).trigger("click");




    //修改版12.10，满足小图一次切换七张---------------------------------//

    var mNum = 7; //每次切换的张数
    $(can.prev_btn).click(function () {
        // if (xteu <= 0) {
        //     // return;
        //     xteu = picnum
        // };
        if(xteu - mNum < 0 ){
            xteu = picnum + xteu - mNum + 1;
        }else if(xteu - mNum > 0){
            xteu = xteu - mNum;
        }else{
            xteu = 0;
        }

        // xteu--;

        minshow(xteu, true);
       
    })

    $(can.next_btn).click(function () {

        if (xteu >= picnum - 1) {
            xteu = -1;
        };

        // xteu++;
        if((xteu + mNum) > picnum){
            xteu = (xteu + mNum) % picnum - 1;
        }else if((xteu + mNum) < picnum) {
            xteu = xteu + mNum;
        }else {
            xteu = (xteu + mNum) % picnum;
        }

        minshow(xteu, true);
    
    })


    $(document).keydown(function (e) {
        if (e.keyCode == 37) {
            //左键
            if (tpqhnum <= 0) {
                return;
                tpqhnum = picnum
            };
            if (xtqhnum == 0) { xtqhnum = picnum };
            xtqhnum--;
            tpqhnum--;
            show(tpqhnum);
            minshow(xtqhnum, true);
        } else if (e.keyCode == 39) {
            //右键
            if (tpqhnum == picnum - 1) {
                $('.poptips').show();
                return;
                tpqhnum = -1;
            };
            if (xtqhnum == picnum - 1)
            { xtqhnum = -1 };
            xtqhnum++;
            minshow(xtqhnum, true)
            tpqhnum++;
            show(tpqhnum);

        }
    });

    //鼠标滚轮事件
    var scrollFunc = function (e) {
        e.preventDefault();
        e = e || window.event;
        var val = e.wheelDelta || e.detail;
        if (val == 120 || val == -3) {
            if (tpqhnum <= 0) {
                return;
                tpqhnum = picnum
            };
            if (xtqhnum == 0) { xtqhnum = picnum };
            xtqhnum--;
            tpqhnum--;
            show(tpqhnum);
            minshow(xtqhnum);
        } else if (val == -120 || val == 3) {
            if (tpqhnum == picnum - 1) {
                $('.poptips').show();
                return;
                tpqhnum = -1;
            };
            if (xtqhnum == picnum - 1)
            { xtqhnum = -1 };
            xtqhnum++;
            minshow(xtqhnum)
            tpqhnum++;
            show(tpqhnum);
        }


    }

    if (document.addEventListener) {
        document.addEventListener('DOMMouseScroll', scrollFunc, false);
    }//W3C 
    window.onmousewheel = scrollFunc;//IE/Opera/Chrome 

    //弹框方法
    $('.poptips').find('.close').click(function () {
        $('.poptips').hide();
    });
    //重看
    $('.poptips').find('.btn_review').click(function () {
        $('.poptips').hide();
        tpqhnum = -1;
        xtqhnum = -1;
        xtqhnum++;
        minshow(xtqhnum, true)
        tpqhnum++;
        show(tpqhnum);
    });
    //去评论
    $('.poptips').find('.btn_comment').click(function () {
        $('.poptips').hide();
        var urltemp = can.comment_url + "?type=1";
        window.open(urltemp);
        //window.location.href = can.comment_url;
    });

    //大图左右切换	
    $(can.prev).click(function () {
        if (tpqhnum <= 0) {
            tpqhnum = picnum
        };
        if (xtqhnum == 0) { xtqhnum = picnum };
        xtqhnum--;
        tpqhnum--;
        show(tpqhnum);
        minshow(xtqhnum, true);

        var index = xtqhnum + 1;
        if (xtqhnum + 1 > picnum) {
            index = xtqhnum + 1 - (picnum);
        }
        curNum.html(index);
    })
    $(can.next).click(function () {
        if (tpqhnum == picnum - 1) {
            $('.poptips').show();
            return;
            tpqhnum = -1;
        };
        if (xtqhnum == picnum - 1)
        { xtqhnum = -1 };
        xtqhnum++;
        minshow(xtqhnum, true)
        tpqhnum++;
        show(tpqhnum);

        var index = xtqhnum + 1;
        if (xtqhnum + 1 > picnum) {
            index = xtqhnum + 1 - (picnum);
        }
        curNum.html(index);
    })
    //小图切换过程
    // function minshow(xtqhnum) {
    //     var mingdjl_num = xtqhnum - can.min_picnum + 2
    //     var mingdjl_w = -mingdjl_num * picminw;
    //
    //     $(can.pnum).find('ul li').css('float', 'left');
    //     if (picminnum > can.min_picnum) {
    //         if (xtqhnum < 6) {
    //             mingdjl_w = 0;
    //         }
    //         if (xtqhnum == picminnum - 1) {
    //             mingdjl_w = -(mingdjl_num - 1) * picminw;
    //         }
    //         $(can.pnum).find('ul').stop().animate({
    //             'left': mingdjl_w
    //         }, can.delayTime);
    //     }
    //     var index = xtqhnum + 1;
    //     if (xtqhnum + 1 > picnum) {
    //         index = xtqhnum + 1 - (picnum);
    //     }
    //     curNum.html(index);
    // }
    // 修改为每次切换7张效果,flag用来判断是点击的小图片，还是点击的小图片左右切换按钮
    function minshow(xtqhnum, flag) {
        // var mingdjl_num = xtqhnum - can.min_picnum + 2  //can.min_picnum 小图显示数量
        var mingdjl_num = xtqhnum % picnum;
        var mingdjl_w = -mingdjl_num * picminw;

        // console.log('xtqhnum:',xtqhnum,'mingdjl_num:',mingdjl_num,'mingdjl_w:',mingdjl_w,'picnum:',picnum)

        $(can.pnum).find('ul li').css('float', 'left');
        if(flag){
            if (picminnum > can.min_picnum) {
                // if (xtqhnum < 6) {
                //     mingdjl_w = 0;
                // }
                // if (xtqhnum == picminnum - 1) {
                //     mingdjl_w = -(mingdjl_num - 1) * picminw;
                // }
                $(can.pnum).find('ul').stop().animate({
                    'left': mingdjl_w
                }, can.delayTime);
            }
        }else{
            var index = xtqhnum + 1;
            if (xtqhnum + 1 > picnum) {
                index = xtqhnum + 1 - (picnum);
            }
            curNum.html(index);
        }


    }
    //大图切换过程
    function show(tpqhnum, dir) {
        var gdjl_w = -tpqhnum * picw;
        $(can.pic).find('ul li').css('float', 'left');
        //滚动
        $(can.pic).find('ul').stop().animate({
            'left': gdjl_w
        }, can.delayTime);
        $(can.pnum).find('li').eq(tpqhnum).addClass("on").siblings(this).removeClass("on");
        var text = $(can.pnum).find('li').eq(tpqhnum).attr("data-title");
        $(can.title_text).text(text);
        // initializationCalc();
    };
}
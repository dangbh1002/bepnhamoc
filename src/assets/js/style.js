$(document).ready(function () {
    /* CLICK-TO-SCROLL */
    $(document).on("scroll", onScroll);

    console.log(123);

    //smoothscroll
    $('.click-to-scroll a[href^="#"]').on('click', function (e) {
        e.preventDefault();
        $(document).off("scroll");
        
        $('.click-to-scroll a').each(function () {
            $(this).removeClass('active');
        })
        $(this).addClass('active');
      
        var target = this.hash,
            menu = target;
        $target = $(target);
        $('html, body').stop().animate({
            'scrollTop': $target.offset().top+2
        }, 500, 'swing', function () {
            window.location.hash = target;
            $(document).on("scroll", onScroll);
        });
    });

    $('.click-to-scroll a[href^="#"]').hover(function(){
        $('.click-to-scroll a').removeClass("active");
        $(this).addClass('active');
    },function(){
        $(this).removeClass('active');
    })

    function onScroll(event){
        var scrollPos = $(document).scrollTop();
        $('.click-to-scroll a').each(function () {
            var currLink = $(this);
            var refElement = $(currLink.attr("href"));
            if (refElement.position().top <= scrollPos && refElement.position().top + refElement.height() > scrollPos) {
                $('.click-to-scroll a').removeClass("active");
                currLink.addClass("active");
            } 
            var itemOrder = $('.item-order');
            if ( scrollPos > itemOrder.position().top + itemOrder.height() ) {
                $('.click-to-scroll').fadeOut('slow');
            } else {
                $('.click-to-scroll').fadeIn('slow');
            }
        });
    }

    
    /* CLICK ON ITEM-SCROLL-BAR*/
    $('.item-scroll-bar img').click(function(){
        var getId1 = $(this).attr('rel');
        $('img[class*=mu-chi-tiet-]').hide();
        $('.mu-chi-tiet-'+ getId1).show();
    });

    /* CHANGE NAVBAR ELEMENT AND SHOW/HIDE SEARCH-BOX */
    if ( $(window).width() < 992 ) {
        $('.search-icon').click(function(){
            $(this).css("display", "none");
            $('.navbar-brand').css("display", "none");
            $('.navbar-toggler').css("display", "none");
            $('.search-box').fadeIn('slow');
        })
        
        $('.close').click(function(){
            $('.search-icon').fadeIn('slow');
            $('.navbar-brand').fadeIn('slow');
            $('.navbar-toggler').fadeIn('slow');
            $('.search-box').css("display", "none");
        })
    } else {
        $('.search-icon').appendTo('.navbar-collapse');
        $('.search-box').appendTo('.navbar-collapse');
        $('.search-icon').click(function(){
            $('.navbar-nav').css("display", "none");
            $(this).css("display", "none");
            $('.search-box').fadeIn('slow');
        })
        $('.close').click(function(){
            $('.navbar-nav').fadeIn('slow');
            $('.search-icon').fadeIn('slow');
            $('.search-box').css("display", "none");
        })
    }
    
    /* SET SERCH-BOX HEIGHT EQUAL NAVBAR HEIGHT */
    $('.search-box input').outerHeight($('.navbar').height());

    /*  */
    if ( $(window).width() < 768 ) {
        $('.tech-banner-2').insertAfter('.tech-2-content .banner-number');
        $('.tech-3-content .banner-number').insertBefore('.tech-banner-3');
        $('.bn-4').prependTo('.tech-4-img');
        $('.tech-banner-4').height($('.tech-banner-2').height());
    }

    /* SET HEIGHT OF ERROR */
    $('.error').height(
        $(window).height() - $('header').height()
    )

    /* COLLAPSE TECH */
    $('#accordion-1').on('shown.bs.collapse', function () {
        $('.tech-2 .see-more-1').text('Rút gọn');
    })
    $('#accordion-1').on('hide.bs.collapse', function () {
        $('.tech-2 .see-more-1').text('Xem thêm');
    })

    $('#accordion-2').on('shown.bs.collapse', function () {
        $('.tech-3 .see-more-2').text('Rút gọn');
    })
    $('#accordion-2').on('hide.bs.collapse', function () {
        $('.tech-3 .see-more-2').text('Xem thêm');
    })

});

    
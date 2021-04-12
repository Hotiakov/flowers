$(document).ready(function() {

    svg4everybody();

    var $screensmall;

    function windowSize(){
        if ($('html').width() <= '768'){
            $screensmall = true;
        } else {
            $screensmall = false;
        }
    }

    windowSize();

    $(window).resize(windowSize); // при изменении размеров

    //-----<MENU>-----------

    $('.gamburger').on('click', function (e) {
        e.preventDefault();

        if ($(this).hasClass('active') ) {
            $(this).removeClass('active');

            $('#likegamburger').removeClass("active").slideUp();

            $('html').removeAttr("style");

        } else {
            $(this).addClass('active');

            $('#likegamburger').slideDown(500, function () {
                $('#likegamburger').addClass("active");
            });

            $('html').css({'overflow': 'hidden'});
        }
    });

    if( $screensmall ) {
        $('.footer__nav > li > a').on('click', function(e){
            var $parent = $(this).parent().parent(),
                $this = $(this).parent();
            
            if ( $this.find('ul').length > 0 ) {
                e.preventDefault();
                if( $this.hasClass('is-active') ) {
                    $this.removeClass('is-active');
                    $this.find('> ul').slideUp();
                } else {
                    $this.addClass('is-active');
                    $this.find('> ul').slideDown();
                }

            }
        })
    }

    //-----</MENU>-----------


    $('.styler__color-thm__item').on('click', function(e){
        e.preventDefault();

        var index = $(this).index();

        $('.styler__color-thm__item').removeClass('is-active');
        $(this).addClass('is-active');

        $('.styler__color-slider > *').removeClass('is-active');

        $('.styler__color-slider').each(function(){
            $(this).find('> *').eq(index).addClass('is-active');
        });


    });
    
    //---rolling
    $('.innert__textcontent__rolling a').on('click', function(e){
        e.preventDefault();

        var el = $(this).parent().siblings('.-rolling'),
            btn = $(this),
            parent = btn.parent();

        if( !parent.hasClass('is-active') ) {
            var curHeight = el.outerHeight(),
                autoHeight = el.css('height', 'auto').outerHeight();

            el.attr('data-height', curHeight);

            el.height(curHeight).animate({height: autoHeight}, 500, function(){
                parent.addClass('is-active');
                el.addClass('is-active');

                btn.text( btn.attr('data-close') );
            });


        } else {
            $('html, body').animate({
                scrollTop: el.offset().top
            }, 500);
            
            el.animate({height: el.data('height')}, 500, function(){
                parent.removeClass('is-active');
                el.removeClass('is-active');

                btn.text( btn.data('open') );
            });
        }


    });
    

    function initVideoGallery() {
        var videoSlider = $('.videos-slider-js'),
            vnamesSlider = $('.vnames-slider-js'),
            vnamesSliderItem = $('.vnames-slider__item');

        vnamesSliderItem.eq(0).addClass('active');

        videoSlider.slick({
            arrows: false,
            fade: true,
            responsive: [
                {
                    breakpoint: 768,
                    settings: {
                        asNavFor: '.vnames-slider-js'
                    }
                }
            ]
        });

        vnamesSlider.slick({
            slidesToShow: 3,
            slidesToScroll: 1,
            infinite: false,
            prevArrow: $('.vnames-slider__arr_left'),
            nextArrow: $('.vnames-slider__arr_right'),
            responsive: [
                {
                    breakpoint: 768,
                    settings: {
                        slidesToShow: 1,
                        asNavFor: '.videos-slider-js'
                    }
                }
            ]
        });

        vnamesSliderItem.click(function () {

            vnamesSliderItem.removeClass('active');
            $(this).addClass('active');
            videoSlider.slick('slickGoTo', $(this).data('slick-index'));

        });

        // videoSlider.on('afterChange', function(){
        //     vnamesSliderItem.removeClass('disabled');
        // });

    }

    initVideoGallery();

});
jQuery(document).ready(function($) {
    
        var path = location.href;
        if ( path ) {
            $('.header__nav a[href="' + path + '"]').attr('class', 'current');
        }


    function thanks_popup( str ) {
        //console.log(str);
        $('#popup--thnx .popup__text').html( str );
        $.fancybox($('#popup--thnx'), {
            padding: 15,
            maxWidth: 360,
            helpers : {
                title : {
                    type : 'inside'
                },
                overlay: {
                    locked: false
                }
            },
            scrolling: "no",
            easingIn: 'swing',
            afterShow: function () {
                setTimeout ('$.fancybox.close()', 4000);
            }
        });
    };

    // ajax send mail
    
    function formSuccess( data ) {
        $('.loading').removeClass('loading');
        $('form').find('input[type="text"], input[type="file"], textarea').val('');

        thanks_popup('Спасибо.<br>Мы скоро с вами свяжемся');

    }
    function formError( data ) {
        $('.loading').removeClass('loading');

        for( var field in data.errors ){
            if(data.errors.hasOwnProperty(field)){
                $('[name="'+ field +'"]').parent().addClass('-error').append('<em>'+ data.errors[field] +'</em>');
            }
        }
    }

    $('.ajax_mail').on('click', function(e){
        e.preventDefault();

        $('em').remove();
        $('.-error').removeClass('-error');
        $(this).addClass('loading');

        var form = $(this).closest('form'),
            formData = new FormData(form[0]);

        formData.append('action','send_mail');


        wp.ajax.send( "send_mail", {
            success: formSuccess,
            error:   formError,
            processData: false,
            contentType: false,
            data: formData
        });



    });
    // end ajax send mail

});
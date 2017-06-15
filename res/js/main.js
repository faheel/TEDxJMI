/* global ScrollMagic, Linear */

(function($){
    "use strict";
    
    var $body = $('body');
        
    
    
    /*------------------------------------*\
        Shrink navigation.
    \*------------------------------------*/
    
    $(window).scroll(function(){
        if ($(document).scrollTop() > 80){
            $('.navbar').addClass('shrink');
        }
        else{
            $('.navbar').removeClass('shrink');
        }
    });
    
    
    
    /*------------------------------------*\
        Scroll to top.
    \*------------------------------------*/
    
    $(window).scroll(function(){
        if($(this).scrollTop() > 100){
            $('.scroll-to-top').fadeIn();
        } 
        else{
            $('.scroll-to-top').fadeOut();
        }
    });
    
    
    
    $(document).ready(function(){
        
        /*------------------------------------*\
            Detect mobile device.
        \*------------------------------------*/        
        
        var isMobile = {
            Android: function(){
                return navigator.userAgent.match(/Android/i);
            },
            BlackBerry: function(){
                return navigator.userAgent.match(/BlackBerry/i);
            },
            iOS: function(){
                return navigator.userAgent.match(/iPhone|iPad|iPod/i);
            },
            Opera: function(){
                return navigator.userAgent.match(/Opera Mini/i);
            },
            Windows: function(){
                return navigator.userAgent.match(/IEMobile/i);
            },
            any: function(){
                return (isMobile.Android() || isMobile.BlackBerry() || isMobile.iOS() || isMobile.Opera() || isMobile.Windows());
            }
        };
        
        
        
        /*------------------------------------*\
            Bootstrap scrollspy.
        \*------------------------------------*/
        
        var ww = Math.max($(window).width(), window.innerWidth),
            navHeight = 80,
            navHeightShrink = 61;
        
        $(window).smartload(function(){
            $body.scrollspy({    
                target: '#navigation',
                offset: ww > 992 ? navHeightShrink : navHeight
            });
        });
        
        $(window).smartresize(function(){
            var dataScrollSpy = $body.data('bs.scrollspy'),
                ww = Math.max($(window).width(), window.innerWidth),
                offset = ww > 992 ? navHeightShrink : navHeight;
        
            dataScrollSpy.options.offset = offset;
            $body.data('bs.scrollspy', dataScrollSpy);
            $body.scrollspy('refresh');
        });
        
        
        
        /*------------------------------------*\
            Page scrolling feature.
        \*------------------------------------*/
        
        $(window).smartload(function(){
            pageScroll();
        });
        
        $(window).smartresize(function(){
            pageScroll();
        });
        
        function pageScroll(){
            $('a.page-scroll').bind('click', function(e){
                var ww = Math.max($(window).width(), window.innerWidth),
                    anchor = $(this),
                    href = anchor.attr('href'),
                    offset = ww > 992 ? navHeightShrink : navHeight;

                $('html, body').stop().animate({
                    scrollTop: $(href).offset().top - (offset - 1)
                }, 1000, 'easeInOutExpo');
                
                // Automatically retract the navigation after clicking on one of the menu items.
                $('.navbar-collapse').collapse('hide');
                
                e.preventDefault();
            });
        };
        
        
        
        /*------------------------------------*\
            Gallery grid
        \*------------------------------------*/   
        
        if ($.fn.imagesLoaded && $.fn.isotope){
            var $galleryGrid = $('.gallery-grid');
            
            $(window).smartload(function(){
                $galleryGrid.imagesLoaded(function(){
                    $galleryGrid.isotope({
                        itemSelector: '.item',
                        layoutMode: 'masonry'
                    });
                });
            });
            
            $(window).smartresize(function(){
                $galleryGrid.isotope('layout');
            });

            // Gallery filtering
            var $gridSelectors = $('.gallery-filter').find('a');
            $gridSelectors.bind('click', function(e){
                $gridSelectors.parent().removeClass('active');
                $(this).parent().addClass('active');

                var selector = $(this).attr('data-filter');
                $galleryGrid.isotope({
                    filter: selector
                });            

                e.preventDefault();
            });
        }
        else{
            console.log('Gallery grid: Plugin "imagesLoaded" is not loaded.');
            console.log('Gallery grid: Plugin "isotope" is not loaded.');
        }
        
        // Gallery magnific popup
        if ($.fn.magnificPopup){
            $galleryGrid.magnificPopup({
                delegate: 'a',
                type: 'image',
                fixedContentPos: false,
                mainClass: 'mfp-fade',
                gallery:{
                    enabled: true,
                    navigateByImgClick: true,
                    preload: [0,2],
                    tPrev: 'Previous',
                    tNext: 'Next',
                    tCounter: '<span class="mfp-counter-curr">%curr%</span> of <span class="mfp-counter-total">%total%</span>'
                }
            });
        }
        else{
            console.log('Gallery magnific popup: Plugin "magnificPopup" is not loaded.');
        }
        
        
        
        /*------------------------------------*\
            Counter number
        \*------------------------------------*/
        
        if ($.fn.countTo){
            $('.timer').one('inview', function(isInView){
                if(isInView){
                    $(this).countTo();
                }
            });
        }
        else{
            console.log('Counter Number: Plugin "countTo" is not loaded.');
        }
        
        
        
        /*------------------------------------*\
            Features box
        \*------------------------------------*/        
        
        var $featuresBox = $('.features-box');
        
        if(isMobile.any()){
            $featuresBox.find('.show-on-hover').addClass('disabled');
            $featuresBox.bind('click', function(e){
                $featuresBox.find('.show-on-hover').removeClass('active');
                $(this).find('.show-on-hover').addClass('active');
                e.preventDefault();
            });
        };
        
        
        
        /*------------------------------------*\
            DEMO
        \*------------------------------------*/
        
        // Home bg parallax (requires scrollmagic)
        if(typeof ScrollMagic !== 'undefined'){
            // Init controller
            var controller = new ScrollMagic.Controller({globalSceneOptions: {triggerHook: "onEnter", duration: "200%"}});
        
            // Build scenes
            new ScrollMagic.Scene({triggerElement: "#home-bg-parallax"})
                    .setTween("#home-bg-parallax > .bg-parallax", {y: "80%", ease: Linear.easeNone})
                    .addTo(controller);
        }
        
        
        // Home bg slideshow (requires flexslider)
        if ($.fn.flexslider){
            $('.bg-slideshow-wrapper').flexslider({
                selector: '.slides > .bg-cover',
                easing: 'linear',
                slideshowSpeed: 3500,
                controlNav: false,
                directionNav: false,
                keyboard: false,
                pauseOnAction: false,
                touch: false
            });
        }
        else{
            console.log('Home bg slideshow: Plugin "flexslider" is not loaded.');
        }
        
        
        // Home bg slider (requires flickity)
        if ($.fn.flickity){
            $('.bg-slider-wrapper').flickity({
                cellAlign: 'left',
                contain: true,
                prevNextButtons: false,
                pageDots: false,
                draggable: false,
                autoPlay: 3500,
                pauseAutoPlayOnHover: false
            });
        }
        else{
            console.log('Home bg slider: Plugin "flickity" is not loaded.');
        }
        
        
        // Animated typing
        if ($.fn.typed){
            $('.typed-strings').typed({
                strings: ['Learning', 'Growing and', 'Mingling'],
                typeSpeed: 130,
                loop: true,
                showCursor: false
            });
        }
        else{
            console.log('Animated typing: Plugin "typed" is not loaded.');
        }
        
        
        // Countdown
        if ($.fn.countdown){
            var $clock = $('#clock'),
                untilDate = $clock.data('until-date');

            $clock.countdown(untilDate, function(e){
                $(this).html(e.strftime(''
                    + '<div class="clock-item"><div class="display-table height-100 width-100"><div class="display-table-cell vertical-align-middle"><span class="display-block xs-text-extra-large title-medium">%D</span><span class="display-block text-small">Days</span></div></div></div>'
                    + '<div class="clock-item"><div class="display-table height-100 width-100"><div class="display-table-cell vertical-align-middle"><span class="display-block xs-text-extra-large title-medium">%H</span><span class="display-block text-small">Hr</span></div></div></div>'
                    + '<div class="clock-item"><div class="display-table height-100 width-100"><div class="display-table-cell vertical-align-middle"><span class="display-block xs-text-extra-large title-medium">%M</span><span class="display-block text-small">Min</span></div></div></div>'
                    + '<div class="clock-item"><div class="display-table height-100 width-100"><div class="display-table-cell vertical-align-middle"><span class="display-block xs-text-extra-large title-medium">%S</span><span class="display-block text-small">Sec</span></div></div></div>'));
            });
        }
        else{
            console.log('Countdown: Plugin "countdown" is not loaded.');
        }

        
        // Section - Schedule (requires flickity)
        if ($.fn.flickity){
            var $carouselSchedule = $('.carousel-schedule');
            $carouselSchedule.flickity({
                cellAlign: 'left',
                contain: true,
                prevNextButtons: false,
                pageDots: false
            });
            
            $('.nav-tabs', '#schedule').children().bind('click', function(e){
                $('.carousel-schedule').flickity('select', $(this).index());
            });
            
            if(isMobile.any()){
                var flkty = $carouselSchedule.data('flickity');
                $carouselSchedule.on('select.flickity', function(){
                    $('.nav-tabs', '#schedule').find('li:eq(' + flkty.selectedIndex + ') a').tab('show');
                });
            };
        }
        else{
            console.log('Section - Schedule: Plugin "flickity" is not loaded.');
        }
        
        
        // Section - FAQ (Accordions)
        $('.panel-group').each(function(){
            var $panelGroupId = $('#' + $(this).attr('id'));
            
            $(this).find('a').bind('click', function(e){
                $panelGroupId.find('.panel').removeClass('active');
                $(this).parent().parent().parent().addClass('active');
            });
        });
        
        
        // Register form
        var $registerForm = $('#form-register'),
            $btnRegisterForm = $('#btn-form-register');
        
        $btnRegisterForm.bind('click', function(e){
            $registerForm.validate();
            if ($registerForm.valid()){
                send_mail($registerForm, $btnRegisterForm);
            }
            e.preventDefault();
        });
        
        // Contact form
        var $contactForm = $('#form-contact'),
            $btnContactForm = $('#btn-form-contact');
        
        $btnContactForm.bind('click', function(e){
            $contactForm.validate();
            if ($contactForm.valid()){
                send_mail($contactForm, $btnContactForm);
            }
            e.preventDefault();
        });
        
        
        // Send mail
        function send_mail($form, $btnForm){
            var defaultMessage = $btnForm.html(),
                sendingMessage = 'Loading...',
                errorMessage = 'Error Sending!',
                okMessage = 'Email Sent!';
            
            $btnForm.html(sendingMessage);
            
            $.ajax({
                url: $form.attr('action'),
                type: 'post',
                dataType: 'json',
                data: $form.serialize(),
                success: function(data){
                    if(data === true){
                        $btnForm.html(okMessage);
                        $form.find('input[type="text"], textarea').val('');
                    }
                    else{
                        $btnForm.html(errorMessage);
                    }

                    setTimeout(function(){
                        $btnForm.html(defaultMessage);
                    }, 3000);
                },
                error: function(xhr, err){
                    $btnForm.html(errorMessage);

                    setTimeout(function(){
                        $btnForm.html(defaultMessage);
                    }, 3000);
                }
            });
        }
    });
})(jQuery);
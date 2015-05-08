// Initialize Swiper
$(document).ready(function () {


    var isOK = false;
    var preload;
    var swiper_cover;
    var swiper_main;

    function init() {
        // Create a new queue.
        preload = new createjs.LoadQueue(false, "imgs/");

        var plugin = {
            getPreloadHandlers: function () {
                return {
                    extensions: ["svg","mp3","png","jpg"],
                    callback: function (item) {
                        var id = item.src.toLowerCase().split("/").pop().split(".")[0];
                        $("#"+id).attr("src", item.src);
                    }
                };
            }
        };

        preload.installPlugin(plugin);
        preload.loadManifest(["Oval-100.jpg"

        ]);
        preload.on("complete", handleComplete);

    }

    function handleComplete(event) {
        overLoading();
    }
    init();


    function overLoading(){
        $('#loading').addClass("animated bounceOut").one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function(){
            $("#loading").removeClass("animated bounceOut");
            hideOpacity($("#loading"));
            $(".outside-content").css('opacity', '1');
            $("#main-content").css('opacity', '1');
            initSwiper();
            initLink();
        });
    }

    hideSlide();
    $(".outside-content").css('opacity', '0');
    $('#main-content').css('opacity', '0');

    var currentIndex = 0;

    function initSwiper(){

        //initialize swiper when document ready
        swiper_cover = new Swiper ('.swiper-cover', {
            // Optional parameters
            direction: 'vertical',
            effect:'fade',
            noSwiping:true,
            noSwipingClass:"swiper-no-swiping",
            fade: {
                crossFade: false
            },
            slideActiveClass:"swiper-page-slide-active",
            autoplay:2500,
            onInit: function(swiper){
                showOnebyOne("swiper-page-slide-active");
                swiper.stopAutoplay();
            },
            onTransitionEnd: function(swiper){
                if(currentIndex != swiper.activeIndex){
                    showOnebyOne("swiper-page-slide-active");
                }
                currentIndex = swiper.activeIndex;

                if(swiper.activeIndex == 3){
                    swiper.stopAutoplay();
                }
            },
            onTransitionStart: function(swiper){
                if(currentIndex != swiper.activeIndex){
                    hideSlide("swiper-slide-prev");
                    hideSlide("swiper-slide-next");
                }

            }
        });

        swiper_main = new Swiper ('.swiper-main', {
            noSwipingClass:"swiper-main-no-swiping",
            // Optional parameters
            onInit: function(swiper){

            },
            onTransitionEnd: function(swiper){

            },
            onTransitionStart: function(swiper){

            }
        });

        var swiper_vertical = new Swiper ('.swiper_vertical', {
            noSwipingClass:"swiper-vertical-no-swiping",
            // Optional parameters
            direction: 'vertical'
        });
        var swiper_scroll = new Swiper ('.swiper_scroll', {
            // Optional parameters
            scrollbar: '.swiper-scrollbar',
            slideClass: 'swiper-scroll-slide',
            direction: 'vertical',
            slidesPerView: 'auto',
            mousewheelControl: true,
            freeMode: true
        });


        var swiper_slide = new Swiper ('.swiper_slide', {
            effect:'fade',
            autoplay:2000
        });

    }
    function initLink(){
        $('#play_button').on('click', function(e){
            swiper_cover.slideNext(true, 1000);
            swiper_cover.startAutoplay();

        });
        $('#link_button_1').on('click', function(e){
            $('#back_button').show();
            swiper_main.slideTo(1);

        });
        $('#link_button_2').on('click', function(e){
            $('#back_button').show();
            swiper_main.slideTo(2);

        });
        $('#link_button_3').on('click', function(e){
            $('#back_button').show();
            swiper_main.slideTo(3);

        });
        $('#link_button_4').on('click', function(e){
            $('#back_button').show();
            swiper_main.slideTo(4);

        });
        $('#link_button_5').on('click', function(e){
            $('#back_button').show();
            swiper_main.slideTo(5);

        });
        $('#link_button_6').on('click', function(e){
            $('#back_button').show();
            swiper_main.slideTo(6);

        });
        $('#link_button_7').on('click', function(e){
            $('#back_button').show();
            swiper_main.slideTo(7);

        });
        $('#back_button').on('click', function(e){
            if(swiper_main.activeIndex == 5 || swiper_main.activeIndex == 6 || swiper_main.activeIndex == 7){
                swiper_main.slideTo(2);
            }
            else{
                swiper_main.slideTo(0);
                $('#back_button').hide();
            }
        });
    }


    function hideOpacity(obj){
        obj.css('opacity', '0');
    }
    function showOpacity(obj){
        obj.css('opacity', '1');
    }


    function hideSlide(classString){

        $('.' + classString).children().each(function(element){
            if($(this).attr('animated-css')){
                hideOpacity($(this));
                $('.' + classString).css('z-index', '0');
                $(this).removeClass('animated ' + $(this).attr('animated-css'));
            }
        });

        $('.' + classString + ' .animated-box').children().each(function(element){
            if($(this).attr('animated-css')){
                hideOpacity($(this));
                $(this).removeClass('animated ' + $(this).attr('animated-css'));
            }
        });
    }

    function showOnebyOne(classString){
        $('.' + classString).children().each(function(element){
            if($(this).attr('animated-css')){
                showOpacity($(this));
                $('.' + classString).css('z-index', '10');
                $(this).addClass('animated ' + $(this).attr('animated-css')).one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function(){
                    $(this).removeClass('animated ' + $(this).attr('animated-css'));
                });
            }

        });

        $('.' + classString + ' .animated-box').children().each(function(element){

            if($(this).attr('animated-css')){
//                console.log($(this));
                showOpacity($(this));
                $(this).addClass('animated ' + $(this).attr('animated-css')).one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function(){
                    $(this).removeClass('animated ' + $(this).attr('animated-css'));
                });
            }

        });
    }
});
// Initialize Swiper
$(document).ready(function () {


    var isOK = false;
    var preload;

    function init() {
        // Create a new queue.
        preload = new createjs.LoadQueue(false, "imgs/");

        var plugin = {
            getPreloadHandlers: function () {
                return {
                    extensions: ["svg","mp3","png"],
                    callback: function (item) {
                        var id = item.src.toLowerCase().split("/").pop().split(".")[0];
                        $("#"+id).attr("src", item.src);
                    }
                };
            }
        };

        preload.installPlugin(plugin);
        preload.loadManifest(["logo.svg"

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
        });
    }

    hideSlide();
    $(".outside-content").css('opacity', '0');
    $('#main-content').css('opacity', '0');

    var currentIndex = 0;
    function initSwiper(){
        //initialize swiper when document ready
        var mySwiper = new Swiper ('.swiper-page-container', {
            // Optional parameters
            direction: 'vertical',
            effect:'fade',
            noSwiping:true,
            noSwipingClass:"swiper-no-swiping",
            fade: {
                crossFade: true
            },
            autoplay:1000,
            onInit: function(swiper){
                hideSlide();
                showOnebyOne();
            },
            onTransitionEnd: function(swiper){
                if(currentIndex != swiper.activeIndex){
                    showOnebyOne();
                }
                currentIndex = swiper.activeIndex;
            },
            onTransitionStart: function(swiper){
                if(currentIndex != swiper.activeIndex){
                    hideSlide();
                }
            }
        });

        var mySwiperH = new Swiper ('.swiper-container-h', {
            // Optional parameters
            onInit: function(swiper){

            },
            onTransitionEnd: function(swiper){

            },
            onTransitionStart: function(swiper){

            }
        });
    }


    function hideOpacity(obj){
        obj.css('opacity', '0');
    }
    function showOpacity(obj){
        obj.css('opacity', '1');
    }


    function hideSlide(){
        $('.swiper-slide').children().each(function(element){
            if($(this).attr('animated-css')){
                hideOpacity($(this));
                $(this).removeClass('animated ' + $(this).attr('animated-css'));
            }
        });
    }
    function showOnebyOne(){
        $('.swiper-slide-active').children().each(function(element){
            if($(this).attr('animated-css')){
                showOpacity($(this));
                $(this).addClass('animated ' + $(this).attr('animated-css')).one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function(){
                    $(this).removeClass('animated ' + $(this).attr('animated-css'));
                });
            }

        });
    }
});
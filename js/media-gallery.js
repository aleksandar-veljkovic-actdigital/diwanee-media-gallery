;
(function($) {

  $.fn.mediaGallery = function(set) {

    // VARIABLES
    set = set || {};
    set.desktop = set.desktop || 1000;
    set.imgBasePath = set.imgBasePath || "./images/media-gallery/";
    set.addTriggerCount = set.addTriggerCount || 3;
    set.addTriggerCountMob = set.addTriggerCountMob || 3;

    $(this).each(function(i, o) {


      var $mediaGallery = $(o);

      // LAYOUT GENERATION 
      var $mediaGalleryMain = $("<div class='media-gallery-main' />");
      var $mediaGalleryThumbs = $("<div class='media-gallery-thumbs' />");
      var $mediaGalleryCaptionsWrap = $("<div class='media-gallery-captions-wrap' />");
      var $mediaGalleryCaptions = $("<div class='media-gallery-captions' />");
      var $fullscreenBtn = $("<a class='media-gallery-fullscreen-button' href='#'><span>لتكبير الشاشة</span></a>");
      var $header = $("<div class='media-gallery-header' />");
      var $footer = $("<div class='media-gallery-footer' />");
      var $captionToggle = $("<a href='#' class='media-gallery-caption-toggle'><span></span></a>");
      var $mediaGallerySocial = $mediaGallery.find('.media-gallery-social-wrapp')
      $mediaGalleryCaptions.append($mediaGallery.find('.caption'));
      $mediaGalleryMain.append($mediaGallery.children());
      $mediaGalleryThumbs.append($mediaGalleryMain.find('.thumb'));

      $mediaGallery.append($header);
      $header.append($mediaGallerySocial);
      $header.prepend($fullscreenBtn);
      $mediaGallery.append($mediaGalleryMain);
      $mediaGallery.append($mediaGalleryThumbs);
      $mediaGallery.append($mediaGalleryCaptionsWrap);
      $mediaGalleryCaptionsWrap.append($captionToggle);
      $mediaGalleryCaptionsWrap.append($mediaGalleryCaptions);

      $mediaGallery.append($footer);



      // CUSTOM EVENTS

      $(".media-gallery-caption-toggle", $mediaGallery).click(function(e) {
        e.preventDefault();
        if ($mediaGalleryCaptionsWrap.hasClass('caption-toggled')) {
          $mediaGalleryCaptionsWrap.removeClass('caption-toggled');
        } else {
          $mediaGalleryCaptionsWrap.addClass('caption-toggled');
        }
        return false;
      });

      $fullscreenBtn.click(function(e) {
        e.preventDefault();
        diwaneeFullScreen(
                $mediaGallery,
                function() {
                  reinit();
                  $mediaGalleryCaptionsWrap.removeClass('caption-toggled');
                  adTriggerIterator = 0;
                  adTrigger();
                }
        );
        reinit();
        adTriggerIterator = 0;
        adTrigger();
        return false;
      });
      var hoverTimeout;
      $mediaGallery.hover(
              function() {
                clearTimeout(hoverTimeout);
                if (!$mediaGallery.hasClass('hover')) {
                  $mediaGallery.addClass('hover');
                  adTrigger();
                }
              },
              function() {
                hoverTimeout = setTimeout(function() {
                  $mediaGallery.removeClass('hover');
                }, 500);
              }
      );


      // INTER FUNCTIONALITY EVENTS
      var stopThumbs = false; // prevent thums moving on thumb click
      var afterMoveMain = function($owl) {
        adTrigger();
        var $active = $owl.find('.active').find('.item');
        $mediaGalleryThumbs.find('.owl-item').removeClass('active');
        if ($active.length > 0) { // item
          var activeNo = parseInt($active.data('no'));
          var thumbNo = $mediaGalleryThumbs.find('.item-no-' + activeNo).parent().index();

          $mediaGalleryCaptions.data('galleryCaption').goTo(thumbNo);
          if (!stopThumbs) {
            $mediaGalleryThumbs.data('owlCarousel').goTo(thumbNo);
          }
          $mediaGalleryThumbs.find('.item-no-' + activeNo).parent().addClass('active');
        } else { // add 
          $mediaGalleryCaptions.data('galleryCaption').goTo(-1);
        }
        stopThumbs = false;
        paginator();
      };
      $mediaGalleryThumbs.find('.thumb').click(function(e) {
        e.preventDefault();
        stopThumbs = true;
        var thumbNo = parseInt($(this).data('no'));
        var mainNo = $mediaGalleryMain.find('.item-no-' + thumbNo).parent().index();
        $mediaGalleryMain.data('owlCarousel').goTo(mainNo);
        return false;
      });
      var paginator = function() {
        $mediaGallery.find('.media-gallery-paginator').remove();
        var count = $mediaGalleryMain.find('.owl-item').length;
        var activeIx = $mediaGalleryMain.find('.owl-item').index($('.active')[0]);
        $footer.append("<div class='media-gallery-paginator'>" + count + "/" + (count - activeIx) + "</div>");
      };


      // ADS
      var adContent = function($adTarget) {
        var sliderId = Math.floor((Math.random() * 1000) + 1);
        $('.media-gallery-adv', $mediaGallery).remove();
        var content = $("<div class='media-gallery-adv'><div class='alabel'></div><div id='ad-gallery-" + sliderId + "'></div></div>");
        $adTarget.append(content);
        oxAsyncGallery.asyncAdControlRender("ad-gallery", sliderId);
      };
      var adTriggerIterator = -1;
      var adTrigger = function() {
        if ($mediaGallery.hasClass('desktop')) {
          if (adTriggerIterator === 0) {
            var $adTarget = $mediaGalleryCaptionsWrap.find('.advert');
            adContent($adTarget);
          }
          adTriggerIterator++;
          adTriggerIterator = (adTriggerIterator >= set.addTriggerCount) ? 0 : adTriggerIterator;
        }
        else if ($mediaGallery.hasClass('mobile')) {
          var $adTarget = $mediaGallery.find('.active .advert');
          if ($adTarget.length > 0) {
            adContent($adTarget);
          }
        }
      };
      var maxHeightPctAd;
      var adMobileInit = function() {
        var $items = $mediaGalleryMain.find('.item');
        var count = $items.length;
        for (var i = 1; i < (count + 1); i++) {
          if (i % set.addTriggerCountMob === 0) {
            var $item = $("<div class='advert-wrap'><div class='advert'></div></div>");
            $mediaGalleryMain.data('owlCarousel').addItem($item, count - i);
          }
        }
        if (dynamicLineHeight !== 'undefined') {
          dynamicLineHeight.destroy();
          dynamicLineHeight = $('.item, .advert-wrap', $mediaGalleryMain).dynamicLineHeight($mediaGalleryMain);
        }
        maxHeightPctAd = $mediaGalleryMain.find('.advert').maxHeightPct(95, $mediaGalleryMain.find('.advert-wrap'));
      };
      var adDesktopInit = function() {
        $mediaGalleryCaptionsWrap.append("<div class='advert-wrap'><div class='advert'></div></div>");
      };
      var adRemove = function() {
        $mediaGalleryCaptionsWrap.find(".advert-wrap").remove();
        $mediaGalleryMain.find(".advert-wrap").each(function(i, o) {
          var index = $(o).parent().index();
          $mediaGalleryMain.data('owlCarousel').removeItem(index);
        });
      };



      // CONTAINERS INITIALISATIONS
      $(document).ready(function() {
        $mediaGalleryCaptions.galleryCaption({rtl: true});
        $mediaGalleryThumbs.owlCarouselRtl({
          navigation: true,
          pagination: false,
          navigationText: ["<img src='" + set.imgBasePath + "gallery-left.png'>", "<img src='" + set.imgBasePath + "gallery-right.png'>"],
          items: 5,
          itemsCustom: false,
          itemsDesktop: false,
          itemsDesktopSmall: false,
          itemsTablet: false,
          itemsTabletSmall: false,
          itemsMobile: false,
          singleItem: false,
          addClassActive: false,
          responsive: true,
          autoHeight: false
        });
        $mediaGalleryMain.owlCarouselRtl({
          // Most important owl features
          items: 1,
          itemsCustom: false,
          itemsDesktop: [1199, 1],
          itemsDesktopSmall: [1111, 1],
          itemsTablet: [1109, 1],
          itemsTabletSmall: false,
          itemsMobile: [980, 1],
          singleItem: true,
          itemsScaleUp: false,
          //Basic Speeds
          slideSpeed: 200,
          paginationSpeed: 800,
          rewindSpeed: 1000,
          //Autoplay
          autoPlay: false,
          stopOnHover: false,
          // Navigation
          navigation: true,
          navigationText: ["", ""],
          rewindNav: true,
          scrollPerPage: false,
          //Pagination
          pagination: false,
          paginationNumbers: false,
          // Responsive 
          responsive: true,
          responsiveRefreshRate: 200,
          responsiveBaseWidth: window,
          // CSS Styles
          baseClass: "owl-carousel",
          theme: "owl-theme",
          //Lazy load
          lazyLoad: false,
          lazyFollow: true,
          lazyEffect: "fade",
          //Auto height
          autoHeight: false,
          //JSON 
          jsonPath: false,
          jsonSuccess: false,
          //Mouse Events
          dragBeforeAnimFinish: true,
          mouseDrag: true,
          touchDrag: false,
          //Transitions
          transitionStyle: false,
          // Other
          addClassActive: true,
          //Callbacks
          beforeUpdate: false,
          afterUpdate: false,
          beforeInit: false,
          afterInit: false,
          beforeMove: false,
          afterMove: afterMoveMain,
          afterAction: false,
          startDragging: false,
          afterLazyLoad: false
        });
      });
      var reinit = function() {
        var windowHeight = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight;

        if ($mediaGallery.hasClass('mobile') && ($mediaGallery.parents('#dwf-fullscreen-wrap').length > 0)) {
          // desktop full screen
          var avalibleHeight = windowHeight - ($header.outerHeight(true) + $footer.outerHeight(true));
          $mediaGalleryMain.css({height: (avalibleHeight) + "px"});
        } else if ($mediaGallery.hasClass('desktop') && ($mediaGallery.parents('#dwf-fullscreen-wrap').length > 0)) {
          // desktop full screen
          var avalibleHeight = windowHeight - ($header.outerHeight(true) + $footer.outerHeight(true));
          $mediaGalleryMain.css({height: (0.90 * avalibleHeight) + "px"});
          $mediaGalleryThumbs.css({height: (0.10 * avalibleHeight) + "px"});
        } else {
          var hightMain = 0.65 * $mediaGallery.outerWidth();
          hightMain = (hightMain > 260) ? hightMain : 260;
          $mediaGalleryMain.css({height: (hightMain) + "px"});
          $mediaGalleryThumbs.css({height: (0.1 * $mediaGallery.outerWidth()) + "px"});
        }

        if (typeof ($mediaGalleryMain.data('owlCarousel')) !== 'undefined') {
          $mediaGalleryMain.data('owlCarousel').reload();
        }
        if (typeof ($mediaGalleryThumbs.data('owlCarousel')) !== 'undefined') {
          $mediaGalleryThumbs.data('owlCarousel').reload();
        }
        if (typeof (maxHeightPct) !== 'undefined') {
          maxHeightPct.process();
        }
        if (typeof (dynamicLineHeight) !== 'undefined') {
          dynamicLineHeight.process();
        }
        if (typeof (maxHeightPctThumbs) !== 'undefined') {
          maxHeightPctThumbs.process();
        }
        if (typeof (dynamicLineHeightThumbs) !== 'undefined') {
          dynamicLineHeightThumbs.process();
        }
        if (typeof (dynamicLineHeightFooter) !== 'undefined') {
          dynamicLineHeightFooter.process();
        }
        if (typeof (maxHeightPctAd) !== 'undefined' && maxHeightPctAd.process) {
          maxHeightPctAd.process();
        }

      };


      // MEDIA QUERY
      var maxHeightPct = $('.item-image', $mediaGalleryMain).maxHeightPct(98, $mediaGalleryMain);
      var dynamicLineHeight = $('.item, .advert-wrap', $mediaGalleryMain).dynamicLineHeight($mediaGalleryMain);
      var maxHeightPctThumbs = $mediaGalleryThumbs.find('.thumb img').maxHeightPct(100, $mediaGalleryThumbs);
      var dynamicLineHeightThumbs = $mediaGalleryThumbs.dynamicLineHeight();
      var dynamicLineHeightFooter = $(".media-gallery-footer, .media-gallery-fullscreen-button, .media-gallery-social-wrapp", $mediaGallery).dynamicLineHeight();



      var mediaQuery = function() {
        var windowWidth = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;

        if (windowWidth > set.desktop && !$mediaGallery.hasClass('desktop')) {
          $mediaGallery.addClass("desktop").removeClass("mobile");
          adRemove();
          adDesktopInit();
        }
        else if (windowWidth <= set.desktop && !$mediaGallery.hasClass('mobile')) {
          $mediaGallery.addClass("mobile").removeClass("desktop");
          adRemove();
          adMobileInit();
        }

        var thumbsData = $mediaGalleryThumbs.data('owlCarousel');
        if (thumbsData.itemsAmount > thumbsData.visibleItems.length) {
          $mediaGalleryThumbs.addClass('full').removeClass('empty');
        } else {
          $mediaGalleryThumbs.addClass('empty').removeClass('full');
        }
        reinit();
      };


      var owlReadyTimeout = setInterval(function() {
        if ($mediaGalleryMain.data('owlCarousel') !== 'undefined' && $mediaGalleryThumbs.data('owlCarousel') && $mediaGalleryMain.hasClass('owl-rtl')) {
          clearInterval(owlReadyTimeout);
          mediaQuery();
          $(window).resize(mediaQuery);
        }
      }, 300);
      //$(window).load(mediaQuery);



    });

  };


})(jQuery);

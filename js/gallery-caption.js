;
(function($) {
  $.fn.galleryCaption = function(set) {
    var set = set || {};
    var $this = $(this);
    if (set.rtl) {
      var itemNo = 0;
      $this.children().each(function(i, o) {
        var $o = $(o);
        $o.addClass("item-no-" + itemNo);
        $o.data("no", itemNo);
        itemNo++;
        $($o.parent()).prepend($o);
      });
    }
    var $items = $this.children();
    //$this.css({position: "relative"});
    $items.css({opacity: 0, zIndex: -1, position: "absolute", transition: "opacity .2s"});
    $this.data('galleryCaption', {
      goTo: function(itemNo) {
        if (itemNo === -1 || itemNo === false ) {
          $items.css({opacity: 0, zIndex: -1}).removeClass("active");
        } else {
          var $active = $items.eq(itemNo);
          $items.css({opacity: 0, zIndex: -1}).removeClass("active");
          $active.css({opacity: 1, zIndex: 1}).addClass("active");
        }
      }
    });
    $this.data('galleryCaption').goTo(0);
  };

})(jQuery);
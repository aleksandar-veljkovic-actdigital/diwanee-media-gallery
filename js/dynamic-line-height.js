(function($) {

  $.fn.dynamicLineHeight = function($heightFrom) {

    var public = {};
    var $this = public.items = $(this);

    $this.addClass('dynamic-line-height-js');

    public.process = function() {
      $this.each(function(i, o) {
        var $hFrom = $heightFrom || $(o);
        var h = $hFrom.innerHeight();
        $(o).css({lineHeight: h + "px"});
      });
    };

    public.add = function($items) {
      $.merge($this, $items);
      public.process();
    };

    public.destroy = function() {
      $(document).unbind('ready', public.process);
      $(window).unbind('load', public.process);
      $(window).unbind('resize', public.process);
      $this.unbind('resize', public.process);
      delete $this;
      delete public;
    };

    $(document).bind('ready', public.process);
    $(window).bind('load', public.process);
    $(window).bind('resize', public.process);
    $this.bind('resize', public.process);
    public.process();

    return public;

  };

})(jQuery);

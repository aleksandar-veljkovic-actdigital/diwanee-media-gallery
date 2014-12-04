(function($) {

  $.fn.maxHeightPct = function(pct, $parent) {

    pct = pct || 100;
    $parent = $parent || $this.offsetParent();    
    var $this = $(this);   
    
    $this.addClass('max-height-'+pct+'pct-js');
    
    var public = {};

    public.process = function() {
      var h = Math.floor($parent.innerHeight() * (pct / 100));
      $this.css({maxHeight: h + "px"});
    };

    $(document).ready(public.process);
    $(window).load(public.process);
    $(window).resize(public.process);
    $parent.resize(public.process);
    public.process();

    return public;

  };

})(jQuery);
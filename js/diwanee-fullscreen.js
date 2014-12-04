//diwanee full screen
var diwaneeFullScreen = function(content, onClose, $closeTxt ){
  if ($('dwf-fullscreen').length < 1) {
    onClose = onClose || function() {
    };
    var scrollBack = $(window).scrollTop();
    var $content = $(content);
    var $fullScreenWrap = $('<div id="dwf-fullscreen-wrap" />');
    var $exodusSource = $('<div id="dfs-exodus-source" />'); 
    $closeTxt = $closeTxt || "<span>&#215;</span>";
    var $closeButton = $("<a href='#' class='dfs-close-button'>"+$closeTxt+"</a>");
    var $headStyle = $("<style class='full-screan-style'>body > * {max-height:0!important;overflow:hidden!important;margin:0!important;padding:0!important;display:none!important;} body > #dwf-fullscreen-wrap {max-height:none!important;display:block!important;} body, html {height:100%;}</style>");
    

    $content.after($fullScreenWrap);
    $fullScreenWrap.append($content);
    
    $fullScreenWrap.after($exodusSource);
    $exodusSource.append( $fullScreenWrap);
    
    $fullScreenWrap.append($closeButton);
    
    $('head').append($headStyle);

    $("html").addClass('dwf-fullscreen'); 
    $("body").prepend($fullScreenWrap);    
    

    
    
    $closeButton.click(function(e) {
      e.preventDefault();
      $exodusSource.after($content);
      $exodusSource.remove();
      $fullScreenWrap.remove();
      $headStyle.remove();
      $("html").removeClass('dwf-fullscreen');
      $(window).scrollTop(scrollBack);
      onClose();
    });
  }
};
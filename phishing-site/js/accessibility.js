/**
 * @file
 * accessibility.js
 *
 * @author Blue4You
 *
 * All accessibility helper functions to meet WCAG 2.0 AA requirements live in
 * this file.
 *
 * Based on Openfed version: 7.x-2.11
 */

(function ($) {
  $(window).load(function () {

    // Colorbox fix.
    // Based on version: 7.x-2.12.
    if (Drupal.settings.colorbox) {
      var cboxButtons = ['cboxPrevious', 'cboxNext', 'cboxSlideshow'];
      cboxButtons.forEach(function (element) {
        if ($('#' + element).length > 0) {
          $('#' + element).attr('aria-label', Drupal.t(element.replace('cbox', '')));
        }
      });
    }

    // Show focus styles on keyboard events only
    // Add the focus class to the container if the keyboard
    // event is an element within the container
    document.addEventListener('keyup', function (e) {
      if (document.body.contains(e.target)) {
        document.body.classList.add('container--has-focus');
      } else {
        document.body.classList.remove('container--has-focus');
      }
    });

    // Remove the focus class on mouse click
    document.addEventListener('mousedown', function (e) {
      if (document.body.contains(e.target)) {
        document.body.classList.remove('container--has-focus');
      }
    });

    // Sharethis fix.
    // Based on version: 7.x-2.13.
    if ($('.sharethis-wrapper')) {
      var shareThisWrapper = $('.sharethis-wrapper');
      if (shareThisWrapper.length > 0) {
        shareThisWrapper.children('span').each(function (index) {
          var shareText = typeof $(this).attr('displaytext') !== 'undefined' ? Drupal.t('Share this') + ', ' + Drupal.t($(this).attr('displaytext')) + '. ' : Drupal.t('Share this') + '. ';
          $(this).attr('aria-label', shareText + Drupal.t('This button opens a new window'));
          $(this).find(".stButton").attr("tabindex", "0");
          $(this).find(".stButton").keypress(function(e){
            if (e.which == 13) {
              $(this).trigger("click");
            }
          });
        });
      }
    }

    // If link opens in new tab, add warning.
    $("a", 'body').each(function () {
      if ($(this).attr('target') == '_blank' && !($(this).find(".element-invisible").length)) {
        $(this).append('<span class="element-invisible"> ' + Drupal.t('(This hyperlink opens a new window)') + '</span>');
      }
    });
  });
})(jQuery);

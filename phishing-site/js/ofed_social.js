(function ($, Drupal) {
    Drupal.behaviors.ofedSocial = {
        ofedSocialClick: function (context) {
            if ($(context).hasClass('ofed-social-share-link-print')){
                window.print();
            } else {
                var url = $(context).attr('st_url');
                window.open(url,'', 'menubar=no,toolbar=no,resizable=yes,scrollbars=yes,height=600,width=600');
                return false;
            }
        }
    }
})(jQuery, Drupal);

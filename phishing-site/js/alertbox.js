(function ($) {
    Drupal.behaviors.alertbox = {
        attach: function (context, settings) {
            // If no cookies enabled, hide the button and return.
            if (!Drupal.alertbox.cookiesEnabled()) {
                $('[class*="block-nodeblock"] > [class*="node-alertbox"] .hide-alertbox').hide();
                return;
            }

            $('[class*="block-nodeblock"] > [class*="node-alertbox"]').each(function () {
                alertbox_id = $(this).attr('id');
                status = Drupal.alertbox.getCurrentStatus(alertbox_id);
                if (!status || !Drupal.settings.alertbox.allow_hiding_alertbox) {
                    $(this).show();
                }
            });

            $('[class*="block-nodeblock"] > [class*="node-alertbox"] .hide-alertbox').live('click', function (e) {
                parent = $(this).parents('[class*="node-alertbox"]');
                alertbox_id = parent.attr('id');
                Drupal.alertbox.setStatus(alertbox_id);
                parent.hide();
                e.preventDefault();
            });
        }
    }

    Drupal.alertbox = {};

    Drupal.alertbox.getCurrentStatus = function (alertbox_id) {
        value = Drupal.alertbox.getCookie(alertbox_id);
        // not set - enable alertbox
        // 1 - disable alertbox
        return value;
    }

    Drupal.alertbox.setStatus = function (alertbox_id) {
        var date = new Date();
        date.setDate(date.getDate() + 100);
        var cookie = alertbox_id + "=1" + ";expires=" + date.toUTCString() + ";path=" + Drupal.settings.basePath;
        document.cookie = cookie;
    }

    /**
     * Copy of Drupal.comment.getCookie().
     */
    Drupal.alertbox.getCookie = function (name) {
        var search = name + '=';
        var returnValue = '';

        if (document.cookie.length > 0) {
            offset = document.cookie.indexOf(search);
            if (offset != -1) {
                offset += search.length;
                var end = document.cookie.indexOf(';', offset);
                if (end == -1) {
                    end = document.cookie.length;
                }
                returnValue = decodeURIComponent(document.cookie.substring(offset, end).replace(/\+/g, '%20'));
            }
        }

        return returnValue;
    };

    Drupal.alertbox.cookiesEnabled = function () {
        var cookieEnabled = (navigator.cookieEnabled) ? true : false;
        if (typeof navigator.cookieEnabled == "undefined" && !cookieEnabled) {
            document.cookie = "testcookie";
            cookieEnabled = (document.cookie.indexOf("testcookie") != -1) ? true : false;
        }
        return (cookieEnabled);
    }

})(jQuery);

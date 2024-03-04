(function ($) {

  'use strict';

  let initialized;

  let initOrejime = function(settings) {
    if (!initialized) {
      if (typeof orejimeConfig !=='undefined') {
        initialized = true;
        const privacyurl = settings.orejime_openfed.privacy_policy_url;
        if (privacyurl) orejimeConfig.privacyPolicy = privacyurl;
        Orejime.init(orejimeConfig);
      }
    }
  };

  Drupal.behaviors.openfedOrejime = {
    attach: function (context, settings) {
      initOrejime(settings);
    }
  };

}(jQuery));

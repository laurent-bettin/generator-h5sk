jQuery.noConflict();

var front = (function ($) {
    "use strict";

    var ui = {
        init: function () {
            var _this = this;
            $('html').removeClass('no-js');
        }
    };

    return {
        ui: ui
    };

})(jQuery);

jQuery(document).ready(jQuery.proxy(front.ui.init, front.ui));
// jQuery(window).load(jQuery.proxy(front.ui.init, front.ui));

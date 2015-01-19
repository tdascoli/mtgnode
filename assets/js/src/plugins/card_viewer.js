/*
| -------------------------------------------------------------------
|  MTGNode Card Viewer Plugin
| -------------------------------------------------------------------
|
| Author : Yomguithereal
| Version : 1.0
*/
;(function(undefined) {

  // Create the defaults once
  var pluginName = "cardViewerWidget";

  var defaults = {
    container : '#container',
    cards : '.card-min'
  };

  // Actual Constructor
  function Plugin(element, options) {
    this.element = element;
    this.$selector = $(this.element);

    this.settings = $.extend({}, defaults, options);
    this._defaults = defaults;
    this._name = pluginName;
    this.init();
  }

  // Plugin Core
  Plugin.prototype = {
    init: function() {

      // Registering card back image
      var self = this;
      this._baseSrc = this.$selector.attr('src');
      this._currentSrc = this._baseSrc;

      // Registering event
      $(this.settings.container).on('mouseover', this.settings.cards, function() {
        var requested_src = $(this).attr('src');
        if(requested_src !== self._currentSrc){
          self.$selector.attr('src', requested_src);
          self._currentSrc = requested_src;
        }
      });

      // Registering mobile event
      /*
      if ($.browser.mobile) {
        $(this.settings.container).on('taphold', this.settings.cards, function () {
          if ($(this).parent().hasClass('in-battlefield') || ($(this).parent().hasClass('my') && $(this).parent().hasClass('in-hand'))){
            $('#top_helper_block').addClass('in');
          }
        });
      }
      */
    }
  };

  // Exporter
  $.fn[pluginName] = function (options) {
    return this.each(function() {
      if (!$.data( this, "plugin_" + pluginName)) {
        $.data( this, "plugin_" + pluginName, new Plugin(this, options));
      }
    });
  };
}).call(this);

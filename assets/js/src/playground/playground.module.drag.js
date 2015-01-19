(function(undefined) {
  'use strict';

  /**
   * Playground Drag Module
   * =======================
   *
   * Trigger draggables and react when opponent drag his cards.
   */

  function Drag() {
    realtime.bootstrap(this);
    var _this = this;

    // Selectors
    var $game = $('.game-area');

    // Position
    this.height = $game.height();

    // Methods
    this.add = function($card) {
      var snap_zones = [
        '.hand-emplacement.bottom',
        '.game-emplacement.bottom',
        '.graveyard-emplacement.bottom',
        '.exile-emplacement.bottom'
      ];

      $card.draggable({
        containment: '.game-area',
        snap: snap_zones.join(', '),
        grid: [10, 10],
        drag: this.fn
      });

      $card.draggable('enable');
    };

    this.fn = function(e, ui) {
      var $card = $(ui.helper);

      // Update z index
      playground.helpers.updateZ($card);

      // Retrieving position and sending to opponent
      var pos = {
        left: ui.position.left,
        top: ui.position.top,
        fluidLeft: playground.helpers.getFluidLeft(ui.position.left),
        fluidTop: playground.helpers.getFluidTop(ui.position.top),
        zIndex: $card.css('z-index'),
        id: $card.attr('number')
      };

      _this.dispatchRealtimeEvent('card.dragged', pos);
    };

    // Receptors
    //-----------

    // Reacting to a dragged card by op
    this.triggers.events['card.dragged'] = function(d, e) {
      var $card = $('#' + e.data.side + '_' + e.data.id);

      // Animating
      $card.css({
        left: playground.helpers.convertFluidLeft(e.data.fluidLeft,$card.width()),
        top: playground.helpers.convertFluidTop(e.data.fluidTop)-$card.height(),
        zIndex: e.data.zIndex
      });
    };
  }

  /**
   * Exporting
   * ----------
   */
  utilities.pkg('playground.modules.drag', Drag);
}).call(this);

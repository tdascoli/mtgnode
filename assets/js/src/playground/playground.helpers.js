(function(undefined) {
  'use strict';

  /**
   * Playground Helpers
   * ===================
   *
   */

  // Helpers namespace
  var _helpers = {

    // Converts an array of names into an array of domino hacks
    toHacks: function(array) {
      return array.map(function(e) {
        return typeof e === 'object' ? e : {triggers: e};
      });
    },

    // Add an array of hacks to the dominio hacks
    addToHacks: function(array) {
      playground.hacks = playground.hacks.concat(_helpers.toHacks(array));
    },

    // Update the z-index of a single card
    updateZ: function($card) {
      if ($card.hasClass('enchantment') &&
          $card.hasClass('ui-draggable-dragging'))
        $card.css('z-index', playground.config.maxZ);
      else
        $card.css('z-index', ++playground.config.maxZ);
    },

    // Overload a card array received from server with some useful properties
    overloadCards: function(driver, cards, side) {
      return cards.map(function(card, i) {

        // Unique id
        card.id = i;

        // Side
        card.side = side;

        // Html
        card.html = driver.render(card, card.id);
        card.searchHtml = driver.renderSearch(card, card.id);

        return card;
      });
    },

    // Transfer a card from a domino property to another
    fromTo: function (d, from, to, id) {
      var fromModel = d.get(from),
          toModel = d.get(to);

      // Returning false if the model is empty
      if (fromModel.length === 0)
        return false;

      // Finding first card
      if (id === undefined) {
        var card = fromModel.shift();
      }
      else {
        var card = _.remove(fromModel, function (c) {
          return c.id === +id;
        })[0];
      }

      toModel.unshift(card);

      // Updating model
      d[from] = fromModel;
      d[to] = toModel;

      return card;
    },

    // getFluidHeight
    getFluidTop: function(top){
      var height=$('#game_block').height();
      return Math.round(100 * top / height);
    },

    // getFluidWidth
    getFluidLeft: function(left){
      var width=$('#game_block').width();
      return Math.round(100 * left / width);
    },

    convertFluidTop: function(fluidTop){
      var top=(100-fluidTop)/100;
      return Math.round(top * $('#game_block').height());
    },

    convertFluidLeft: function(fluidLeft){
      var left=fluidLeft/100;
      return Math.round(left * $('#game_block').width());
    },

    convertTop: function(top,height){
      var p = (100 * top / height);
      p=(100-p) / 100;
      return Math.round(p * $('#game_block').height());
    },

    convertLeft: function(left,width){
      var p = (100 * left / width);
      p=p/100;
      return Math.round(left * $('#game_block').width());
    }
  };

  /**
   * Exporting
   * ----------
   */
  utilities.pkg('playground.helpers', _helpers);
}).call(this);

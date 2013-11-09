/*
| -------------------------------------------------------------------
|  MTGNode Playground Helpers
| -------------------------------------------------------------------
|
|
| Author : Yomguithereal
| Version : 1.0
*/

;(function($, w, undefined){
  'use strict';

  // Cached Properties
  //===================
  var _templates = {
    my: new CardTemplate('my'),
    op: new CardTemplate('op')
  };

  var _maxZ = 30;

  // Methods
  //=========
  function _getArea(side) {
    return (side === 'my') ? 'bottom' : 'top';
  }

  function _getTemplate(side) {
    return _templates[side];
  }

  function _flag(cards, side) {
    return cards.map(function(c, i) {

      // Unique card id
      c.id = i;

      // Card html
      c.html = _templates[side].render(c, c.id);
      return c;
    });
  }

  function _fromTo(d, from, to, id) {

    var fromModel = d.get(from);
    var toModel = d.get(to);

    // Finding first deck card
    if (id === undefined) {
      var card = fromModel.shift();
    }
    else {
      var i = _.findIndex(fromModel, function(c) {
        return c.id === id;
      });
      var card = fromModel.splice(i, 1)[0];
    }

    toModel.unshift(card);

    // Updating model
    d[from] = fromModel;
    d[to] = toModel;

    return card;
  }

  function _updateZ($card) {
    _maxZ += 1;
    $card.css('z-index', _maxZ);
  }

  // Exporting
  //===========
  window.Helpers = {

    // Misc
    getArea: _getArea,
    getTemplate: _getTemplate,
    flag: _flag,
    fromTo: _fromTo,
    updateZ: _updateZ
  };
})(jQuery, window);

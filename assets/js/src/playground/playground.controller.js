(function(undefined) {
  'use strict';

  /**
   * Playground Domino Controller
   * =============================
   *
   * Must be called last.
   */

  // Modules
  utilities.pkg('playground.registers');
  var areas = ['library', 'hand', 'exile', 'graveyard', 'battlefield'];

  // Domino settings
  domino.settings(mtgnode.config.domino);

  // Realtime hacks
  var dominoRealtime = realtime.domino(GAME.id);
  playground.helpers.addToHacks(dominoRealtime.hacks);

  // Controller
  var _controller = new domino({
    properties: playground.properties,
    services: playground.services,
    hacks: playground.hacks
  });

  function _m(fn, args) {
    return _controller.addModule(fn, args);
  }

  // Delayed Modules
  function DelayedModules() {

    this.triggers.events['modules.delayed'] = function() {

      // Points
      playground.registers.points.my.hitpoints = _m(
        playground.modules.points, ['hitpoints', 'my']);
      playground.registers.points.my.infection = _m(
        playground.modules.points, ['infection', 'my']);
      playground.registers.points.op.hitpoints = _m(
        playground.modules.points, ['hitpoints', 'op']);
      playground.registers.points.op.hitpoints = _m(
        playground.modules.points, ['infection', 'op']);

      // Chat
      playground.registers.chat = _m(playground.modules.chat);

      // Registering areas for both my and op side and some interface
      areas.map(function(area) {

        // Areas
        playground.registers.areas.my[area] = _m(playground.areas[area], ['my']);
        playground.registers.areas.op[area] = _m(playground.areas[area], ['op']);

        // Interface
        playground.registers.counters.my[area] = _m(
          playground.modules.counter,
          [area, 'my']
        );
        playground.registers.counters.op[area] = _m(
          playground.modules.counter,
          [area, 'op']
        );
      });
    };
  }

  // Basic Modules
  playground.registers = {
    areas: {
      my: {},
      op: {}
    },
    counters: {
      my: {},
      op: {}
    },
    points: {
      my: {},
      op: {}
    },
    delayed: _m(DelayedModules),
    drag: _m(playground.modules.drag),
    realtime: _m(dominoRealtime.module),
    modals: {
      deckChoice: _m(playground.modules.modals.deckChoice),
      cardsSearch: _m(playground.modules.modals.cardsSearch)
    }
  };

  // Connecting to the game
  realtime.connect('/playground/' + GAME.id + '/connect');

  // Widgets
  $('#card_viewer_widget').cardViewerWidget({
    container: '#game_block',
    cards: '.card-min > img.front-side'
  });

  // Mobile
  //-------
  $(document).ready(function() {
    if ($.browser.mobile) {
      var screen = $(window).height();
      var navbar = $('#topnav .navbar').outerHeight(true) || 0;
      var height = Math.round((screen - navbar - 15)/2)*2; // #mainframe - margin-top plus spacing!
      $('#mainframe').css('height',height);
      $('#mainframe').css('min-height',height);

      $('#top_game_block').css('height',(height/2));
      $('#bottom_game_block').css('height',(height/2)-1);
      $('.game-emplacement').css('height',(height/2)-55); // mobile card height

      $('#top_helper_block').addClass('modal').addClass('fade');
      $('#top_helper_block .card_viewer').addClass('modal-content');
      $('#card_viewer_block').addClass('modal-body');
      $('#bottom_helper_block').hide();
    }
  });

  /**
   * Exporting
   * ----------
   */
  utilities.pkg('playground.controller', _controller);
}).call(this);
        
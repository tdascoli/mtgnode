(function (undefined) {
    'use strict';

    /**
     * Playground Battlefield Area
     * ============================
     *
     */
    function Battlefield(side) {
        var _this = this;
        this.name = 'battlefield';

        // Extending
        playground.area.call(this, side);

        // Emitters
        //----------

        // Context menu
        this.menu = {
            area: {
                untapAll: function () {
                    this.dispatchBothEvents('cards.untap');
                }
            }
        };

        // Drop events
        this.drop = {
            tolerance: 'intersect',
            $sel: $('.game-emplacement'),
            to: function ($card) {
                $card.removeClass('flipped');
            }
        };

        // Basic
        this.emitters = function () {
            // Tapping the cards
            this.bindOnCards('click', function () {
                if ($.browser.mobile) {
                    $('#card_context_modal .tap').hide();
                    $('#card_context_modal .untap').hide();
                    if ($(this).hasClass('tapped')){
                        $('#card_context_modal .untap').show();
                    }
                    else {
                        $('#card_context_modal .tap').show();
                    }
                    $('#card_context_modal').attr('number', $(this).attr('number'));
                    $('#card_context_modal').modal('toggle');
                }
                else {
                    _this.dispatchBothEvents('card.tapped', {id: $(this).attr('number')});
                }
            });

            if ($.browser.mobile) {
                $('#tap').click(function(){
                    _this.dispatchBothEvents('card.tapped', {id: $('#card_context_modal').attr('number')});
                });
            }
        };

        // Receptors
        //-----------

        // Tapping cards
        this.receive('card.tapped', function (d, e) {
            var $card = _this.selectCard(e.data.id);
            $card.toggleClass('tapped');
        });

        // Untapping every cards
        this.receive('cards.untap', function (d, e) {
            $(this.cards).removeClass('tapped');
        });

        this.init();
    }

    /**
     * Exporting
     * ----------
     */
    playground.helpers.addToHacks(['card.tapped']);
    utilities.pkg('playground.areas.battlefield', Battlefield);
}).call(this);

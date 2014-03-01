'use strict';

(function ($) {
    var controller;

    $(document).ready(function () {

        controller = new ScrollMagic();

        $('h2,h3').attr('data-anim', 'fadeInAndScale');

        var triggerHook = 0.92;

        $('*[data-anim="fadeInAndScale"]').each(function () {
            var tween = TweenMax.from(this, 0.5, {
                opacity: 0.25,
                scale: 0.9,
            });

            var triggerElement = $(this);
            var duration = $(this).outerHeight();

            setTween(tween, triggerElement, triggerHook, duration);
        });


        $('.features .feature').attr('data-anim', 'fadeInAndUpOnEnter');

        $('*[data-anim="fadeInAndUpOnEnter"]').each(function () {
            var tween = TweenMax.from(this, 0.5, {
                opacity: 0,
                y: '+=50',
            });

            var triggerElement = $(this).find('.h');
            var duration = $(this).outerHeight();

            setTween(tween, triggerElement, triggerHook, duration);
        });

        function setTween( tween, triggerElement, triggerHook, duration ) {
            var scene = new ScrollScene({
                triggerElement: triggerElement,
                triggerHook: triggerHook,
                duration: duration
            })
            .setTween(tween)
            .addTo(controller);

            scene.addIndicators();
        }
        
    });



}(jQuery));
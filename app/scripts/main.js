'use strict';

(function ($) {
    var controller;

    $(document).ready(function () {

        controller = new ScrollMagic();

        $('h2,h3').attr('data-anim', 'fadeInAndScale');

        $('*[data-anim="fadeInAndScale"]').each(function () {
            var tween = TweenMax.from(this, 0.5, {
                opacity: 0.5,
                scale: 0.92,
            });

            var triggerElement = $(this);
            var duration = $(this).outerHeight();

            var scene = new ScrollScene({
                triggerElement: triggerElement,
                triggerHook: 0.95,
                duration: duration
            })
            .setTween(tween)
            .addTo(controller);

            scene.addIndicators();
        });


        $('.features .feature').attr('data-anim', 'fadeInAndUpOnEnter');

        $('*[data-anim="fadeInAndUpOnEnter"]').each(function () {
            var tween = TweenMax.from(this, 0.5, {
                opacity: 0,
                y: '+=10',
            });

            var triggerElement = $(this).find('.h');
            var duration = triggerElement.outerHeight();

            var scene = new ScrollScene({
                triggerElement: triggerElement,
                triggerHook: 0.95,
                duration: duration
            })
            .setTween(tween)
            .addTo(controller);

            scene.addIndicators();
        });
        
    });



}(jQuery));
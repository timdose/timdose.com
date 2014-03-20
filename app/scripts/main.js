'use strict';

// Hack to prevent console error with ScrollMagic debug disabled
// Clean up: Exclude in build process with Grunt
if ( ScrollScene.prototype.addIndicators === undefined ) {
    ScrollScene.prototype.addIndicators = function () {};
}

(function ($) {
    var controller;

    $(document).ready(function () {

        controller = new ScrollMagic();

        $('h2,h3').attr('data-anim', 'fadeInAndScale');

        var triggerHook = 0.75;

        $('*[data-anim="fadeInAndScale"]').each(function () {
            var tween = TweenMax.from(this, 1, {
                opacity: 0.25,
                scale: 0.9,
            });

            var triggerElement = $(this);
            var duration = $(this).outerHeight();

            setTween(tween, triggerElement, triggerHook, duration);
        });


        $('.features .feature').attr('data-anim', 'fadeInAndUpOnEnter');

        $('*[data-anim="fadeInAndUpOnEnter"]').each(function () {
            var tween = TweenMax.from(this, 1, {
                opacity: 0,
                y: '+=50',
            });

            var triggerElement = $(this).find('.h');
            var duration = $(this).outerHeight();

            setTween(tween, triggerElement, triggerHook, duration);
        });

        $('.between').each(function () {
            var tween = TweenMax.to(this, 1, {
                backgroundPosition: '0 -100%',
                ease: Linear.easeNone,
            });

            var triggerElement = $(this);
            var duration = 2000;
            
            setTween( tween, triggerElement, 'onCenter', duration );

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
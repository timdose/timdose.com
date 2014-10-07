$(document).ready(function() {
  $('.image')
    .css({
      height: getHeight()
    })
    .click(fitOnPageHandler)

  function getHeight() {
    return window.innerHeight - 100;
  }

  function fitOnPageHandler() {
    $(this)
        .css({
          height: 'auto'
        })
        .removeClass('fit-on-page')
        .addClass('full-size')
        .off('click')
        .click(fullSizeHandler)
  }

  function fullSizeHandler() {
    $(this)
        .css({
          height: getHeight()
        })
        .addClass('fit-on-page')
        .removeClass('full-size')
        .off('click')
        .click(fitOnPageHandler)
  }


});
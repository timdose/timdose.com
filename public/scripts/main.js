
$(document).ready(function(){
  highlightCurrentPage();
});

function highlightCurrentPage() {
  var currentPage = window.location.pathname;
  $('.navbar-nav a').each(function() {
    var link = $(this).attr('href');
    if ( currentPage == link ) { 
      $(this).parent('li').addClass('active');
      var targetName = $(this).data('activate');
      var selector = '*[data-active="'+targetName+'"]';
      var target = $(selector);
      $(target).addClass('active');
    }
  });

  $('#requestUnlockLink').click(function(e){
    e.preventDefault();
    var link = "mailto:tim@timdose.com"
             + "?subject=" + escape("Unlock Code for TimDose.com")
    ;

    window.location.href = link;
  });
}


function privateImage() {
  console.log('private image');
  return false;
}
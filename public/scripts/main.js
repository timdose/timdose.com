
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
}


function privateImage() {
  console.log('private image');
  return false;
}
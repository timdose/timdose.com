var stats = new textstatistics();


$('#text').keypress( function() {
    var text = $(this).val();
    var score = stats.fleschKincaidReadingEase(text);
    $('#score').text(score);
});
var textStatistics = textstatistics


$('#text').keypress( function() {
    var text = $(this).val();
    var score = textstatistics().fleschKincaidGradeLevel(text);
    $('#score').text(score);
});
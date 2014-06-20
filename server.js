var express = require('express');

var app = express();
module.exports = app; // expose for testing


app.set('port', process.env.PORT || 3000);
app.set('views', __dirname + '/app/views');
app.set('view engine', 'jade');

app.use(express.static(__dirname + '/public'));

app.get('/', function(req, res) {
  res.send('ok');
});


var server = app.listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
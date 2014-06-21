var express = require('express');
var logger = require('morgan');

var controllers = require('./app/controllers');

var app = express();
module.exports = app; // expose for testing

var logMode = 'default';
if ( app.get('env') == 'development' ) logMode = 'dev';

app.set('port', process.env.PORT || 3000);
app.set('views', __dirname + '/app/views');
app.set('view engine', 'jade');

app.use(logger(logMode));
app.use(express.static(__dirname + '/public'));


app.get('/', controllers.index );


var server = app.listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
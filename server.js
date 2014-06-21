var express = require('express');
var yaml = require('js-yaml');
var fs = require('fs');

var app = express();
module.exports = app; // expose for testing


app.set('port', process.env.PORT || 3000);
app.set('views', __dirname + '/app/views');
app.set('view engine', 'jade');

app.use(express.static(__dirname + '/public'));

app.get('/', function(req, res) {
  res.render('index', { 
                        app: yaml.safeLoad(fs.readFileSync('app/data/app-data.yaml', 'utf8')),
                        about: yaml.safeLoad(fs.readFileSync('app/data/about.yaml', 'utf8')),
                        projects: yaml.safeLoad(fs.readFileSync('app/data/projects.yaml', 'utf8'))
                      }
            );
});


var server = app.listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
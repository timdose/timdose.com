var express = require('express');
var logger = require('morgan');
var lessMiddleware = require('less-middleware');

var controllers = require('./app/controllers');

var app = express();
module.exports = app; // expose for testing

var logMode = 'default';

if (app.get('env') === 'development') {
  logMode = 'dev';
  app.locals.pretty = true;
}

// global function to process markdown and return html
app.locals.md = require("node-markdown").Markdown;

app.set('port', process.env.PORT || 3000);
app.set('views', __dirname + '/app/views');
app.set('view engine', 'jade');

app.use(logger(logMode));
app.use(lessMiddleware(__dirname + '/public'));
app.use(express.static(__dirname + '/public'));


app.get('/', controllers.index );
app.get('/art', controllers.art );
app.get('/art/:genre/:section', controllers.art );
app.get('/ux', controllers.ux );
app.get('/ux/about', controllers.uxAbout );
app.get('/ux/projects/yodle-com', controllers.yodleCom );
app.get('/ux/projects/yodle-self-signup', controllers.yodleSelfSignup );
app.get('/ux/projects/yodle-cms3', controllers.yodleCMS3 );
app.get('/ux/resume', controllers.resume );



//-------------------------------------
// 404 Functionality
//-------------------------------------

// This function must be referenced as the **LAST** middleware in app.configure block above
function handle404(req, res, next) {
  res.status(404);

  // respond with html page
  if (req.accepts('html')) {
    res.render('404', { url: req.url });
    return;
  }

  // respond with json
  if (req.accepts('json')) {
    res.send({ error: 'Not found' });
    return;
  }

  // default to plain-text. send()
  res.type('txt').send('Not found');
}

var server = app.listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
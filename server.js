var versionNumber = '1.1';

var express = require('express');
var logger = require('morgan');
var lessMiddleware = require('less-middleware');
var cookieParser = require('cookie-parser');

var controllers = require('./app/controllers');
var util = require('./app/util');

var app = express();
module.exports = app; // expose for testing

var logMode = 'combined';

if (app.get('env') === 'development') {
  logMode = 'dev';
  app.locals.pretty = true;
}

util.fetchSources();

// global function to process markdown and return html
app.locals.md = require("node-markdown").Markdown;

var uxBefore = [
  function( req, res, next ) {
    app.locals.showPrivate = util.privateOK(req);

    if ( req.cookies.showPrivate === undefined && app.locals.showPrivate === true ) {
      res.cookie('showPrivate', '1' );
    }
    next();
  },

  function( req, res, next ) {
    if ( req.query.clear !== undefined ) {
      res.clearCookie('showPrivate');
      app.locals.showPrivate = false;
    }
    next();
  }
]



//-------------------------------------
// Configuration
//-------------------------------------
app.set('port', process.env.PORT || 3000);
app.set('views', __dirname + '/app/views');
app.set('view engine', 'jade');

app.use(logger(logMode));
app.use(cookieParser());
app.use(lessMiddleware(__dirname + '/public'));
app.use(express.static(__dirname + '/public'));



//-------------------------------------
// Routes
//-------------------------------------
app.get('/version', function(req, res) { res.send(versionNumber)} );

app.get('/', controllers.index );
app.get('/art', controllers.artDefault );
app.get('/art/:genre/:section', controllers.art );

app.get('/ux',                    uxBefore, controllers.before, controllers.ux );
app.get('/ux/about',              uxBefore, controllers.before, controllers.uxAbout );
app.get('/ux/projects/:project',  uxBefore, controllers.before, controllers.uxProject );
app.get('/ux/resume',             uxBefore, controllers.before, controllers.resume );
app.get('/ux/schoology',          uxBefore, controllers.before, controllers.schoology );
app.get('/ux/about-zd',           uxBefore, controllers.before, controllers.aboutZD );

app.get('/ux/readability',            controllers.readability );

app.get('/ux/sources',            controllers.sources );

app.get(/^\/ux\/image-viewer\/(.*)/, controllers.imageViewer );



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
